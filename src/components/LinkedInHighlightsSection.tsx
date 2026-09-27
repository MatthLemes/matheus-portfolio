import React, { useState } from 'react';
import { Linkedin, ArrowUpRight, Plus, Trash2, Image, Code2, ExternalLink } from 'lucide-react';
import { LinkedInHighlight } from '../types/portfolio';

interface LinkedInHighlightsSectionProps {
  highlights: LinkedInHighlight[];
  linkedinProfileUrl: string;
  onAddHighlight: (highlight: Omit<LinkedInHighlight, 'id'>) => void;
  onDeleteHighlight: (id: string) => void;
  isAdmin?: boolean;
}

export const LinkedInHighlightsSection: React.FC<LinkedInHighlightsSectionProps> = ({
  highlights,
  linkedinProfileUrl,
  onAddHighlight,
  onDeleteHighlight,
  isAdmin = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [tag, setTag] = useState('Conquista & Carreira');
  const [date, setDate] = useState('2026');

  // Quick preset thumbnails for convenient preview selection
  const imagePresets = [
    {
      label: 'Conferência / Liderança',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    },
    {
      label: 'Inteligência Artificial',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      label: 'CRM & Métricas',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    },
    {
      label: 'Design & Criatividade',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    // Check if embed code contains an iframe src
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
      tag: tag || 'Destaque',
      date: date || 'Recente',
    });

    setTitle('');
    setSnippet('');
    setUrl('');
    setImageUrl('');
    setEmbedCode('');
    setTag('Conquista & Carreira');
    setDate('2026');
    setIsModalOpen(false);
  };

  // Helper to safely extract iframe src from embedCode
  const getEmbedIframeSrc = (code?: string): string | null => {
    if (!code) return null;
    const trimmed = code.trim();
    if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
      const match = trimmed.match(/src=["'](.*?)["']/);
      return match ? match[1] : null;
    }
    if (trimmed.startsWith('http')) {
      return trimmed;
    }
    return null;
  };

  return (
    <section id="linkedin-destaques" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#0A66C2] mb-1.5 font-semibold flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>06. Publicações & Artigos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
              Destaques do LinkedIn
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] mt-2 max-w-2xl">
              Postagens principais, artigos, miniaturas e registros visuais das maiores conquistas no LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#084e96] rounded transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar / Incorporar</span>
              </button>
            )}

            <a
              href={linkedinProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] bg-white border border-[#D5D5CA] hover:border-[#0A66C2] transition-colors rounded"
            >
              <span>Feed do LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>
          </div>
        </div>

        {/* Highlights Grid with mini preview images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => {
            const embedSrc = getEmbedIframeSrc(item.embedCode);

            return (
              <div
                key={item.id}
                className="bg-white border border-[#E2E2D8] hover:border-[#0A66C2] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group"
              >
                <div>
                  {/* Clean Non-Squished Preview Image or Natural Embed without inner scroll */}
                  {embedSrc ? (
                    <div className="w-full bg-[#FAF9F6] border-b border-[#EAEAE0] overflow-hidden flex justify-center items-center">
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
                    <div className="relative w-full aspect-16/9 bg-[#F4F4EE] overflow-hidden border-b border-[#EAEAE0]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-semibold text-white bg-black/75 backdrop-blur-xs px-2.5 py-0.5 rounded shadow-xs">
                        {item.tag || 'LinkedIn'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full aspect-16/9 bg-linear-to-r from-[#0A66C2]/10 to-[#0A66C2]/5 flex items-center justify-center border-b border-[#EAEAE0]">
                      <Linkedin className="w-10 h-10 text-[#0A66C2]/40" />
                    </div>
                  )}

                  {/* Content Body */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8C8C80] mb-2">
                      {!item.imageUrl && !embedSrc && (
                        <span className="text-[#0A66C2] font-semibold bg-[#0A66C2]/10 px-2 py-0.5 rounded text-[11px]">
                          {item.tag || 'LinkedIn'}
                        </span>
                      )}
                      <span className="text-[11px]">{item.date}</span>
                      {isAdmin && (
                        <button
                          onClick={() => onDeleteHighlight(item.id)}
                          className="text-[#B0B0A8] hover:text-red-600 transition-colors p-0.5"
                          title="Remover destaque"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h3 className="text-base font-sans font-semibold text-[#1A1A1A] group-hover:text-[#0A66C2] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>

                    {item.snippet && (
                      <p className="text-xs text-[#57574F] leading-relaxed line-clamp-3">
                        {item.snippet}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer action link */}
                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#F2F2EB] flex items-center justify-between text-xs bg-[#FCFCFB]">
                  <span className="text-[11px] font-mono text-[#7D7D75] flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                    <span>Post Oficial</span>
                  </span>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono font-medium text-[#0A66C2] group-hover:underline"
                  >
                    <span>Ver no LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Adicionar / Incorporar Destaque */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white border border-[#E2E2D8] rounded-lg shadow-2xl p-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>Adicionar ou Incorporar Destaque do LinkedIn</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#7A7A70] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Título da Postagem ou Conquista *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Selecionado na Conferência Na Prática"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Link da Publicação no LinkedIn
                </label>
                <input
                  type="url"
                  placeholder="https://www.linkedin.com/posts/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                />
              </div>

              {/* Image URL with Preset Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-[#66665E] flex items-center gap-1">
                    <Image className="w-3 h-3 text-[#0A66C2]" />
                    <span>Mini Imagem de Pré-visualização (URL)</span>
                  </label>
                </div>
                <input
                  type="url"
                  placeholder="https://... (URL da foto/print da postagem)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2] mb-1.5"
                />

                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-[#8C8C80] font-mono">Sugestões:</span>
                  {imagePresets.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className="px-2 py-0.5 rounded bg-[#F0EFEB] hover:bg-[#E2E1DA] text-[#4A4A40] transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Embed Code option */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-[#0A66C2]" />
                  <span>Ou Código de Incorporação (Embed LinkedIn / &lt;iframe&gt;)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder={`Cole o código <iframe ...> obtido em "Embed this post" no LinkedIn`}
                  value={embedCode}
                  onChange={(e) => setEmbedCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                    Tag / Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Conquista & Carreira"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                    Ano / Data
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Resumo ou Trecho do Post
                </label>
                <textarea
                  rows={2}
                  placeholder="Breve resumo sobre o tema do post ou impacto da conquista..."
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEFEA]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#66665E] hover:text-[#1A1A1A]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#084e96] rounded shadow-xs"
                >
                  Salvar Destaque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
