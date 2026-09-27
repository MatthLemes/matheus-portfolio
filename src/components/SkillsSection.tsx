import React from 'react';
import { Cpu, Target, Palette, Users } from 'lucide-react';
import { SkillCategory } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marketing Digital':
        return <Target className="w-4 h-4 text-[#0A66C2]" />;
      case 'Design & UX/UI':
        return <Palette className="w-4 h-4 text-[#0A66C2]" />;
      case 'IA & Dados':
        return <Cpu className="w-4 h-4 text-[#0A66C2]" />;
      default:
        return <Users className="w-4 h-4 text-[#0A66C2]" />;
    }
  };

  return (
    <section id="competencias" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 font-semibold">
              08. Repertório Técnico & Estratégico
            </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
            Competências & Ferramentas
          </h2>
          <p className="text-sm sm:text-base text-[#57574F] mt-2 max-w-2xl">
            Conjunto de habilidades práticas aplicadas no cotidiano de marketing analítico, design visual de interfaces e automação orientada a IA.
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category) => (
            <div
              key={category.category}
              className="bg-white border border-[#E2E2D8] rounded p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F0F0EA]">
                  {getCategoryIcon(category.category)}
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-[#4A4A42]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/30"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
