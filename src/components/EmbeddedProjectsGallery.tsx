import React, { useState } from 'react';
import { Plus, ExternalLink, Trash2, Code2, Layers, Check, Settings2, Eye } from 'lucide-react';
import { EmbeddedProject } from '../types/portfolio';

interface EmbeddedProjectsGalleryProps {
  projects: EmbeddedProject[];
  behanceUrl: string;
  onAddProject: (project: Omit<EmbeddedProject, 'id'>) => void;
  onDeleteProject: (id: string) => void;
  isAdmin?: boolean;
}

export const EmbeddedProjectsGallery: React.FC<EmbeddedProjectsGalleryProps> = ({
  projects,
  behanceUrl,
  onAddProject,
  onDeleteProject,
  isAdmin = false,
}) => {
  const [curatorMode, setCuratorMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Identidade Visual');
  const [embedCodeOrUrl, setEmbedCodeOrUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !embedCodeOrUrl) return;

    const tags = tagsInput
      ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Behance', category];

    // Determine external URL if possible
    let externalUrl = behanceUrl;
    if (embedCodeOrUrl.startsWith('http')) {
      externalUrl = embedCodeOrUrl;
    } else {
      const srcMatch = embedCodeOrUrl.match(/src=["'](.*?)["']/);
      if (srcMatch && srcMatch[1]) {
        externalUrl = srcMatch[1];
      }
    }

    onAddProject({
      title,
      category,
      embedCodeOrUrl,
      description,
      externalUrl,
      tags,
    });

    setTitle('');
    setEmbedCodeOrUrl('');
    setDescription('');
    setTagsInput('');
    setIsModalOpen(false);
  };

  // Helper to extract iframe src or render iframe safely
  const renderEmbedContent = (project: EmbeddedProject) => {
    const raw = project.embedCodeOrUrl.trim();

    // Case 1: Raw iframe code from Behance or elsewhere
    if (raw.startsWith('<iframe') || raw.includes('<iframe')) {
      const srcMatch = raw.match(/src=["'](.*?)["']/);
      const iframeSrc = srcMatch ? srcMatch[1] : '';

      if (iframeSrc) {
        return (
          <div className="relative w-full max-w-[404px] mx-auto min-h-[316px] flex items-center justify-center">
            <iframe
              src={iframeSrc}
              height="316"
              width="404"
              className="max-w-full border-0 mx-auto rounded-lg shadow-xs"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={project.title}
            />
          </div>
        );
      }
    }

    // Case 2: Behance direct link or other web link
    return (
      <div className="relative w-full aspect-16/10 bg-[#F7F7F2] rounded-lg p-6 flex flex-col items-center justify-center text-center border border-[#E5E5DC] group-hover:border-[#0057FF]/40 transition-colors">
        <div className="w-12 h-12 rounded bg-[#0057FF]/10 text-[#0057FF] flex items-center justify-center mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-sm text-[#1A1A1A] mb-1">
          {project.title}
        </h4>
        <p className="text-xs text-[#6B6B62] max-w-sm mb-4 line-clamp-2">
          {project.description || 'Projeto visual e estudo de caso hospedado no Behance.'}
        </p>
        <a
          href={project.externalUrl || project.embedCodeOrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0057FF] hover:bg-[#0047D4] transition-colors rounded shadow-xs"
        >
          <span>Visualizar no Behance</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  };

  return (
    <section id="projetos" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FCFCFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#0057FF] mb-1.5 font-semibold">
              05. Portfólio Visual & Behance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
              Vitrine de Projetos
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] mt-2 max-w-2xl">
              Estudos de caso visuais, identidades de marca e direções de arte incorporadas diretamente do Behance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Curator/Owner Toggle (only visible to admin) */}
            {isAdmin && (
              <>
                <button
                  onClick={() => setCuratorMode(!curatorMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded transition-colors border ${
                    curatorMode
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#66665E] hover:text-[#1A1A1A] border-[#D5D5CA]'
                  }`}
                  title="Apenas para o autor: gerenciar e incorporar novos projetos"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{curatorMode ? 'Modo Curador Ativo' : 'Gerenciar Minha Vitrine'}</span>
                </button>

                {curatorMode && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0057FF] hover:bg-[#0047D4] transition-colors rounded shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Incorporar Projeto</span>
                  </button>
                )}
              </>
            )}

            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0057FF] bg-white border border-[#D0D0C8] hover:border-[#0057FF] transition-colors rounded"
            >
              <span>Ver Behance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Curator Alert Banner (visible only when curator mode is active) */}
        {curatorMode && (
          <div className="mb-6 p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1E40AF] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 shrink-0 text-[#2563EB]" />
              <span>
                <strong>Modo Curador ativo:</strong> Esta barra e os botões de remoção são visíveis apenas para você personalizar a vitrine de projetos.
              </span>
            </div>
            <button
              onClick={() => setCuratorMode(false)}
              className="text-[11px] font-semibold text-[#1E40AF] underline underline-offset-2 shrink-0 text-left sm:text-right"
            >
              Concluir & Ocultar
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 ${projects.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'} gap-8 justify-center`}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-[#E2E2D8] hover:border-[#0057FF]/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all shadow-xs relative"
            >
              {curatorMode && (
                <button
                  onClick={() => onDeleteProject(project.id)}
                  title="Remover projeto da vitrine"
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white text-[#999990] hover:text-red-600 rounded-full border border-[#E5E5DC] shadow-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Behance Embed Viewport */}
              <div className="w-full flex justify-center items-center">
                {renderEmbedContent(project)}
              </div>
            </div>
          ))}
        </div>

        {/* Curator Instructions (only visible in curator mode) */}
        {curatorMode && (
          <div className="mt-8 p-4 bg-white border border-[#E5E5DC] rounded text-xs text-[#6B6B62] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0057FF] shrink-0" />
              <span>
                <strong>Como incorporar do Behance:</strong> No seu projeto no Behance, clique em <em>Compartilhar / Embed</em>, copie o código <code>&lt;iframe&gt;</code> e clique em <strong>Incorporar Projeto</strong>.
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-[#0057FF] underline underline-offset-4 shrink-0"
            >
              Adicionar agora
            </button>
          </div>
        )}
      </div>

      {/* Modal to Embed New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white border border-[#E2E2D8] rounded-lg shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFEFEA] bg-[#FCFCFB]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]">
                <Layers className="w-4 h-4 text-[#0057FF]" />
                <span>Incorporar Projeto na Minha Vitrine</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#7A7A70] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Título do Projeto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Identidade Visual Institucional"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                >
                  <option value="Identidade Visual">Identidade Visual</option>
                  <option value="Design Gráfico">Design Gráfico</option>
                  <option value="UX/UI & Interfaces">UX/UI & Interfaces</option>
                  <option value="Design Editorial">Design Editorial</option>
                  <option value="Marketing & Comunicação">Marketing & Comunicação</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Código de Embed do Behance ou URL do Projeto *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Cole o código <iframe ...> do Behance ou link direto`}
                  value={embedCodeOrUrl}
                  onChange={(e) => setEmbedCodeOrUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Breve Descrição
                </label>
                <textarea
                  rows={2}
                  placeholder="Resumo do desafio, ferramentas e resultado alcançado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#66665E] mb-1">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="Identidade Visual, Illustrator, Branding"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#D5D5CA] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
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
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0057FF] hover:bg-[#0047D4] rounded shadow-xs"
                >
                  Salvar na Vitrine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
