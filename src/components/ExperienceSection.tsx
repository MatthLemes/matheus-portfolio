import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

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
    <section id="trajetoria" className="py-14 md:py-16 border-b border-[#EAEAE2] bg-[#FCFCFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1 font-semibold flex items-center gap-1.5">
              <span>01. Linha do Tempo Profissional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#141414] tracking-tight">
              Linha do Tempo Profissional
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] mt-1 max-w-xl">
              Visão cronológica horizontal e compacta. Detalhamento completo de entregas e métricas no LinkedIn.
            </p>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#0A66C2] bg-white border border-[#D5D5CA] hover:border-[#0A66C2] hover:bg-[#F4F8FD] transition-all rounded shadow-xs"
          >
            <span>Ver no LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-[19px] left-8 right-8 h-0.5 bg-[#E2E2D8] z-0" />

          {/* Cards & Nodes: Horizontal scroll on mobile, 4-column grid on desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-thin">
            {chronological.map((exp, index) => {
              const isHovered = hoveredIndex === index;
              const isCurrent = exp.period.includes('Atual');
              const tag = getExperienceTag(exp.id);

              return (
                <a
                  key={exp.id}
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative flex-none w-[270px] sm:w-[290px] md:w-auto snap-start block transition-all duration-200"
                >
                  {/* Step header with Node on horizontal axis */}
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                        isCurrent
                          ? 'border-[#0A66C2] bg-[#0A66C2] text-white shadow-xs'
                          : isHovered
                          ? 'border-[#0A66C2] bg-white text-[#0A66C2]'
                          : 'border-[#9E9E94] bg-white text-[#8A8A80]'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-transform ${
                          isCurrent
                            ? 'bg-white animate-pulse'
                            : isHovered
                            ? 'bg-[#0A66C2] scale-125'
                            : 'bg-[#9E9E94]'
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#66665E] group-hover:text-[#0A66C2] transition-colors">
                      <span>{exp.period}</span>
                      {isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold lowercase">
                          atual
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Compact Card with hover lift */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 h-[195px] flex flex-col justify-between ${
                      isHovered
                        ? 'bg-white border-[#0A66C2] shadow-md -translate-y-1'
                        : 'bg-white/90 border-[#E5E5DC] hover:border-[#BDBDB0] shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="text-sm sm:text-base font-sans font-semibold text-[#1A1A1A] group-hover:text-[#0A66C2] transition-colors line-clamp-2 leading-snug">
                          {exp.role}
                        </h3>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#A0A096] group-hover:text-[#0A66C2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <div className="text-xs font-medium text-[#4A4A42] mb-1.5">
                        {exp.company}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#787870] font-mono">
                        <MapPin className="w-3 h-3 text-[#A0A096] shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>

                    {/* Compact Tag footer */}
                    <div className="pt-2 border-t border-[#F2F2EC] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#5A5A52] bg-[#FAF9F6] p-1.5 rounded">
                      <Sparkles className="w-3 h-3 text-[#0A66C2] shrink-0" />
                      <span className="truncate">{tag}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile scroll hint */}
          <div className="md:hidden flex items-center justify-center gap-1 mt-2 text-[11px] font-mono text-[#8C8C82]">
            <span>Arraste para visualizar a linha do tempo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
