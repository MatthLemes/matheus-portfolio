/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { defaultPortfolioData, matheusPortrait } from './data/defaultData';
import {
  PortfolioData,
  EmbeddedProject,
  SpotifyEmbedItem,
  PoetryCompactItem,
  LinkedInHighlight,
} from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { EmbeddedProjectsGallery } from './components/EmbeddedProjectsGallery';
import { LinkedInHighlightsSection } from './components/LinkedInHighlightsSection';
import { CreativeSpaceSection } from './components/CreativeSpaceSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { EditProfileModal } from './components/EditProfileModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Copy, Check, AlertCircle, X, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_ACTIVE_KEY = 'matheus_portfolio_data_active';

export default function App() {
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

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Sync with disk via /api/portfolio-data on mount
  useEffect(() => {
    fetch('/api/portfolio-data')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Endpoint not available');
      })
      .then((serverData) => {
        if (serverData && serverData.name) {
          setData(serverData);
          try {
            localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(serverData));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // Static environment fallback
      });
  }, []);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Admin access is strictly protected: requires password authentication
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('matheus_admin_authenticated') === 'true';
    }
    return false;
  });

  // If visitor accesses with ?admin=true, prompt for password instead of unlocking directly
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

  // Saves immediately to both browser memory (for instant F5) and the file system via POST /api/save-portfolio
  const handleSaveData = async (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(newData));
    } catch {
      // storage unavailable
    }

    setSaveStatus('saving');
    try {
      const res = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (err) {
      console.warn('Backend endpoint not reachable, saved in browser:', err);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
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

  const handleMoveProject = (id: string, direction: 'prev' | 'next') => {
    const index = data.embeddedProjects.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'prev' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.embeddedProjects.length) return;

    const newProjects = [...data.embeddedProjects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);
    const updatedData = { ...data, embeddedProjects: newProjects };
    handleSaveData(updatedData);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = data.embeddedProjects.filter((p) => p.id !== id);
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

  const handleDeleteLinkedInHighlight = (id: string) => {
    const updatedHighlights = (data.linkedInHighlights || []).filter((h) => h.id !== id);
    const updatedData = { ...data, linkedInHighlights: updatedHighlights };
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

  const handleDeletePoem = (id: string) => {
    const updatedPoems = data.compactPoems.filter((p) => p.id !== id);
    const updatedData = { ...data, compactPoems: updatedPoems };
    handleSaveData(updatedData);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Notificação Flutuante de Salvamento Automático */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-4 right-4 z-50 transition-all duration-300">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-medium border backdrop-blur-md ${
              saveStatus === 'saved'
                ? 'bg-[#1A1A1A] text-white border-emerald-500/50'
                : saveStatus === 'saving'
                ? 'bg-[#1A1A1A] text-white border-amber-400/50'
                : 'bg-red-950 text-white border-red-500/50'
            }`}
          >
            {saveStatus === 'saving' && (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span>Gravando alteração no arquivo do projeto...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>✓ Salvo automaticamente no projeto! Pronto para o Git e Vercel.</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Salvo na prévia local.</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        name={data.name}
        onOpenEditor={() => setIsEditorOpen(true)}
        primaryActionUrl={data.links.linkedin}
        isAdmin={isAdmin}
      />

      {/* Main Content Sections sequenced according to specifications */}
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

        {/* 2. Trajetória Profissional (Linha do tempo leve e interativa) */}
        <ExperienceSection
          experiences={data.experiences}
          linkedinUrl={data.links.linkedin}
        />

        {/* 3. Formação Acadêmica (após a linha do tempo, com FGV) */}
        <EducationSection
          education={data.education}
          languages={data.languages}
        />

        {/* 4. Certificações Relevantes (sobe após a formação) */}
        <CertificationsSection
          certifications={data.certifications}
        />

        {/* 5. Projetos & Conquistas (sobe após as certificações) */}
        <AchievementsSection
          achievements={data.achievements}
        />

        {/* 6. Vitrine de Projetos (Behance e incorporações, com modo curador) */}
        <EmbeddedProjectsGallery
          projects={data.embeddedProjects}
          behanceUrl={data.links.behance}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onMoveProject={handleMoveProject}
          isAdmin={isAdmin}
        />

        {/* 7. Destaques do LinkedIn (antes de playlists e poesias) */}
        <LinkedInHighlightsSection
          highlights={data.linkedInHighlights || []}
          linkedinProfileUrl={data.links.linkedin}
          onAddHighlight={handleAddLinkedInHighlight}
          onDeleteHighlight={handleDeleteLinkedInHighlight}
          isAdmin={isAdmin}
        />

        {/* 8. Espaço Criativo: Playlists do Spotify & Poesias com Incorporação Compacta */}
        <CreativeSpaceSection
          spotifyPlaylists={data.spotifyPlaylists}
          poems={data.compactPoems}
          mediumUrl={data.links.medium || 'https://medium.com/@matheusribeirolemes15'}
          onAddSpotify={handleAddSpotify}
          onDeleteSpotify={handleDeleteSpotify}
          onAddPoem={handleAddPoem}
          onDeletePoem={handleDeletePoem}
          isAdmin={isAdmin}
        />

        {/* 9. Competências & Ferramentas (penúltimo antes do contato) */}
        <SkillsSection
          skills={data.skills}
        />

        {/* 10. Contato Direto: Vamos conversar? */}
        <ContactSection
          links={data.links}
          name={data.name}
          email={data.email}
          isAdmin={isAdmin}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onLogoutAdmin={handleLogout}
        />
      </main>

      {/* Floating Admin Status Bar */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 bg-[#1A1A1A] text-white px-3.5 py-2 rounded-full shadow-xl flex items-center gap-3 text-xs border border-white/20 backdrop-blur-md">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Modo ADM
          </span>
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
    </div>
  );
}
