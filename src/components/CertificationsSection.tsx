import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';
import { staggerContainer, staggerItem } from '../utils/animationVariants';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  return (
    <section id="certificacoes" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold">
            03. Aprendizado Contínuo & Credenciais
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
            Certificações Relevantes
          </h2>
          <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl">
            Certificações profissionais de padrão internacional em retórica, prompt engineering, ciência de dados, CRM e design thinking por Harvard, Google, Vanderbilt e IBM.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        {certifications.length > 1 && (
          <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <span>←</span>
              <span>Deslize para ver credenciais</span>
              <span>→</span>
            </span>
            <span className="text-[10px] text-[#A8A89E]">({certifications.length})</span>
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
                className="magnetic-card p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl transition-all duration-120 shadow-2xs hover:shadow-md flex flex-col justify-between h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E] mb-2">
                    <span className="font-semibold text-[#2563EB] dark:text-[#3B82F6]">{cert.issuer}</span>
                    <span className="flex items-center gap-1">
                      <span className="tabular-nums">{cert.year}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A89E] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#181816] dark:text-[#F5F5F0] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {cert.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#E8E6DF] dark:border-[#2E2E2A] text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="group-hover:text-[#181816] dark:group-hover:text-white transition-colors">Credencial Verificada</span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
