import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ExternalLink, Trash2, Code2, Layers, Settings2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmbeddedProject } from '../types/portfolio';
import { staggerContainer, cardStaggerItem } from '../utils/animationVariants';

interface EmbeddedProjectsGalleryProps {
  projects: EmbeddedProject[];
  behanceUrl: string;
  onAddProject: (project: Omit<EmbeddedProject, 'id'>, insertAfterId?: string) => void;
  onDeleteProject: (id: string) => void;
  onMoveProject?: (id: string, direction: 'prev' | 'next') => void;
  isAdmin?: boolean;
}

export const EmbeddedProjectsGallery: React.FC<EmbeddedProjectsGalleryProps> = ({
  projects,
  behanceUrl,
  onAddProject,
  onDeleteProject,
  onMoveProject,
  isAdmin = false,
}) => {
  const [curatorMode, setCuratorMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Identidade Visual');
  const [embedCodeOrUrl, setEmbedCodeOrUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [insertPosition, setInsertPosition] = useState<string>('after-logomarca');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !embedCodeOrUrl) return;

    const tags = tagsInput
      ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Behance', category];

    let externalUrl = behanceUrl;
    if (embedCodeOrUrl.startsWith('http')) {
      externalUrl = embedCodeOrUrl;
    } else {
      const srcMatch = embedCodeOrUrl.match(/src=["'](.*?)["']/);
      if (srcMatch && srcMatch[1]) {
        externalUrl = srcMatch[1];
      }
    }

    onAddProject(
      {
        title,
        category,
        embedCodeOrUrl,
        description,
        externalUrl,
        tags,
      },
      insertPosition
    );

    setTitle('');
    setEmbedCodeOrUrl('');
    setDescription('');
    setTagsInput('');
    setIsModalOpen(false);
  };

  const renderEmbedContent = (project: EmbeddedProject) => {
    const raw = project.embedCodeOrUrl.trim();

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
              className="max-w-full border-0 mx-auto rounded-lg shadow-2xs"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={project.title}
            />
          </div>
        );
      }
    }

    return (
      <div className="relative w-full aspect-16/10 bg-[#F4F3EE] dark:bg-[#242422] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-[#E8E6DF] dark:border-[#2E2E2A] group-hover:border-[#2563EB] dark:group-hover:border-[#3B82F6] transition-colors">
        <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-sm text-[#181816] dark:text-white mb-1">
          {project.title}
        </h4>
        <p className="text-xs text-[#57574F] dark:text-[#A8A89E] max-w-sm mb-4 line-clamp-2">
          {project.description || 'Projeto visual e estudo de caso hospedado no Behance.'}
        </p>
        <a
          href={project.externalUrl || project.embedCodeOrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-colors rounded-lg shadow-2xs"
        >
          <span>Visualizar no Behance</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  };

  return (
    <section id="projetos" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold">
              05. Portfólio Visual & Behance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Vitrine de Projetos
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
              Estudos de caso visuais, identidades de marca e direções de arte incorporadas diretamente do Behance.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isAdmin && (
              <>
                <button
                  onClick={() => setCuratorMode(!curatorMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                    curatorMode
                      ? 'bg-[#181816] text-white dark:bg-white dark:text-[#181816] border-[#181816]'
                      : 'bg-white dark:bg-[#1C1C1A] text-[#57574F] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white border-[#E8E6DF] dark:border-[#2E2E2A]'
                  }`}
                  title="Gerenciar e organizar projetos da vitrine"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{curatorMode ? 'Modo Curador Ativo' : 'Gerenciar Vitrine'}</span>
                </button>

                {curatorMode && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-colors rounded-lg shadow-2xs"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors rounded-lg shadow-2xs"
            >
              <span>Ver Behance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Curator Alert Banner */}
        {curatorMode && (
          <div className="mb-6 p-4 bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border border-[#2563EB]/30 dark:border-[#3B82F6]/30 rounded-xl text-xs text-[#2563EB] dark:text-[#3B82F6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 shrink-0 text-[#2563EB] dark:text-[#3B82F6]" />
              <span>
                <strong>Modo Curador ativo:</strong> Reorganize e incorpore projetos diretamente nesta área.
              </span>
            </div>
            <button
              onClick={() => setCuratorMode(false)}
              className="text-[11px] font-semibold underline underline-offset-2 shrink-0 text-left sm:text-right"
            >
              Concluir & Ocultar
            </button>
          </div>
        )}

        {/* Projects Grid / Proportional Aspect Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={`flex md:grid overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-5 sm:gap-6 md:gap-8 ${
            projects.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'
          } justify-start md:justify-center pb-3 md:pb-0`}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardStaggerItem}
              className="magnetic-card w-[88vw] sm:w-[380px] md:w-auto shrink-0 md:shrink snap-center group bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-120 shadow-2xs hover:shadow-md relative"
            >
              {curatorMode && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/95 dark:bg-[#1C1C1A]/95 backdrop-blur-xs p-1 rounded-full border border-[#E8E6DF] dark:border-[#2E2E2A] shadow-xs">
                  {onMoveProject && (
                    <>
                      <button
                        onClick={() => onMoveProject(project.id, 'prev')}
                        disabled={index === 0}
                        title="Mover para a esquerda"
                        className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-30 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onMoveProject(project.id, 'next')}
                        disabled={index === projects.length - 1}
                        title="Mover para a direita"
                        className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-30 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    title="Remover projeto"
                    className="p-1 text-[#A8A89E] hover:text-red-500 rounded-full transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Behance Embed Viewport */}
              <div className="w-full flex justify-center items-center">
                {renderEmbedContent(project)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Curator Instructions */}
        {curatorMode && (
          <div className="mt-8 p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-xs text-[#57574F] dark:text-[#A8A89E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
              <span>
                <strong>Como incorporar do Behance:</strong> No seu projeto no Behance, clique em <em>Compartilhar / Embed</em>, copie o código <code>&lt;iframe&gt;</code> e clique em <strong>Incorporar Projeto</strong>.
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6] underline underline-offset-4 shrink-0"
            >
              Adicionar agora
            </button>
          </div>
        )}
      </div>

      {/* Modal: Incorporar Projeto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl text-[#181816] dark:text-[#F5F5F0] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Layers className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Incorporar Projeto na Vitrine</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título do Projeto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Identidade Visual Institucional"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
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
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Código de Embed do Behance ou URL do Projeto *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Cole o código <iframe ...> do Behance ou link direto`}
                  value={embedCodeOrUrl}
                  onChange={(e) => setEmbedCodeOrUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Breve Descrição
                </label>
                <textarea
                  rows={2}
                  placeholder="Resumo do desafio e resultado alcançado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Posição na Vitrine
                </label>
                <select
                  value={insertPosition}
                  onChange={(e) => setInsertPosition(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="start">No início (Primeiro da vitrine)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={`after:${p.id}`}>
                      Depois de: {p.title}
                    </option>
                  ))}
                  <option value="end">No final (Último da vitrine)</option>
                </select>
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
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-2xs"
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
