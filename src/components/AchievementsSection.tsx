/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { AchievementItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  isAdmin?: boolean;
  onAddAchievement?: (item: Omit<AchievementItem, 'id'>) => void;
  onEditAchievement?: (item: AchievementItem) => void;
  onDeleteAchievement?: (id: string) => void;
  onMoveAchievement?: (id: string, direction: 'prev' | 'next') => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  isAdmin = false,
  onAddAchievement,
  onEditAchievement,
  onDeleteAchievement,
  onMoveAchievement,
}) => {
  // Modal states for direct in-place editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [year, setYear] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setOrganization('');
    setYear(new Date().getFullYear().toString());
    setBadge('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: AchievementItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setOrganization(item.organization);
    setYear(item.year);
    setBadge(item.badge || '');
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !organization.trim()) return;

    if (editingItem && onEditAchievement) {
      onEditAchievement({
        ...editingItem,
        title: title.trim(),
        organization: organization.trim(),
        year: year.trim() || '2025',
        badge: badge.trim() || undefined,
        description: description.trim(),
      });
    } else if (onAddAchievement) {
      onAddAchievement({
        title: title.trim(),
        organization: organization.trim(),
        year: year.trim() || '2025',
        badge: badge.trim() || undefined,
        description: description.trim(),
      });
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <section id="conquistas" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>04. Destaques & Conquistas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Projetos & Conquistas
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
              Participação e reconhecimento em programas de liderança executiva, desafios de inteligência artificial aplicada e iniciativas institucionais de alto impacto.
            </p>
          </div>

          {isAdmin && onAddAchievement && (
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors shadow-xs shrink-0"
              title="Adicionar nova conquista ou referência profissional"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Conquista / Referência</span>
            </button>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        {achievements.length > 1 && (
          <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <span>←</span>
              <span>Deslize para ver reconhecimentos</span>
              <span>→</span>
            </span>
            <span className="text-[10px] text-[#A8A89E]">({achievements.length})</span>
          </div>
        )}

        {/* 2-column Grid of Achievements with Staggered Fade-in */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex md:grid overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 md:grid-cols-2 pb-3 md:pb-0"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="relative group magnetic-card w-[84vw] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-start bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-120 shadow-2xs hover:shadow-md"
            >
              {/* Admin Floating Quick Controls */}
              {isAdmin && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/95 dark:bg-[#1C1C1A]/95 backdrop-blur-xs p-1 rounded-full border border-[#E8E6DF] dark:border-[#2E2E2A] shadow-xs">
                  {onMoveAchievement && (
                    <>
                      <button
                        onClick={() => onMoveAchievement(item.id, 'prev')}
                        disabled={index === 0}
                        title="Mover para cima/anterior"
                        className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-25 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onMoveAchievement(item.id, 'next')}
                        disabled={index === achievements.length - 1}
                        title="Mover para baixo/próximo"
                        className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] disabled:opacity-25 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  {onEditAchievement && (
                    <button
                      onClick={() => openEditModal(item)}
                      title="Editar conquista ou referência"
                      className="p-1 text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] rounded-full transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteAchievement && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Deseja remover "${item.title}"?`)) {
                          onDeleteAchievement(item.id);
                        }
                      }}
                      title="Excluir conquista"
                      className="p-1 text-[#A8A89E] hover:text-red-500 rounded-full transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E] mb-2.5 pr-20">
                  <span className="font-medium text-[#181816] dark:text-white truncate">{item.organization}</span>
                  <span className="font-semibold text-[#2563EB] dark:text-[#3B82F6] tabular-nums shrink-0 ml-2">{item.year}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 mb-2.5">
                  <h3 className="text-base sm:text-lg font-sans font-semibold text-[#181816] dark:text-[#F5F5F0] leading-snug">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="text-[11px] font-mono text-[#2563EB] dark:text-[#3B82F6] font-semibold shrink-0">
                      · {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal: Adicionar ou Editar Conquista / Referência */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xl p-6 my-8 text-[#181816] dark:text-[#F5F5F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Trophy className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>{editingItem ? 'Editar Conquista / Referência' : 'Adicionar Nova Conquista / Referência'}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[#73736C] hover:text-[#181816] dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título da Conquista ou Referência *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Programa de Liderança Executiva, Referência Profissional..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Organização / Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fundação Estudar, Fellini Group..."
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Ano / Período
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2025 ou 2024 - 2025"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Destaque / Selo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Seleção Nacional 0.3%, Reconhecimento por Excelência..."
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Descrição / Contexto da Conquista
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva brevemente o impacto, resultados ou recomendação..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
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
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Salvar Conquista</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
