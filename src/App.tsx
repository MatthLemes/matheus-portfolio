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
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === 'true' || params.get('edit') === 'true';
    }
    return false;
  });

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
  const handleAddProject = (newProject: Omit<EmbeddedProject, 'id'>) => {
    const updatedProjects: EmbeddedProject[] = [
      {
        ...newProject,
        id: `emb-${Date.now()}`,
      },
      ...data.embeddedProjects,
    ];
    const updatedData = { ...data, embeddedProjects: updatedProjects };
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
        />
      </main>

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
