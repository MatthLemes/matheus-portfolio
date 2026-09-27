import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { AchievementItem } from '../types/portfolio';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section id="conquistas" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 font-semibold">
            04. Destaques & Conquistas
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
            Projetos & Conquistas
          </h2>
          <p className="text-xs sm:text-sm text-[#57574F] mt-2 max-w-2xl">
            Participação e reconhecimento em programas de liderança executiva, desafios de inteligência artificial aplicada e iniciativas institucionais de alto impacto.
          </p>
        </div>

        {/* 2-column Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E2E2D8] hover:border-[#1A1A1A] rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#82827A] mb-2.5">
                  <span className="font-medium text-[#1A1A1A]">{item.organization}</span>
                  <span className="font-semibold text-[#0A66C2]">{item.year}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <h3 className="text-base sm:text-lg font-sans font-semibold text-[#1A1A1A] leading-snug">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="text-[11px] font-mono text-[#0A66C2] bg-[#0A66C2]/10 px-2 py-0.5 rounded font-medium shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#4F4F47] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
