import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Feather, Plus, ExternalLink, Trash2, ArrowUpRight, Pencil } from 'lucide-react';
import { SpotifyEmbedItem, PoetryCompactItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface CreativeSpaceSectionProps {
  spotifyPlaylists: SpotifyEmbedItem[];
  poems: PoetryCompactItem[];
  mediumUrl: string;
  onAddSpotify: (item: Omit<SpotifyEmbedItem, 'id'>) => void;
  onEditSpotify?: (item: SpotifyEmbedItem) => void;
  onDeleteSpotify: (id: string) => void;
  onAddPoem: (item: Omit<PoetryCompactItem, 'id'>) => void;
  onEditPoem?: (item: PoetryCompactItem) => void;
  onDeletePoem: (id: string) => void;
  isAdmin?: boolean;
}

export const CreativeSpaceSection: React.FC<CreativeSpaceSectionProps> = ({
  spotifyPlaylists,
  poems,
  mediumUrl,
  onAddSpotify,
  onEditSpotify,
  onDeleteSpotify,
  onAddPoem,
  onEditPoem,
  onDeletePoem,
  isAdmin = false,
}) => {
  // Spotify Create Modal State
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false);
  const [spotifyTitle, setSpotifyTitle] = useState('');
  const [spotifySubtitle, setSpotifySubtitle] = useState('');
  const [spotifyInput, setSpotifyInput] = useState('');

  // Spotify Edit State
  const [editingSpotify, setEditingSpotify] = useState<SpotifyEmbedItem | null>(null);
  const [editSpotifyTitle, setEditSpotifyTitle] = useState('');
  const [editSpotifySubtitle, setEditSpotifySubtitle] = useState('');
  const [editSpotifyInput, setEditSpotifyInput] = useState('');

  // Poem Create Modal State
  const [isPoemModalOpen, setIsPoemModalOpen] = useState(false);
  const [poemTitle, setPoemTitle] = useState('');
  const [poemExcerpt, setPoemExcerpt] = useState('');
  const [poemMediumUrl, setPoemMediumUrl] = useState('');
  const [poemDate, setPoemDate] = useState('');

  // Poem Edit State
  const [editingPoem, setEditingPoem] = useState<PoetryCompactItem | null>(null);
  const [editPoemTitle, setEditPoemTitle] = useState('');
  const [editPoemExcerpt, setEditPoemExcerpt] = useState('');
  const [editPoemMediumUrl, setEditPoemMediumUrl] = useState('');
  const [editPoemDate, setEditPoemDate] = useState('');

  // Convert raw spotify input (URL or iframe) to valid embed src
  const parseSpotifySrc = (raw: string): string => {
    const trimmed = raw.trim();
    if (trimmed.includes('<iframe')) {
      const match = trimmed.match(/src=["'](.*?)["']/);
      if (match && match[1]) return match[1];
    }
    if (trimmed.includes('open.spotify.com/playlist/')) {
      const parts = trimmed.split('playlist/');
      if (parts[1]) {
        const id = parts[1].split('?')[0];
        return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;
      }
    }
    if (trimmed.includes('open.spotify.com/track/')) {
      const parts = trimmed.split('track/');
      if (parts[1]) {
        const id = parts[1].split('?')[0];
        return `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
      }
    }
    if (trimmed.startsWith('http')) return trimmed;
    return `https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator`;
  };

  const handleCreateSpotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyTitle || !spotifyInput) return;

    onAddSpotify({
      title: spotifyTitle,
      subtitle: spotifySubtitle || 'Curadoria musical',
      embedUrlOrCode: spotifyInput,
      externalUrl: spotifyInput.startsWith('http') ? spotifyInput : undefined,
    });

    setSpotifyTitle('');
    setSpotifySubtitle('');
    setSpotifyInput('');
    setIsSpotifyModalOpen(false);
  };

  const startEditSpotify = (item: SpotifyEmbedItem) => {
    setEditingSpotify(item);
    setEditSpotifyTitle(item.title);
    setEditSpotifySubtitle(item.subtitle || '');
    setEditSpotifyInput(item.embedUrlOrCode);
  };

  const handleSaveEditSpotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpotify || !onEditSpotify) return;

    onEditSpotify({
      ...editingSpotify,
      title: editSpotifyTitle,
      subtitle: editSpotifySubtitle || undefined,
      embedUrlOrCode: editSpotifyInput,
      externalUrl: editSpotifyInput.startsWith('http') ? editSpotifyInput : editingSpotify.externalUrl,
    });

    setEditingSpotify(null);
  };

  const handleCreatePoem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poemTitle || !poemExcerpt) return;

    onAddPoem({
      title: poemTitle,
      excerpt: poemExcerpt,
      mediumUrl: poemMediumUrl || mediumUrl,
      date: poemDate || 'Recente',
    });

    setPoemTitle('');
    setPoemExcerpt('');
    setPoemMediumUrl('');
    setPoemDate('');
    setIsPoemModalOpen(false);
  };

  const startEditPoem = (item: PoetryCompactItem) => {
    setEditingPoem(item);
    setEditPoemTitle(item.title);
    setEditPoemExcerpt(item.excerpt);
    setEditPoemMediumUrl(item.mediumUrl);
    setEditPoemDate(item.date || '');
  };

  const handleSaveEditPoem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPoem || !onEditPoem) return;

    onEditPoem({
      ...editingPoem,
      title: editPoemTitle,
      excerpt: editPoemExcerpt,
      mediumUrl: editPoemMediumUrl || mediumUrl,
      date: editPoemDate,
    });

    setEditingPoem(null);
  };

  return (
    <section id="repertorio-criativo" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold">
              07. Repertório & Sensibilidade
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Espaço Criativo
            </h2>
            <p className="text-sm sm:text-base text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl leading-relaxed">
              A música e a escrita sempre foram partes fundamentais da minha vida e estão entre os meus hobbies favoritos. Tenho um contato constante com a música — essencial para o meu processo criativo e fluxo de trabalho —, além de um apreço genuíno por escrever poesias e reflexões autorais.
            </p>
          </div>
        </div>

        {/* Two Columns: Spotify Playlists (Left) & Poesias (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spotify Playlists */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#1DB954]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#181816] dark:text-white font-sans">
                  Playlists no Spotify
                </h3>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setIsSpotifyModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#181816] dark:text-white bg-[#F4F3EE] dark:bg-[#1C1C1A] hover:bg-[#E8E6DF] dark:hover:bg-[#2E2E2A] rounded-lg transition-colors border border-[#E8E6DF] dark:border-[#2E2E2A]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Adicionar Playlist</span>
                </button>
              )}
            </div>

            {/* Spotify List */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 pb-2 md:pb-0 md:space-y-4 md:gap-0"
            >
              {spotifyPlaylists.map((item) => {
                const embedSrc = parseSpotifySrc(item.embedUrlOrCode);

                return (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="magnetic-card w-[84vw] sm:w-[320px] md:w-auto shrink-0 md:shrink snap-start p-3.5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl hover:border-[#1DB954]/60 transition-all duration-120 shadow-2xs hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-xs font-semibold text-[#181816] dark:text-white">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <span className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#73736C] dark:text-[#A8A89E] hover:text-[#1DB954] transition-colors"
                            title="Abrir no Spotify"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => startEditSpotify(item)}
                              className="text-[#73736C] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors p-1 rounded-md hover:bg-[#F4F3EE] dark:hover:bg-[#242422]"
                              title="Editar playlist"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteSpotify(item.id)}
                              className="text-[#A8A89E] hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-500/10"
                              title="Remover playlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden bg-[#121212]">
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-lg border-0 block"
                        title={item.title}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Poesias */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#181816] dark:text-white font-sans">
                  Poesias Autorais (Medium)
                </h3>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setIsPoemModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#181816] dark:text-white bg-[#F4F3EE] dark:bg-[#1C1C1A] hover:bg-[#E8E6DF] dark:hover:bg-[#2E2E2A] rounded-lg transition-colors border border-[#E8E6DF] dark:border-[#2E2E2A]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Adicionar Poesia</span>
                </button>
              )}
            </div>

            {/* Compact Poetry Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 pb-2 md:pb-0 md:space-y-3 md:gap-0"
            >
              {poems.map((poem) => (
                <motion.div
                  key={poem.id}
                  variants={staggerItem}
                  className="magnetic-card w-[84vw] sm:w-[320px] md:w-auto shrink-0 md:shrink snap-start p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl transition-all duration-120 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] mb-1.5">
                      <span>{poem.date || 'Poesia Autoral'}</span>
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditPoem(poem)}
                            className="text-[#73736C] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors p-1 rounded-md hover:bg-[#F4F3EE] dark:hover:bg-[#242422]"
                            title="Editar poesia"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeletePoem(poem.id)}
                            className="text-[#A8A89E] hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-500/10"
                            title="Remover poesia"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h4 className="text-base font-sans font-semibold text-[#181816] dark:text-[#F5F5F0] leading-snug mb-2">
                      {poem.title}
                    </h4>

                    {/* Compact excerpt quote with clean hairline border */}
                    <div className="p-3 bg-[#F4F3EE] dark:bg-[#242422] border-l-2 border-[#2563EB] dark:border-[#3B82F6] rounded-r-lg text-xs italic text-[#4A4A42] dark:text-[#D4D4CA] leading-relaxed mb-3">
                      “{poem.excerpt}”
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8E6DF] dark:border-[#2E2E2A] text-xs">
                    <span className="text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E]">
                      Publicado no Medium
                    </span>
                    <a
                      href={poem.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] hover:underline"
                    >
                      <span>Ler no Medium</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal: Adicionar Playlist do Spotify */}
      {isSpotifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Music2 className="w-4 h-4 text-[#1DB954]" />
                <span>Adicionar Playlist do Spotify</span>
              </div>
              <button
                onClick={() => setIsSpotifyModalOpen(false)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSpotify} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Playlist *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Foco Criativo & Design"
                  value={spotifyTitle}
                  onChange={(e) => setSpotifyTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Subtítulo / Descrição Curta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Instrumentais e Ambient para produção"
                  value={spotifySubtitle}
                  onChange={(e) => setSpotifySubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Link ou Código Embed do Spotify *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cole o link da playlist (open.spotify.com/playlist/...) ou <iframe>"
                  value={spotifyInput}
                  onChange={(e) => setSpotifyInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setIsSpotifyModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1DB954] hover:bg-[#1aa34a] rounded-lg shadow-xs"
                >
                  Salvar Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Editar Playlist do Spotify */}
      {editingSpotify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Pencil className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Editar Playlist do Spotify</span>
              </div>
              <button
                onClick={() => setEditingSpotify(null)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditSpotify} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Playlist *
                </label>
                <input
                  type="text"
                  required
                  value={editSpotifyTitle}
                  onChange={(e) => setEditSpotifyTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Subtítulo / Descrição Curta
                </label>
                <input
                  type="text"
                  value={editSpotifySubtitle}
                  onChange={(e) => setEditSpotifySubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Link ou Código Embed do Spotify *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editSpotifyInput}
                  onChange={(e) => setEditSpotifyInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setEditingSpotify(null)}
                  className="px-4 py-2 text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-xs"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Adicionar Poesia */}
      {isPoemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Feather className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Adicionar Poesia do Medium</span>
              </div>
              <button
                onClick={() => setIsPoemModalOpen(false)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePoem} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Poesia *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Intervalo e Silêncio"
                  value={poemTitle}
                  onChange={(e) => setPoemTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Trecho ou Estrofe em Destaque *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Digite os versos principais..."
                  value={poemExcerpt}
                  onChange={(e) => setPoemExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Link da Publicação no Medium
                </label>
                <input
                  type="url"
                  placeholder="https://medium.com/@seuperfil/..."
                  value={poemMediumUrl}
                  onChange={(e) => setPoemMediumUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setIsPoemModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-xs"
                >
                  Salvar Poesia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Editar Poesia */}
      {editingPoem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Pencil className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Editar Poesia do Medium</span>
              </div>
              <button
                onClick={() => setEditingPoem(null)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditPoem} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Poesia *
                </label>
                <input
                  type="text"
                  required
                  value={editPoemTitle}
                  onChange={(e) => setEditPoemTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Trecho ou Estrofe em Destaque *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editPoemExcerpt}
                  onChange={(e) => setEditPoemExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Link da Publicação no Medium
                </label>
                <input
                  type="url"
                  value={editPoemMediumUrl}
                  onChange={(e) => setEditPoemMediumUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Data ou Época
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2024 · Reflexões Autorais"
                  value={editPoemDate}
                  onChange={(e) => setEditPoemDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setEditingPoem(null)}
                  className="px-4 py-2 text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-xs"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

