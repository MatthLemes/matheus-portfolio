import React, { useState } from 'react';
import { Music2, Feather, Plus, ExternalLink, Trash2, ArrowUpRight } from 'lucide-react';
import { SpotifyEmbedItem, PoetryCompactItem } from '../types/portfolio';

interface CreativeSpaceSectionProps {
  spotifyPlaylists: SpotifyEmbedItem[];
  poems: PoetryCompactItem[];
  mediumUrl: string;
  onAddSpotify: (item: Omit<SpotifyEmbedItem, 'id'>) => void;
  onDeleteSpotify: (id: string) => void;
  onAddPoem: (item: Omit<PoetryCompactItem, 'id'>) => void;
  onDeletePoem: (id: string) => void;
  isAdmin?: boolean;
}

export const CreativeSpaceSection: React.FC<CreativeSpaceSectionProps> = ({
  spotifyPlaylists,
  poems,
  mediumUrl,
  onAddSpotify,
  onDeleteSpotify,
  onAddPoem,
  onDeletePoem,
  isAdmin = false,
}) => {
  // Spotify Modal State
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false);
  const [spotifyTitle, setSpotifyTitle] = useState('');
  const [spotifySubtitle, setSpotifySubtitle] = useState('');
  const [spotifyInput, setSpotifyInput] = useState('');

  // Poem Modal State
  const [isPoemModalOpen, setIsPoemModalOpen] = useState(false);
  const [poemTitle, setPoemTitle] = useState('');
  const [poemExcerpt, setPoemExcerpt] = useState('');
  const [poemMediumUrl, setPoemMediumUrl] = useState('');
  const [poemDate, setPoemDate] = useState('');

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
    if (trimmed.includes('open.spotify.com/album/')) {
      const parts = trimmed.split('album/');
      if (parts[1]) {
        const id = parts[1].split('?')[0];
        return `https://open.spotify.com/embed/album/${id}?utm_source=generator`;
      }
    }
    return trimmed;
  };

  const handleCreateSpotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyTitle || !spotifyInput) return;

    const embedUrl = parseSpotifySrc(spotifyInput);
    onAddSpotify({
      title: spotifyTitle,
      subtitle: spotifySubtitle || 'Playlist selecionada',
      embedUrlOrCode: embedUrl,
      externalUrl: spotifyInput.startsWith('http') ? spotifyInput : undefined,
    });

    setSpotifyTitle('');
    setSpotifySubtitle('');
    setSpotifyInput('');
    setIsSpotifyModalOpen(false);
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

  return (
    <section id="repertorio-criativo" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FCFCFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 flex items-center gap-1.5">
              <Music2 className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>07. Repertório Criativo & Sonoro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
              Playlists & Poesias
            </h2>
            <p className="text-sm sm:text-base text-[#57574F] mt-2 max-w-2xl leading-relaxed">
              A música e a escrita sempre foram partes fundamentais da minha vida e estão entre os meus hobbies favoritos. Tenho um contato constante com a música — essencial para o meu processo criativo e fluxo de trabalho —, além de um apreço genuíno por escrever poesias e reflexões autorais.
            </p>
          </div>
        </div>

        {/* Two Columns: Spotify Playlists (Left) & Poesias (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spotify Playlists with compact embed */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBEBE2]">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#1DB954]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Playlists no Spotify
                </h3>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setIsSpotifyModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#1A1A1A] bg-[#F1F1EB] hover:bg-[#E5E5DC] rounded transition-colors border border-[#DCDCD0]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Adicionar Playlist</span>
                </button>
              )}
            </div>

            {/* Spotify List */}
            <div className="space-y-4">
              {spotifyPlaylists.map((item) => {
                const embedSrc = parseSpotifySrc(item.embedUrlOrCode);

                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white border border-[#E2E2D8] rounded-xl hover:border-[#1DB954]/60 transition-colors shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-xs font-semibold text-[#1A1A1A]">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <span className="text-[11px] text-[#73736C]">
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
                            className="text-[#66665E] hover:text-[#1DB954] transition-colors"
                            title="Abrir no Spotify"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {isAdmin && (
                          <button
                            onClick={() => onDeleteSpotify(item.id)}
                            className="text-[#999990] hover:text-red-600 transition-colors"
                            title="Remover playlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Compact Spotify Player (Height 152px) */}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Poesias com Incorporação Menor / Compacta */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBEBE2]">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#1A1A1A]" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Poesias Autorais (Medium)
                </h3>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setIsPoemModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#1A1A1A] bg-[#F1F1EB] hover:bg-[#E5E5DC] rounded transition-colors border border-[#DCDCD0]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Adicionar Poesia</span>
                </button>
              )}
            </div>

            {/* Compact Poetry Cards */}
            <div className="space-y-3">
              {poems.map((poem) => (
                <div
                  key={poem.id}
                  className="p-4 bg-white border border-[#E2E2D8] rounded-xl hover:border-[#1A1A1A] transition-colors shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8C80] mb-1.5">
                      <span>{poem.date || 'Poesia Autoral'}</span>
                      {isAdmin && (
                        <button
                          onClick={() => onDeletePoem(poem.id)}
                          className="text-[#999990] hover:text-red-600 transition-colors"
                          title="Remover poesia"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h4 className="text-base font-sans font-semibold text-[#1A1A1A] leading-snug mb-2">
                      {poem.title}
                    </h4>

                    {/* Compact excerpt quote */}
                    <div className="p-3 bg-[#FAF9F5] border-l-2 border-[#1A1A1A] rounded-r text-xs font-sans italic text-[#3A3934] leading-relaxed mb-3">
                      “{poem.excerpt}”
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F3F3EA] text-xs">
                    <span className="text-[11px] font-mono text-[#7D7D75]">
                      Publicado no Medium
                    </span>
                    <a
                      href={poem.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-medium text-[#1A1A1A] hover:underline"
                    >
                      <span>Ler no Medium</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Adicionar Playlist do Spotify */}
      {isSpotifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-white border border-[#E2E2D8] rounded-lg shadow-2xl p-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                <Music2 className="w-4 h-4 text-[#1DB954]" />
                <span>Adicionar Playlist do Spotify</span>
              </div>
              <button
                onClick={() => setIsSpotifyModalOpen(false)}
                className="text-xs text-[#7A7A70] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSpotify} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Título da Playlist *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Foco Criativo & Design"
                  value={spotifyTitle}
                  onChange={(e) => setSpotifyTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Subtítulo / Descrição Curta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Instrumentais, Jazz e Ambient para produção"
                  value={spotifySubtitle}
                  onChange={(e) => setSpotifySubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Link ou Código Embed do Spotify *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cole o link da playlist (open.spotify.com/playlist/...) ou o código <iframe> do Spotify"
                  value={spotifyInput}
                  onChange={(e) => setSpotifyInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1DB954]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEFEA]">
                <button
                  type="button"
                  onClick={() => setIsSpotifyModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#66665E] hover:text-[#1A1A1A]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1DB954] hover:bg-[#1aa34a] rounded shadow-xs"
                >
                  Salvar Playlist
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
            className="relative w-full max-w-md bg-white border border-[#E2E2D8] rounded-lg shadow-2xl p-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                <Feather className="w-4 h-4 text-[#1A1A1A]" />
                <span>Adicionar Poesia do Medium</span>
              </div>
              <button
                onClick={() => setIsPoemModalOpen(false)}
                className="text-xs text-[#7A7A70] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePoem} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Título da Poesia *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Intervalo e Silêncio"
                  value={poemTitle}
                  onChange={(e) => setPoemTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Trecho ou Estrofe em Destaque *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Digite os versos principais..."
                  value={poemExcerpt}
                  onChange={(e) => setPoemExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-serif border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Link da Publicação no Medium
                </label>
                <input
                  type="url"
                  placeholder="https://medium.com/@seuperfil/..."
                  value={poemMediumUrl}
                  onChange={(e) => setPoemMediumUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEFEA]">
                <button
                  type="button"
                  onClick={() => setIsPoemModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#66665E] hover:text-[#1A1A1A]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-[#333333] rounded shadow-xs"
                >
                  Salvar Poesia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
