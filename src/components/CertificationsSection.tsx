import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  return (
    <section id="certificacoes" className="py-16 md:py-20 border-b border-[#EAEAE2] bg-[#FCFCFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 font-semibold">
            03. Aprendizado Contínuo & Credenciais
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
            Certificações Relevantes
          </h2>
          <p className="text-xs sm:text-sm text-[#57574F] mt-2 max-w-2xl">
            Certificações profissionais de padrão internacional em retórica, prompt engineering, ciência de dados, CRM e design thinking por Harvard, Google, Vanderbilt e IBM.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        {certifications.length > 1 && (
          <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-[#7D7D75] mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <span>←</span>
              <span>Deslize para ver credenciais</span>
              <span>→</span>
            </span>
            <span className="text-[10px] text-[#A0A096]">({certifications.length})</span>
          </div>
        )}

        {/* Certifications: Mobile Swipe Carousel / Desktop Grid with Staggered Fade-in */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex md:grid overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 pb-3 md:pb-0"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="w-[78vw] sm:w-[280px] md:w-auto shrink-0 md:shrink snap-start"
            >
              <a
                href={`https://www.linkedin.com/in/matheus-lemes-designer/details/certifications/`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Ver credencial ${cert.name} no LinkedIn`}
                className="p-4 bg-white border border-[#E2E2D8] hover:border-[#0A66C2] rounded-xl transition-all shadow-xs hover:shadow-md flex flex-col justify-between h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#828279] mb-2">
                    <span className="font-semibold text-[#0A66C2]">{cert.issuer}</span>
                    <span className="flex items-center gap-1">
                      <span>{cert.year}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B0B0A4] group-hover:text-[#0A66C2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#0A66C2] transition-colors leading-snug">
                    {cert.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#F4F4EE] text-[11px] font-mono text-[#7D7D75]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="group-hover:text-[#1A1A1A] transition-colors">Credencial Verificada</span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
