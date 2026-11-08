import React from 'react';
import { motion } from 'framer-motion';
import { AchievementItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section id="conquistas" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold">
            04. Destaques & Conquistas
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
            Projetos & Conquistas
          </h2>
          <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
            Participação e reconhecimento em programas de liderança executiva, desafios de inteligência artificial aplicada e iniciativas institucionais de alto impacto.
          </p>
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
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="magnetic-card w-[84vw] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-start bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-120 shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E] mb-2.5">
                  <span className="font-medium text-[#181816] dark:text-white">{item.organization}</span>
                  <span className="font-semibold text-[#2563EB] dark:text-[#3B82F6] tabular-nums">{item.year}</span>
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
    </section>
  );
};
