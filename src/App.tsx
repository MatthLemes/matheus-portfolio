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
import { PromptEngineeringShowcase } from './components/PromptEngineeringShowcase';
import { ContactSection } from './components/ContactSection';
import { DesignSystemDrawer } from './components/DesignSystemDrawer';
import { EditProfileModal } from './components/EditProfileModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { FadeInReveal } from './components/FadeInReveal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Check, AlertCircle, ArrowUp } from 'lucide-react';

const LOCAL_STORAGE_ACTIVE_KEY = 'matheus_portfolio_data_active';

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

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

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

  const handleMoveLinkedInHighlight = (id: string, direction: 'prev' | 'next') => {
    const list = data.linkedInHighlights || [];
    const index = list.findIndex((h) => h.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'prev' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const newList = [...list];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIndex, 0, moved);
    const updatedData = { ...data, linkedInHighlights: newList };
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
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121211] text-[#181816] dark:text-[#F5F5F0] flex flex-col font-sans transition-colors duration-200 selection:bg-[#2563EB]/15 selection:text-[#2563EB] dark:selection:bg-[#3B82F6]/25 dark:selection:text-[#3B82F6]">
      {/* Notificação Flutuante de Salvamento Automático */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-4 right-4 z-50 transition-all duration-300">
          <div
            className={`px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-mono font-medium border backdrop-blur-md ${
              saveStatus === 'saved'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-emerald-500/50'
                : saveStatus === 'saving'
                ? 'bg-[#181816] dark:bg-[#242422] text-white border-amber-400/50'
                : 'bg-red-950 text-white border-red-500/50'
            }`}
          >
            {saveStatus === 'saving' && (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span>Gravando alteração no projeto...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>✓ Salvo automaticamente!</span>
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
            onDeleteSpotify={handleDeleteSpotify}
            onAddPoem={handleAddPoem}
            onDeletePoem={handleDeletePoem}
            isAdmin={isAdmin}
          />
        </FadeInReveal>

        {/* 8.1 Showcase Interativo de Engenharia de Prompt & IA Aplicada */}
        <FadeInReveal>
          <PromptEngineeringShowcase />
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
        <div className="fixed bottom-4 right-4 z-40 bg-[#181816] text-white px-3.5 py-2 rounded-full shadow-xl flex items-center gap-3 text-xs font-mono border border-white/20 backdrop-blur-md">
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
    </div>
  );
}
