import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { staggerContainer, cardStaggerItem } from '../utils/animationVariants';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  linkedinUrl: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  linkedinUrl,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chronological order from 2023 to Current shows career evolution along the timeline
  const chronological = [...experiences].reverse();

  const getExperienceTag = (id: string) => {
    if (id === 'exp-1') return 'Automação RD Station · +40% CTR';
    if (id === 'exp-2') return 'Redes Sociais & Conteúdo';
    if (id === 'exp-3') return 'Identidade Visual & Branding';
    if (id === 'exp-4') return 'Atendimento LATAM';
    return 'Marketing & Comunicação';
  };

  return (
    <section id="trajetoria" className="py-14 md:py-16 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1 font-semibold flex items-center gap-1.5">
              <span>01. Linha do Tempo Profissional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Linha do Tempo Profissional
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-1 max-w-xl">
              Visão cronológica horizontal e compacta. Detalhamento completo de entregas e métricas no LinkedIn.
            </p>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:bg-[#F4F3EE] dark:hover:bg-[#242422] transition-all rounded-lg shadow-2xs"
          >
            <span>Ver no LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-[19px] left-8 right-8 h-[1px] bg-[#E8E6DF] dark:bg-[#2E2E2A] z-0" />

          {/* Cards & Nodes: Horizontal scroll on mobile, 4-column grid on desktop with Staggered Fade-In */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-thin"
          >
            {chronological.map((exp, index) => {
              const isHovered = hoveredIndex === index;
              const isCurrent = exp.period.includes('Atual');
              const tag = getExperienceTag(exp.id);

              return (
                <motion.div
                  key={exp.id}
                  variants={cardStaggerItem}
                  className="flex-none w-[270px] sm:w-[290px] md:w-auto snap-start"
                >
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative block transition-all duration-120"
                  >
                    {/* Step header with Node on horizontal axis */}
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-120 border-2 ${
                          isCurrent
                            ? 'border-[#2563EB] dark:border-[#3B82F6] bg-[#2563EB] dark:bg-[#3B82F6] text-white shadow-xs'
                            : isHovered
                            ? 'border-[#2563EB] dark:border-[#3B82F6] bg-white dark:bg-[#1C1C1A] text-[#2563EB] dark:text-[#3B82F6]'
                            : 'border-[#A8A89E] dark:border-[#57574F] bg-white dark:bg-[#1C1C1A] text-[#73736C]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-transform ${
                            isCurrent
                              ? 'bg-white'
                              : isHovered
                              ? 'bg-[#2563EB] dark:bg-[#3B82F6] scale-125'
                              : 'bg-[#A8A89E] dark:bg-[#57574F]'
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#57574F] dark:text-[#A8A89E] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                        <span>{exp.period}</span>
                        {isCurrent && (
                          <span className="text-[10px] text-[#2563EB] dark:text-[#3B82F6] font-bold lowercase">
                            · atual
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Card with magnetic hover lift */}
                    <div
                      className={`magnetic-card p-4 rounded-xl border transition-all duration-120 h-[195px] flex flex-col justify-between ${
                        isHovered
                          ? 'bg-white dark:bg-[#1C1C1A] border-[#2563EB] dark:border-[#3B82F6] shadow-md -translate-y-1'
                          : 'bg-white dark:bg-[#1C1C1A] border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h3 className="text-sm sm:text-base font-sans font-semibold text-[#181816] dark:text-[#F5F5F0] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors line-clamp-2 leading-snug">
                            {exp.role}
                          </h3>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#A8A89E] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>

                        <div className="text-xs font-medium text-[#4A4A42] dark:text-[#D4D4CA] mb-1.5">
                          {exp.company}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-[#73736C] dark:text-[#A8A89E] font-mono">
                          <MapPin className="w-3 h-3 text-[#A8A89E] shrink-0" />
                          <span className="truncate">{exp.location}</span>
                        </div>
                      </div>

                      {/* Compact Tag footer */}
                      <div className="pt-2 border-t border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#57574F] dark:text-[#A8A89E] bg-[#F4F3EE] dark:bg-[#242422] p-1.5 rounded-lg">
                        <Sparkles className="w-3 h-3 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
                        <span className="truncate">{tag}</span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile scroll hint */}
          <div className="md:hidden flex items-center justify-center gap-1 mt-2 text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E]">
            <span>Arraste para visualizar a linha do tempo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
