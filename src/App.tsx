/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { defaultPortfolioData } from './data/defaultData';
import matheusPortrait from './assets/images/matheus_portrait_1790445047363.jpg';
import {
  PortfolioData,
  EmbeddedProject,
  SpotifyEmbedItem,
  PoetryCompactItem,
  LinkedInHighlight,
} from './types/portfolio';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EditorialMarquee } from './components/EditorialMarquee';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { EmbeddedProjectsGallery } from './components/EmbeddedProjectsGallery';
import { LinkedInHighlightsSection } from './components/LinkedInHighlightsSection';
import { CreativeSpaceSection } from './components/CreativeSpaceSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { DesignSystemDrawer } from './components/DesignSystemDrawer';
import { EditProfileModal } from './components/EditProfileModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { GitHubSyncModal } from './components/GitHubSyncModal';
import { SyncLogsModal } from './components/SyncLogsModal';
import { FadeInReveal } from './components/FadeInReveal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import {
  Check,
  AlertCircle,
  ArrowUp,
  Github,
  Info,
  Wifi,
  WifiOff,
  RefreshCw,
  CloudUpload,
  Activity,
} from 'lucide-react';
import {
  LOCAL_STORAGE_ACTIVE_KEY,
  enqueuePendingSync,
  clearPendingQueue,
  getPendingQueue,
  getLatestPendingPayload,
  sendPortfolioSave,
  addSyncLog,
} from './utils/syncQueue';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.name) {
            return parsed;
          }
        }
      } catch {
        // storage unavailable
      }
    }
    return defaultPortfolioData;
  });

  type SaveStatus =
    | 'idle'
    | 'saving'
    | 'saved'
    | 'queued'
    | 'offline'
    | 'syncing_queue'
    | 'local_only'
    | 'error';

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator !== 'undefined') return navigator.onLine;
    return true;
  });
  const [pendingSyncCount, setPendingSyncCount] = useState(() => getPendingQueue().length);
  const isSyncingQueueRef = React.useRef(false);
  const autoDismissTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const triggerSaveStatus = (status: SaveStatus, autoDismissMs?: number) => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
    setSaveStatus(status);
    if (autoDismissMs) {
      autoDismissTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, autoDismissMs);
    }
  };

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [isGitHubSyncOpen, setIsGitHubSyncOpen] = useState(false);
  const [isSyncLogsOpen, setIsSyncLogsOpen] = useState(false);

  const flushPendingSyncQueue = async (options?: { silent?: boolean }) => {
    if (isSyncingQueueRef.current) return;
    const queue = getPendingQueue();
    if (queue.length === 0) {
      setPendingSyncCount(0);
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      triggerSaveStatus('offline', 5000);
      addSyncLog({
        type: 'offline_queued',
        status: 'warning',
        title: 'Fila Retida (Offline)',
        details: 'Tentativa de descarregar fila abortada pois o navegador está sem internet.',
        target: 'runtime',
      });
      return;
    }

    isSyncingQueueRef.current = true;
    const latestItem = queue[queue.length - 1];

    if (!options?.silent) {
      triggerSaveStatus('syncing_queue');
    }

    try {
      const result = await sendPortfolioSave(latestItem.payload);

      if (result.success) {
        clearPendingQueue();
        setPendingSyncCount(0);
        triggerSaveStatus('saved', 3500);
        addSyncLog({
          type: 'auto_retry',
          status: 'success',
          title: 'Fila Sincronizada com Sucesso',
          details: 'Snapshot pendente enviado e gravado com sucesso no servidor de arquivos.',
          target: 'api',
          httpStatus: result.status,
        });
      } else if (result.isServerAbsent) {
        // 404 indicates static Jamstack host (Vercel CDN)
        triggerSaveStatus('local_only', 6000);
        addSyncLog({
          type: 'api_save_error',
          status: 'warning',
          title: 'Host Estático (404) na Sincronização da Fila',
          details: 'Servidor atual é CDN Estático sem rota de gravação no disco. Dados preservados no navegador. Use Sincronizar GitHub para gerar build na Vercel.',
          target: 'api',
          httpStatus: 404,
        });
      } else {
        // Temporary network or server error - retain in queue for automatic retry
        enqueuePendingSync(latestItem.payload, result.error);
        setPendingSyncCount(getPendingQueue().length);
        triggerSaveStatus('queued', 5000);
        addSyncLog({
          type: 'auto_retry',
          status: 'error',
          title: 'Falha na Retentativa da Fila',
          details: result.error || 'Erro transitório de rede ao tentar descarregar fila.',
          target: 'api',
          httpStatus: result.status,
          error: result.error,
        });
      }
    } catch (err: unknown) {
      console.warn('[SyncQueue] Flush error:', err);
      triggerSaveStatus('queued', 5000);
      addSyncLog({
        type: 'auto_retry',
        status: 'error',
        title: 'Exceção na Retentativa da Fila',
        details: (err as Error)?.message || 'Falha de conexão',
        target: 'api',
        httpStatus: 'network_error',
      });
    } finally {
      isSyncingQueueRef.current = false;
    }
  };

  // Sync with disk via /api/portfolio-data on mount with lossless merging & queue recovery
  useEffect(() => {
    // 1. Recover any uncommitted pending payload from previous offline session
    const pendingPayload = getLatestPendingPayload();
    if (pendingPayload) {
      setData((prev) => ({
        ...prev,
        ...pendingPayload,
      }));
    }

    // 2. Fetch server baseline and reconcile non-destructively
    fetch('/api/portfolio-data')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Endpoint not available');
      })
      .then((serverData: PortfolioData) => {
        if (serverData && serverData.name) {
          setData((prevData) => {
            // Reconcile projects: ensure items added locally or on server are combined
            const serverProjectIds = new Set(serverData.embeddedProjects.map((p) => p.id));
            const localOnlyProjects = (prevData.embeddedProjects || []).filter(
              (p) => !serverProjectIds.has(p.id)
            );
            const mergedProjects = [...serverData.embeddedProjects, ...localOnlyProjects];

            // Reconcile LinkedIn highlights
            const serverHighIds = new Set((serverData.linkedInHighlights || []).map((h) => h.id));
            const localOnlyHighlights = (prevData.linkedInHighlights || []).filter(
              (h) => !serverHighIds.has(h.id)
            );
            const mergedHighlights = [...(serverData.linkedInHighlights || []), ...localOnlyHighlights];

            // Reconcile Spotify playlists
            const serverSpotIds = new Set(serverData.spotifyPlaylists.map((s) => s.id));
            const localOnlyPlaylists = (prevData.spotifyPlaylists || []).filter(
              (s) => !serverSpotIds.has(s.id)
            );
            const mergedPlaylists = [...serverData.spotifyPlaylists, ...localOnlyPlaylists];

            // Reconcile Poems
            const serverPoemIds = new Set(serverData.compactPoems.map((p) => p.id));
            const localOnlyPoems = (prevData.compactPoems || []).filter(
              (p) => !serverPoemIds.has(p.id)
            );
            const mergedPoems = [...serverData.compactPoems, ...localOnlyPoems];

            const consolidated: PortfolioData = {
              ...serverData,
              embeddedProjects: mergedProjects,
              linkedInHighlights: mergedHighlights,
              spotifyPlaylists: mergedPlaylists,
              compactPoems: mergedPoems,
            };

            try {
              localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(consolidated));
            } catch {
              // ignore
            }

            // If local had additions not on server, enqueue and sync
            if (
              localOnlyProjects.length > 0 ||
              localOnlyHighlights.length > 0 ||
              localOnlyPlaylists.length > 0 ||
              localOnlyPoems.length > 0
            ) {
              enqueuePendingSync(consolidated);
              setPendingSyncCount(getPendingQueue().length);
              if (navigator.onLine) {
                flushPendingSyncQueue({ silent: true });
              }
            }

            return consolidated;
          });
        }
      })
      .catch((err) => {
        console.warn('API sync fallback to cached state:', err);
      });
  }, []);

  // Listeners for network online/offline transitions and tab focus
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const queue = getPendingQueue();
      if (queue.length > 0) {
        flushPendingSyncQueue();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (getPendingQueue().length > 0) {
        triggerSaveStatus('offline', 5000);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        const queue = getPendingQueue();
        if (queue.length > 0) {
          flushPendingSyncQueue({ silent: true });
        }
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Monitor scroll position: only reveal button when scrolled past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setShowBackToTop(rect.bottom < 50);
      } else {
        setShowBackToTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Admin access
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('matheus_admin_authenticated') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('edit') === 'true') {
        if (!isAdmin) {
          setIsLoginModalOpen(true);
        }
      }
    }
  }, [isAdmin]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem('matheus_admin_authenticated', 'true');
    } catch {
      // storage unavailable
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('matheus_admin_authenticated');
      localStorage.removeItem('matheus_admin_active');
    } catch {
      // storage unavailable
    }
  };

  const handleSaveData = async (newData: PortfolioData) => {
    // 1. Optimistic UI update
    setData(newData);

    // 2. Direct persistence to active browser storage
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(newData));
      addSyncLog({
        type: 'local_save',
        status: 'info',
        title: 'Gravado no LocalStorage',
        details: 'Snapshot gravado no armazenamento do navegador.',
        target: 'localStorage',
        itemsCount: {
          projects: newData.embeddedProjects?.length || 0,
          highlights: newData.linkedInHighlights?.length || 0,
          poems: newData.compactPoems?.length || 0,
        },
      });
    } catch (err) {
      console.warn('Failed to persist to localStorage:', err);
      addSyncLog({
        type: 'local_save',
        status: 'error',
        title: 'Falha de Persistência Local',
        details: (err as Error)?.message || 'Erro de cota de armazenamento.',
        target: 'localStorage',
      });
    }

    // 3. Register snapshot in the Pending Sync Queue
    enqueuePendingSync(newData);
    setPendingSyncCount(getPendingQueue().length);

    // 4. Handle offline condition proactively
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      triggerSaveStatus('offline', 5000);
      addSyncLog({
        type: 'offline_queued',
        status: 'warning',
        title: 'Offline: Alteração na Fila',
        details: 'Navegador desconectado da internet. Alteração retida para envio automático ao restabelecer rede.',
        target: 'runtime',
      });
      return;
    }

    // 5. Attempt network save with resilience & retry queue fallback
    triggerSaveStatus('saving');
    try {
      const result = await sendPortfolioSave(newData);

      if (result.success) {
        clearPendingQueue();
        setPendingSyncCount(0);
        triggerSaveStatus('saved', 3500);
        addSyncLog({
          type: 'api_save_success',
          status: 'success',
          title: 'Sincronizado com API Backend',
          details: 'POST /api/save-portfolio gravou com sucesso no arquivo do projeto.',
          target: 'api',
          httpStatus: result.status,
          itemsCount: {
            projects: newData.embeddedProjects?.length || 0,
            highlights: newData.linkedInHighlights?.length || 0,
            poems: newData.compactPoems?.length || 0,
          },
        });
      } else if (result.isServerAbsent) {
        // Static Jamstack host (Vercel CDN)
        triggerSaveStatus('local_only', 6000);
        addSyncLog({
          type: 'api_save_error',
          status: 'warning',
          title: 'Host Estático Detectado (HTTP 404)',
          details: 'Ambiente CDN sem servidor Node gravável (ex: Vercel). Dados preservados localmente. Use Sincronizar GitHub para novo deploy.',
          target: 'api',
          httpStatus: 404,
        });
      } else {
        // Network drop or temporary server error: keep in pending queue for auto-retry
        enqueuePendingSync(newData, result.error);
        setPendingSyncCount(getPendingQueue().length);
        triggerSaveStatus('queued', 5000);
        addSyncLog({
          type: 'api_save_error',
          status: 'error',
          title: 'Falha no Envio à API - Enfileirado',
          details: result.error || 'Erro transitório de conexão.',
          target: 'api',
          httpStatus: result.status,
          error: result.error,
        });
      }
    } catch (err: unknown) {
      console.warn('[SyncQueue] Network failed during save, queued for retry:', err);
      enqueuePendingSync(newData, (err as Error)?.message || 'Network error');
      setPendingSyncCount(getPendingQueue().length);
      triggerSaveStatus('queued', 5000);
      addSyncLog({
        type: 'api_save_error',
        status: 'error',
        title: 'Exceção de Rede ao Salvar',
        details: (err as Error)?.message || 'Falha de conexão',
        target: 'api',
        httpStatus: 'network_error',
      });
    }
  };

  const handleResetData = async () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_KEY);
    } catch {
      // ignore
    }
    handleSaveData(defaultPortfolioData);
  };

  // Handlers for Behance / Project Embeds
  const handleAddProject = (newProject: Omit<EmbeddedProject, 'id'>, position?: string) => {
    const newItem: EmbeddedProject = {
      ...newProject,
      id: `emb-${Date.now()}`,
    };

    let updatedProjects = [...data.embeddedProjects];

    if (position === 'start') {
      updatedProjects = [newItem, ...updatedProjects];
    } else if (position === 'end') {
      updatedProjects = [...updatedProjects, newItem];
    } else if (position?.startsWith('after:')) {
      const targetId = position.replace('after:', '');
      const index = updatedProjects.findIndex((p) => p.id === targetId);
      if (index !== -1) {
        updatedProjects.splice(index + 1, 0, newItem);
      } else {
        updatedProjects = [newItem, ...updatedProjects];
      }
    } else {
      updatedProjects = [newItem, ...updatedProjects];
    }

    const updatedData = { ...data, embeddedProjects: updatedProjects };
    handleSaveData(updatedData);
  };

  const handleMoveProject = (
    id: string,
    direction: 'prev' | 'next',
    currentViewIds?: string[]
  ) => {
    const list = [...data.embeddedProjects];
    const view = currentViewIds && currentViewIds.length > 0 ? currentViewIds : list.map((p) => p.id);
    const viewIndex = view.indexOf(id);
    if (viewIndex === -1) return;
    const targetViewIndex = direction === 'prev' ? viewIndex - 1 : viewIndex + 1;
    if (targetViewIndex < 0 || targetViewIndex >= view.length) return;

    const targetId = view[targetViewIndex];
    const fromIndex = list.findIndex((p) => p.id === id);
    const toIndex = list.findIndex((p) => p.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const temp = list[fromIndex];
    list[fromIndex] = list[toIndex];
    list[toIndex] = temp;

    const updatedData = { ...data, embeddedProjects: list };
    handleSaveData(updatedData);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = data.embeddedProjects.filter((p) => p.id !== id);
    const updatedData = { ...data, embeddedProjects: updatedProjects };
    handleSaveData(updatedData);
  };

  const handleEditProject = (updatedProject: EmbeddedProject) => {
    const updatedProjects = data.embeddedProjects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    const updatedData = { ...data, embeddedProjects: updatedProjects };
    handleSaveData(updatedData);
  };

  // Handlers for LinkedIn Highlights
  const handleAddLinkedInHighlight = (highlight: Omit<LinkedInHighlight, 'id'>) => {
    const updatedHighlights: LinkedInHighlight[] = [
      {
        ...highlight,
        id: `li-${Date.now()}`,
      },
      ...(data.linkedInHighlights || []),
    ];
    const updatedData = { ...data, linkedInHighlights: updatedHighlights };
    handleSaveData(updatedData);
  };

  const handleEditLinkedInHighlight = (updatedHighlight: LinkedInHighlight) => {
    const list = data.linkedInHighlights || [];
    const updatedList = list.map((h) => (h.id === updatedHighlight.id ? updatedHighlight : h));
    const updatedData = { ...data, linkedInHighlights: updatedList };
    handleSaveData(updatedData);
  };

  const handleDeleteLinkedInHighlight = (id: string) => {
    const updatedHighlights = (data.linkedInHighlights || []).filter((h) => h.id !== id);
    const updatedData = { ...data, linkedInHighlights: updatedHighlights };
    handleSaveData(updatedData);
  };

  const handleMoveLinkedInHighlight = (
    id: string,
    direction: 'prev' | 'next',
    currentViewIds?: string[]
  ) => {
    const list = [...(data.linkedInHighlights || [])];
    const view = currentViewIds && currentViewIds.length > 0 ? currentViewIds : list.map((h) => h.id);
    const viewIndex = view.indexOf(id);
    if (viewIndex === -1) return;
    const targetViewIndex = direction === 'prev' ? viewIndex - 1 : viewIndex + 1;
    if (targetViewIndex < 0 || targetViewIndex >= view.length) return;

    const targetId = view[targetViewIndex];
    const fromIndex = list.findIndex((h) => h.id === id);
    const toIndex = list.findIndex((h) => h.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const temp = list[fromIndex];
    list[fromIndex] = list[toIndex];
    list[toIndex] = temp;

    const updatedData = { ...data, linkedInHighlights: list };
    handleSaveData(updatedData);
  };

  // Handlers for Spotify Playlists
  const handleAddSpotify = (item: Omit<SpotifyEmbedItem, 'id'>) => {
    const updatedSpotify: SpotifyEmbedItem[] = [
      {
        ...item,
        id: `spot-${Date.now()}`,
      },
      ...data.spotifyPlaylists,
    ];
    const updatedData = { ...data, spotifyPlaylists: updatedSpotify };
    handleSaveData(updatedData);
  };

  const handleEditSpotify = (updatedItem: SpotifyEmbedItem) => {
    const updatedList = data.spotifyPlaylists.map((s) =>
      s.id === updatedItem.id ? updatedItem : s
    );
    const updatedData = { ...data, spotifyPlaylists: updatedList };
    handleSaveData(updatedData);
  };

  const handleDeleteSpotify = (id: string) => {
    const updatedSpotify = data.spotifyPlaylists.filter((s) => s.id !== id);
    const updatedData = { ...data, spotifyPlaylists: updatedSpotify };
    handleSaveData(updatedData);
  };

  // Handlers for Compact Poems
  const handleAddPoem = (item: Omit<PoetryCompactItem, 'id'>) => {
    const updatedPoems: PoetryCompactItem[] = [
      {
        ...item,
        id: `poem-${Date.now()}`,
      },
      ...data.compactPoems,
    ];
    const updatedData = { ...data, compactPoems: updatedPoems };
    handleSaveData(updatedData);
  };

  const handleEditPoem = (updatedItem: PoetryCompactItem) => {
    const updatedList = data.compactPoems.map((p) =>
      p.id === updatedItem.id ? updatedItem : p
    );
    const updatedData = { ...data, compactPoems: updatedList };
    handleSaveData(updatedData);
  };

  const handleDeletePoem = (id: string) => {
    const updatedPoems = data.compactPoems.filter((p) => p.id !== id);
    const updatedData = { ...data, compactPoems: updatedPoems };
    handleSaveData(updatedData);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121211] text-[#181816] dark:text-[#F5F5F0] flex flex-col font-sans transition-colors duration-200 selection:bg-[#2563EB]/15 selection:text-[#2563EB] dark:selection:bg-[#3B82F6]/25 dark:selection:text-[#3B82F6]">
      {/* Notificação Flutuante de Salvamento e Fila de Sincronização */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-4 right-4 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <div
            className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-mono font-medium border backdrop-blur-md ${
              saveStatus === 'saved'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-emerald-500/50'
                : saveStatus === 'saving'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-amber-400/50'
                : saveStatus === 'syncing_queue'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-blue-400/50'
                : saveStatus === 'queued'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-amber-400/60'
                : saveStatus === 'offline'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-amber-500/70'
                : saveStatus === 'local_only'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-blue-400/50'
                : 'bg-red-950 text-white border-red-500/50'
            }`}
          >
            {saveStatus === 'saving' && (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span>Gravando alteração no projeto...</span>
              </>
            )}
            {saveStatus === 'syncing_queue' && (
              <>
                <RefreshCw className="w-4 h-4 text-[#3B82F6] animate-spin" />
                <span>Conexão ativa: sincronizando fila pendente com o servidor...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>✓ Sincronizado e salvo com sucesso no servidor!</span>
              </>
            )}
            {saveStatus === 'queued' && (
              <>
                <CloudUpload className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Salvo localmente! Na fila de sincronização (enviará ao reconectar).</span>
              </>
            )}
            {saveStatus === 'offline' && (
              <>
                <WifiOff className="w-4 h-4 text-amber-400" />
                <span>Sem conexão. Alteração salva na fila para sincronização automática.</span>
              </>
            )}
            {saveStatus === 'local_only' && (
              <>
                <Info className="w-4 h-4 text-[#3B82F6]" />
                <span>✓ Salvo localmente! Use &apos;Sincronizar GitHub&apos; para publicar no Vercel.</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Salvo na prévia local do navegador.</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global Scroll Progress Bar com Gradiente Cobalto */}
      <ScrollProgressBar />

      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        name={data.name}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenEditor={() => setIsEditorOpen(true)}
        primaryActionUrl={data.links.linkedin}
        isAdmin={isAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          name={data.name}
          headline={data.headline}
          about={data.about}
          location={data.location}
          email={data.email}
          links={data.links}
          portraitImage={matheusPortrait}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        {/* Fita Contínua Editorial 1 (Após o Hero) */}
        <EditorialMarquee id="marquee-hero" />

        {/* 2. Trajetória Profissional */}
        <FadeInReveal>
          <ExperienceSection
            experiences={data.experiences}
            linkedinUrl={data.links.linkedin}
          />
        </FadeInReveal>

        {/* 3. Formação Acadêmica */}
        <FadeInReveal>
          <EducationSection
            education={data.education}
            languages={data.languages}
          />
        </FadeInReveal>

        {/* 4. Certificações Relevantes */}
        <FadeInReveal>
          <CertificationsSection
            certifications={data.certifications}
          />
        </FadeInReveal>

        {/* 5. Projetos & Conquistas */}
        <FadeInReveal>
          <AchievementsSection
            achievements={data.achievements}
          />
        </FadeInReveal>

        {/* 6. Vitrine de Projetos (Behance) */}
        <FadeInReveal>
          <EmbeddedProjectsGallery
            projects={data.embeddedProjects}
            behanceUrl={data.links.behance}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onMoveProject={handleMoveProject}
            isAdmin={isAdmin}
          />
        </FadeInReveal>

        {/* 7. Destaques do LinkedIn com 4 Abas Segmentadas & Modo ADM */}
        <FadeInReveal>
          <LinkedInHighlightsSection
            highlights={data.linkedInHighlights || []}
            linkedinProfileUrl={data.links.linkedin}
            onAddHighlight={handleAddLinkedInHighlight}
            onEditHighlight={handleEditLinkedInHighlight}
            onDeleteHighlight={handleDeleteLinkedInHighlight}
            onMoveHighlight={handleMoveLinkedInHighlight}
            isAdmin={isAdmin}
          />
        </FadeInReveal>

        {/* 8. Espaço Criativo: Spotify & Poesias */}
        <FadeInReveal>
          <CreativeSpaceSection
            spotifyPlaylists={data.spotifyPlaylists}
            poems={data.compactPoems}
            mediumUrl={data.links.medium || 'https://medium.com/@matheusribeirolemes15'}
            onAddSpotify={handleAddSpotify}
            onEditSpotify={handleEditSpotify}
            onDeleteSpotify={handleDeleteSpotify}
            onAddPoem={handleAddPoem}
            onEditPoem={handleEditPoem}
            onDeletePoem={handleDeletePoem}
            isAdmin={isAdmin}
          />
        </FadeInReveal>

        {/* 9. Competências & Ferramentas */}
        <FadeInReveal>
          <SkillsSection
            skills={data.skills}
          />
        </FadeInReveal>

        {/* Fita Contínua Editorial 2 (Antes do Contato) */}
        <EditorialMarquee id="marquee-contato" />

        {/* 10. Contato Direto & Rodapé com Botão do Design System */}
        <FadeInReveal>
          <ContactSection
            links={data.links}
            name={data.name}
            email={data.email}
            isAdmin={isAdmin}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onLogoutAdmin={handleLogout}
            onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
          />
        </FadeInReveal>
      </main>

      {/* Floating 'Back to Top' Button */}
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao início da página"
        title="Voltar ao início"
        className={`fixed z-40 flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-full shadow-md border transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
          isAdmin
            ? 'bottom-16 sm:bottom-18 right-4 sm:right-6'
            : 'bottom-5 sm:bottom-6 right-4 sm:right-6'
        } ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto bg-[#181816] dark:bg-[#F5F5F0] text-white dark:text-[#181816] border-[#2E2E2A] dark:border-white/20 hover:shadow-xl hover:-translate-y-0.5'
            : 'opacity-0 translate-y-3 pointer-events-none bg-[#181816] text-white border-[#2E2E2A]'
        }`}
      >
        <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-white dark:text-[#181816]" />
        <span className="text-[11px] uppercase tracking-wider font-semibold">Topo</span>
      </button>

      {/* Floating Admin Status Bar */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 bg-[#181816] text-white px-3.5 py-2 rounded-full shadow-xl flex items-center gap-2.5 sm:gap-3 text-xs font-mono border border-white/20 backdrop-blur-md">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Modo ADM
          </span>

          {/* Network & Queue Indicator */}
          {!isOnline ? (
            <span
              className="flex items-center gap-1 text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30 text-[11px]"
              title="Sem conexão com a internet. Modificações serão salvas na fila."
            >
              <WifiOff className="w-3 h-3 text-amber-400" />
              <span>Offline</span>
            </span>
          ) : pendingSyncCount > 0 ? (
            <button
              onClick={() => flushPendingSyncQueue()}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-[11px] transition-colors"
              title="Clique para sincronizar itens pendentes agora"
            >
              <RefreshCw
                className={`w-3 h-3 ${saveStatus === 'syncing_queue' ? 'animate-spin' : ''}`}
              />
              <span>
                {pendingSyncCount} pendente{pendingSyncCount > 1 ? 's' : ''}
              </span>
            </button>
          ) : null}

          <button
            onClick={() => setIsGitHubSyncOpen(true)}
            className="text-white/90 hover:text-white flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
            title="Sincronizar diretamente com o GitHub e acionar deploy na Vercel"
          >
            <Github className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Sincronizar GitHub & Vercel</span>
          </button>
          <button
            onClick={() => handleSaveData(data)}
            className="text-white/80 hover:text-white underline underline-offset-2 transition-colors"
            title="Gravar no disco local"
          >
            Salvar Local
          </button>
          <button
            onClick={() => setIsSyncLogsOpen(true)}
            className="text-white/90 hover:text-white flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
            title="Abrir histórico de logs e diagnósticos de sincronização"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Logs</span>
          </button>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-white/80 hover:text-white underline underline-offset-2 transition-colors"
          >
            Editar Perfil
          </button>
          <button
            onClick={handleLogout}
            className="text-white/50 hover:text-white pl-2 border-l border-white/20 transition-colors"
            title="Sair do modo administrador"
          >
            Sair
          </button>
        </div>
      )}

      {/* Gaveta Interativa de Tokens do Design System */}
      <DesignSystemDrawer
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      {/* Modal de Autenticação do Administrador */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Modal de Personalização */}
      <EditProfileModal
        data={data}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      {/* Modal de Sincronização Direta com GitHub & Vercel */}
      <GitHubSyncModal
        isOpen={isGitHubSyncOpen}
        onClose={() => setIsGitHubSyncOpen(false)}
        data={data}
      />

      {/* Modal de Diagnóstico e Logs de Sincronização */}
      <SyncLogsModal
        isOpen={isSyncLogsOpen}
        onClose={() => setIsSyncLogsOpen(false)}
        data={data}
        onFlushQueue={flushPendingSyncQueue}
      />
    </div>
  );
}
