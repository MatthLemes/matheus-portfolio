import React from 'react';
import { GraduationCap, Globe2 } from 'lucide-react';
import { EducationItem, LanguageItem } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
  languages: LanguageItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  languages,
}) => {
  return (
    <section id="formacao" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 font-semibold">
              02. Base Acadêmica & Idiomas
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
              Formação Acadêmica
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] mt-2 max-w-2xl">
              Trajetória formativa com graduação em design gráfico, especializações em UX/UI, design centrado no usuário e planejamento acadêmico na Fundação Getúlio Vargas.
            </p>
          </div>

          {/* Languages pill bar */}
          <div className="flex flex-wrap items-center gap-3">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-white border border-[#D5D5CA] rounded-md text-xs font-mono flex items-center gap-1.5 shadow-xs"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span className="font-semibold text-[#1A1A1A]">{lang.language}:</span>
                <span className="text-[#0A66C2]">{lang.proficiency}</span>
                {lang.score && <span className="text-[#787870] text-[11px]">({lang.score})</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Education Grid (5 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {education.map((item) => {
            const isFGV = item.institution.includes('FGV');

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-xl p-5 flex flex-col justify-between hover:border-[#1A1A1A] transition-all shadow-xs ${
                  isFGV ? 'border-[#0A66C2]/40 ring-1 ring-[#0A66C2]/10' : 'border-[#E2E2D8]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8C8C80] mb-2.5">
                    <span className={isFGV ? 'text-[#0A66C2] font-semibold' : ''}>{item.period}</span>
                    {item.type && (
                      <span className="text-[11px] text-[#66665E] bg-[#F5F5EE] px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-sans text-[#1A1A1A] font-semibold leading-snug mb-1.5">
                    {item.degree}
                  </h3>

                  <div className="text-xs font-medium text-[#55554D] flex items-center gap-1.5">
                    <GraduationCap className={`w-3.5 h-3.5 ${isFGV ? 'text-[#0A66C2]' : 'text-[#7D7D75]'}`} />
                    <span>{item.institution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
