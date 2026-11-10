import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ArrowUpRight, Plus, Trash2, Pencil, Image, Code2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { LinkedInHighlight } from '../types/portfolio';
import { staggerContainer, cardStaggerItem } from '../utils/animationVariants';

interface LinkedInHighlightsSectionProps {
  highlights: LinkedInHighlight[];
  linkedinProfileUrl: string;
  onAddHighlight: (highlight: Omit<LinkedInHighlight, 'id'>) => void;
  onEditHighlight?: (highlight: LinkedInHighlight) => void;
  onDeleteHighlight: (id: string) => void;
  onMoveHighlight?: (id: string, direction: 'prev' | 'next') => void;
  isAdmin?: boolean;
}

export type FourTabCategory =
  | 'Todas as Publicações'
  | 'Credenciais & Carreira'
  | 'Palestras & Histórias'
  | 'Artigos & Insights';

export const LinkedInHighlightsSection: React.FC<LinkedInHighlightsSectionProps> = ({
  highlights,
  linkedinProfileUrl,
  onAddHighlight,
  onEditHighlight,
  onDeleteHighlight,
  onMoveHighlight,
  isAdmin = false,
}) => {
  const [activeTab, setActiveTab] = useState<FourTabCategory>('Todas as Publicações');
  const [showAllPosts, setShowAllPosts] = useState(false);
  
  // Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [categoryChoice, setCategoryChoice] = useState<FourTabCategory>('Credenciais & Carreira');
  const [date, setDate] = useState('2026');

  // Edit Modal State
  const [editingHighlight, setEditingHighlight] = useState<LinkedInHighlight | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSnippet, setEditSnippet] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editEmbedCode, setEditEmbedCode] = useState('');
  const [editCategory, setEditCategory] = useState<FourTabCategory>('Credenciais & Carreira');
  const [editDate, setEditDate] = useState('2026');

  // Spotlight mouse tracking state per card
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  // 4 Consolidated Categories Helper - priority given to explicit tag
  const getItemCategory = (item: LinkedInHighlight): FourTabCategory => {
    if (
      item.tag === 'Credenciais & Carreira' ||
      item.tag === 'Palestras & Histórias' ||
      item.tag === 'Artigos & Insights'
    ) {
      return item.tag;
    }

    const text = `${item.title} ${item.snippet || ''} ${item.tag || ''}`.toLowerCase();

    if (
      text.includes('certifica') ||
      text.includes('harvard') ||
      text.includes('google') ||
      text.includes('credencial') ||
      text.includes('carreira') ||
      text.includes('conferência') ||
      text.includes('na prática') ||
      text.includes('bolsista')
    ) {
      return 'Credenciais & Carreira';
    }

    if (
      text.includes('palestra') ||
      text.includes('jovens') ||
      text.includes('história') ||
      text.includes('trajetória') ||
      text.includes('moldou') ||
      text.includes('superação') ||
      text.includes('painel') ||
      text.includes('talk')
    ) {
      return 'Palestras & Histórias';
    }

    return 'Artigos & Insights';
  };

  // 4 Tabs with dynamic counters
  const tabs = useMemo<{ id: FourTabCategory; label: string; count: number }[]>(() => {
    const allCount = highlights.length;
    const credentialsCount = highlights.filter(
      (h) => getItemCategory(h) === 'Credenciais & Carreira'
    ).length;
    const talksStoriesCount = highlights.filter(
      (h) => getItemCategory(h) === 'Palestras & Histórias'
    ).length;
    const articlesCount = highlights.filter(
      (h) => getItemCategory(h) === 'Artigos & Insights'
    ).length;

    return [
      { id: 'Todas as Publicações', label: 'Todas as Publicações', count: allCount },
      { id: 'Credenciais & Carreira', label: 'Credenciais & Carreira', count: credentialsCount },
      { id: 'Palestras & Histórias', label: 'Palestras & Histórias', count: talksStoriesCount },
      { id: 'Artigos & Insights', label: 'Artigos & Insights', count: articlesCount },
    ];
  }, [highlights]);

  // Filtered highlights based on active tab
  const filteredHighlights = useMemo(() => {
    if (activeTab === 'Todas as Publicações') return highlights;
    return highlights.filter((h) => getItemCategory(h) === activeTab);
  }, [highlights, activeTab]);

  // Paginated highlights (6 initial on 'Todas', with 'Carregar Mais')
  const displayedHighlights = useMemo(() => {
    if (activeTab === 'Todas as Publicações') {
      return showAllPosts ? filteredHighlights : filteredHighlights.slice(0, 6);
    }
    return filteredHighlights;
  }, [filteredHighlights, activeTab, showAllPosts]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    let finalUrl = url;
    if (!finalUrl && embedCode) {
      const match = embedCode.match(/src=["'](.*?)["']/);
      if (match && match[1]) finalUrl = match[1];
    }

    onAddHighlight({
      title,
      snippet,
      url: finalUrl || linkedinProfileUrl,
      imageUrl: imageUrl.trim() || undefined,
      embedCode: embedCode.trim() || undefined,
      tag: categoryChoice,
      date: date || '2026',
    });

    setTitle('');
    setSnippet('');
    setUrl('');
    setImageUrl('');
    setEmbedCode('');
    setIsModalOpen(false);
  };

  const handleOpenEdit = (item: LinkedInHighlight) => {
    setEditingHighlight(item);
    setEditTitle(item.title);
    setEditSnippet(item.snippet || '');
    setEditUrl(item.url || '');
    setEditImageUrl(item.imageUrl || '');
    setEditEmbedCode(item.embedCode || '');
    setEditCategory(getItemCategory(item));
    setEditDate(item.date || '2026');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHighlight || !editTitle) return;

    let finalUrl = editUrl;
    if (!finalUrl && editEmbedCode) {
      const match = editEmbedCode.match(/src=["'](.*?)["']/);
      if (match && match[1]) finalUrl = match[1];
    }

    if (onEditHighlight) {
      onEditHighlight({
        ...editingHighlight,
        title: editTitle,
        snippet: editSnippet,
        url: finalUrl || linkedinProfileUrl,
        imageUrl: editImageUrl.trim() || undefined,
        embedCode: editEmbedCode.trim() || undefined,
        tag: editCategory,
        date: editDate || '2026',
      });
    }

    setEditingHighlight(null);
  };

  const getEmbedIframeSrc = (code?: string): string | null => {
    if (!code) return null;
    const trimmed = code.trim();
    if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
      const match = trimmed.match(/src=["'](.*?)["']/);
      return match ? match[1] : null;
    }
    if (trimmed.startsWith('http')) return trimmed;
    return null;
  };

  return (
    <section id="linkedin-destaques" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>06. Publicações & Artigos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Destaques do LinkedIn
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
              Postagens principais, conquistas profissionais, palestras e artigos organizados em 4 categorias essenciais.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Destaque</span>
              </button>
            )}

            <a
              href={linkedinProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#181816] dark:text-[#F5F5F0] bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors rounded-lg shadow-2xs"
            >
              <span>Feed do LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
            </a>
          </div>
        </div>

        {/* 4 Clean Segmented Tabs with Dynamic Counters */}
        <div className="mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F4F3EE] dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-xs font-mono shadow-2xs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowAllPosts(false);
                  }}
                  className={`relative px-3.5 py-2 rounded-lg transition-all duration-150 flex items-center gap-2 whitespace-nowrap font-medium ${
                    isActive
                      ? 'bg-white dark:bg-[#242422] text-[#2563EB] dark:text-[#3B82F6] shadow-2xs font-semibold'
                      : 'text-[#57574F] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#2563EB]/10 dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6]'
                        : 'bg-black/5 dark:bg-white/10 text-[#73736C] dark:text-[#A8A89E]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlights Grid with Mouse Spotlight Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (showAllPosts ? '-expanded' : '')}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {displayedHighlights.length === 0 ? (
              <div className="col-span-full py-12 text-center text-xs font-mono text-[#73736C] dark:text-[#A8A89E] bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl">
                Nenhuma publicação encontrada para esta categoria ainda.
              </div>
            ) : (
              displayedHighlights.map((item, index) => {
                const embedSrc = getEmbedIframeSrc(item.embedCode);
                const category = getItemCategory(item);
                const isHovered = hoveredCardId === item.id;
                const mousePos = cardMousePos[item.id] || { x: 0, y: 0 };

                return (
                  <motion.article
                    key={item.id}
                    variants={cardStaggerItem}
                    onMouseEnter={() => setHoveredCardId(item.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onMouseMove={(e) => handleCardMouseMove(item.id, e)}
                    className="magnetic-card relative bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
                  >
                    {/* Mouse Spotlight radial gradient */}
                    <div
                      className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-1"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
                      }}
                      aria-hidden="true"
                    />

                    {/* Admin Reorder, Edit & Delete Controls */}
                    {isAdmin && (
                      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-white/95 dark:bg-[#1C1C1A]/95 backdrop-blur-xs p-1 rounded-full border border-[#E8E6DF] dark:border-[#2E2E2A] shadow-xs">
                        {onMoveHighlight && (
                          <>
                            <button
                              onClick={() => onMoveHighlight(item.id, 'prev')}
                              disabled={index === 0}
                              title="Mover para a esquerda"
                              className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-30 rounded-full transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onMoveHighlight(item.id, 'next')}
                              disabled={index === highlights.length - 1}
                              title="Mover para a direita"
                              className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-30 rounded-full transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Editar publicação (trocar categoria, texto, link, etc)"
                          className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] rounded-full transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteHighlight(item.id)}
                          title="Remover destaque"
                          className="p-1 text-[#A8A89E] hover:text-red-500 rounded-full transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="relative z-2">
                      {/* Embed or Preview */}
                      {embedSrc ? (
                        <div className="w-full bg-[#F4F3EE] dark:bg-[#121211] border-b border-[#E8E6DF] dark:border-[#2E2E2A] overflow-hidden flex justify-center items-center">
                          <iframe
                            src={embedSrc}
                            className="w-full border-0 block"
                            style={{ height: '520px', minHeight: '480px' }}
                            title={item.title}
                            allowFullScreen
                            scrolling="no"
                          />
                        </div>
                      ) : item.imageUrl ? (
                        <div className="relative w-full aspect-16/9 bg-[#F4F3EE] dark:bg-[#242422] overflow-hidden border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-16/9 bg-[#F4F3EE] dark:bg-[#242422] flex items-center justify-center border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                          <Linkedin className="w-8 h-8 text-[#2563EB]/40 dark:text-[#3B82F6]/40" />
                        </div>
                      )}

                      {/* Content Body with Zero-Pill Metadata */}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E] mb-2.5">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                              {category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{item.date}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-sans font-semibold text-[#181816] dark:text-[#F5F5F0] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors leading-snug mb-2">
                          {item.title}
                        </h3>

                        {item.snippet && (
                          <p className="text-xs text-[#57574F] dark:text-[#A8A89E] leading-relaxed line-clamp-3">
                            {item.snippet}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="relative z-2 px-5 py-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center justify-between text-xs bg-[#FAF9F5] dark:bg-[#181816]">
                      <span className="text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] flex items-center gap-1">
                        <Linkedin className="w-3 h-3 text-[#2563EB] dark:text-[#3B82F6]" />
                        <span>LinkedIn Post</span>
                      </span>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] hover:underline"
                      >
                        <span>Acessar</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.article>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Editorial "Carregar Mais" Button for 'Todas' Tab */}
        {activeTab === 'Todas as Publicações' && filteredHighlights.length > 6 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAllPosts(!showAllPosts)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E8E6DF] dark:border-[#2E2E2A] bg-white dark:bg-[#1C1C1A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6] text-xs font-mono font-semibold transition-all duration-120 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              {showAllPosts ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Mostrar apenas 6 publicações</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>
                    Carregar mais publicações (+{filteredHighlights.length - 6} restantes)
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal: Adicionar Novo Destaque */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Linkedin className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Adicionar Destaque do LinkedIn</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Publicação *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Conquista de Bolsista na Fundação Estudar"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Categoria Editorial
                  </label>
                  <select
                    value={categoryChoice}
                    onChange={(e) => setCategoryChoice(e.target.value as FourTabCategory)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Credenciais & Carreira">Credenciais & Carreira</option>
                    <option value="Palestras & Histórias">Palestras & Histórias</option>
                    <option value="Artigos & Insights">Artigos & Insights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Ano / Data
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  URL da Publicação no LinkedIn
                </label>
                <input
                  type="url"
                  placeholder="https://www.linkedin.com/posts/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  URL da Imagem de Prévia (Opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-[#2563EB]" />
                  <span>Código de Embed do LinkedIn &lt;iframe&gt; (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder={`<iframe src="https://www.linkedin.com/embed/..." ...>`}
                  value={embedCode}
                  onChange={(e) => setEmbedCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Resumo / Trecho
                </label>
                <textarea
                  rows={2}
                  placeholder="Breve descrição da publicação..."
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-xs"
                >
                  Salvar Destaque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Editar Destaque Existente */}
      {editingHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Pencil className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Editar Publicação do LinkedIn</span>
              </div>
              <button
                onClick={() => setEditingHighlight(null)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Publicação *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#2563EB] dark:text-[#3B82F6] mb-1 font-semibold">
                    Categoria Editorial
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as FourTabCategory)}
                    className="w-full px-3 py-2 text-xs border border-[#2563EB] dark:border-[#3B82F6] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none"
                  >
                    <option value="Credenciais & Carreira">Credenciais & Carreira</option>
                    <option value="Palestras & Histórias">Palestras & Histórias</option>
                    <option value="Artigos & Insights">Artigos & Insights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Ano / Data
                  </label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  URL da Publicação no LinkedIn
                </label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  URL da Imagem de Prévia (Opcional)
                </label>
                <input
                  type="url"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-[#2563EB]" />
                  <span>Código de Embed do LinkedIn &lt;iframe&gt; (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  value={editEmbedCode}
                  onChange={(e) => setEditEmbedCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Resumo / Trecho
                </label>
                <textarea
                  rows={2}
                  value={editSnippet}
                  onChange={(e) => setEditSnippet(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                <button
                  type="button"
                  onClick={() => setEditingHighlight(null)}
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
