import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Globe2 } from 'lucide-react';
import { EducationItem, LanguageItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface EducationSectionProps {
  education: EducationItem[];
  languages: LanguageItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  languages,
}) => {
  return (
    <section id="formacao" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold">
              02. Base Acadêmica & Idiomas
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Formação Acadêmica
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
              Trajetória formativa com graduação em design gráfico, especializações em UX/UI, design centrado no usuário e planejamento acadêmico na Fundação Getúlio Vargas.
            </p>
          </div>

          {/* Languages Editorial Bar (Zero-Pill) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="px-3 py-1.5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg text-xs font-mono flex items-center gap-2 shadow-2xs"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                <span className="font-semibold text-[#181816] dark:text-white">{lang.language}:</span>
                <span className="text-[#2563EB] dark:text-[#3B82F6]">{lang.proficiency}</span>
                {lang.score && <span className="text-[#73736C] dark:text-[#A8A89E] text-[11px]">({lang.score})</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education Grid with Staggered Fade-in */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {education.map((item) => {
            const isFGV = item.institution.includes('FGV');

            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className={`magnetic-card bg-white dark:bg-[#1C1C1A] border rounded-xl p-5 flex flex-col justify-between transition-all duration-120 shadow-2xs hover:shadow-md ${
                  isFGV
                    ? 'border-[#2563EB] dark:border-[#3B82F6] ring-1 ring-[#2563EB]/20'
                    : 'border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E] mb-2.5">
                    <span className={isFGV ? 'text-[#2563EB] dark:text-[#3B82F6] font-semibold' : ''}>{item.period}</span>
                    {item.type && (
                      <span className="text-[11px] font-mono text-[#57574F] dark:text-[#A8A89E]">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-sans text-[#181816] dark:text-[#F5F5F0] font-semibold leading-snug mb-2">
                    {item.degree}
                  </h3>

                  <div className="text-xs font-medium text-[#4A4A42] dark:text-[#D4D4CA] flex items-center gap-1.5">
                    <GraduationCap className={`w-3.5 h-3.5 ${isFGV ? 'text-[#2563EB] dark:text-[#3B82F6]' : 'text-[#73736C] dark:text-[#A8A89E]'}`} />
                    <span>{item.institution}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
