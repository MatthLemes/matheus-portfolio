import React from 'react';

interface EditorialMarqueeProps {
  id?: string;
}

export const EditorialMarquee: React.FC<EditorialMarqueeProps> = ({ id }) => {
  const marqueeItems = [
    'ENGENHARIA DE PROMPT',
    'DESIGN SYSTEM & UI/UX',
    'AUTOMAÇÃO DE FLUXOS RD STATION',
    'ARQUITETURA DE SOLUÇÕES IA',
    'CRM & GESTÃO COMERCIAL',
    'CONTEÚDO ESTRATÉGICO',
    'INTERFACES EDITORIAIS',
    'HARVARD & GOOGLE CERTIFIED',
  ];

  return (
    <div
      id={id}
      className="w-full overflow-hidden border-y border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#F4F3EE] dark:bg-[#1C1C1A] py-3 select-none transition-colors"
      aria-hidden="true"
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* First repetition */}
        <div className="flex items-center gap-6 sm:gap-8 px-4">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`marquee-1-${idx}`}>
              <span className="text-xs sm:text-[13px] font-mono tracking-wider font-semibold text-[#57574F] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors">
                {item}
              </span>
              <span className="text-[10px] text-[#2563EB] dark:text-[#3B82F6]">◆</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second repetition for infinite seamless loop */}
        <div className="flex items-center gap-6 sm:gap-8 px-4">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`marquee-2-${idx}`}>
              <span className="text-xs sm:text-[13px] font-mono tracking-wider font-semibold text-[#57574F] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors">
                {item}
              </span>
              <span className="text-[10px] text-[#2563EB] dark:text-[#3B82F6]">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
