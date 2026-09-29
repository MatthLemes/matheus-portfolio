/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

const LOCAL_STORAGE_KEY = 'matheus_portfolio_curriculum_v12';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: PortfolioData = JSON.parse(saved);
        // Ensure new project 256368613 is inserted right after Logomarca 2023 if not yet present
        const hasProject = parsed.embeddedProjects?.some(
          (p) => p.embedCodeOrUrl?.includes('256368613') || p.id === 'emb-256368613'
        );
        if (!hasProject && Array.isArray(parsed.embeddedProjects)) {
          const newProject: EmbeddedProject = {
            id: 'emb-256368613',
            title: 'TCC - Guia Informacional',
            description: 'Projeto de graduação com design editorial e guia informacional publicado no Behance.',
            category: 'Design Editorial & Informacional',
            embedCodeOrUrl: '<iframe src="https://www.behance.net/embed/project/256368613?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
            externalUrl: 'https://www.behance.net/gallery/256368613/TCC-Guia-Informacional',
            tags: ['Behance', 'Design Editorial', 'TCC'],
          };

          const targetIndex = parsed.embeddedProjects.findIndex(
            (p) =>
              p.title?.toLowerCase().includes('logomarca 2023') ||
              p.embedCodeOrUrl?.includes('234094405') ||
              p.title?.toLowerCase().includes('logomarca')
          );

          if (targetIndex !== -1) {
            parsed.embeddedProjects.splice(targetIndex + 1, 0, newProject);
          } else {
            parsed.embeddedProjects.push(newProject);
          }

          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
          } catch {
            // storage unavailable
          }
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('edit') === 'true') {
        return true;
      }
      return localStorage.getItem('matheus_admin_active') === 'true';
    }
    return false;
  });

  const toggleAdmin = () => {
    const next = !isAdmin;
    setIsAdmin(next);
    try {
      localStorage.setItem('matheus_admin_active', String(next));
    } catch {
      // storage unavailable
    }
  };

  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // storage unavailable
    }
  };

  const handleResetData = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // storage unavailable
    }
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
          onToggleAdmin={toggleAdmin}
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
            onClick={toggleAdmin}
            className="text-white/50 hover:text-white pl-2 border-l border-white/20 transition-colors"
            title="Sair do modo administrador"
          >
            Sair
          </button>
        </div>
      )}

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
