import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Copy, Check } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface HeroProps {
  name: string;
  headline: string;
  about: string;
  location: string;
  email: string;
  links: SocialLinks;
  portraitImage: string;
  onOpenEditor?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  headline,
  about,
  location,
  email,
  links,
  portraitImage,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="inicio" className="pt-8 pb-14 md:pt-14 md:pb-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top quiet metadata line with Zero-Pill Discipline */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#57574F] dark:text-[#A8A89E] mb-6">
          <span className="flex items-center gap-1.5 text-[#181816] dark:text-[#F5F5F0] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
            <span>{location}</span>
          </span>
          <span className="text-[#A8A89E]" aria-hidden="true">·</span>
          <span>Inglês B2 Upper-Intermediate</span>
          <span className="text-[#A8A89E]" aria-hidden="true">·</span>
          <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">
            Disponível para Oportunidades
          </span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Bio & Action Channels */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141414] dark:text-[#F5F5F0] leading-[1.08] mb-3 font-sans">
                {name}
              </h1>
              <p className="text-lg sm:text-xl text-[#2563EB] dark:text-[#3B82F6] font-medium leading-relaxed font-sans">
                {headline}
              </p>
            </div>

            {/* Editorial Bio Card */}
            <div className="p-5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-sm sm:text-base text-[#4A4A42] dark:text-[#D4D4CA] leading-relaxed shadow-2xs">
              <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] mb-2 font-semibold">
                Perfil Profissional
              </div>
              <p>{about}</p>
            </div>

            {/* Key Impact Metrics with JetBrains Mono Tabular Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xs hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#2563EB] dark:text-[#3B82F6] tracking-tight">
                  +40%
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold mt-0.5">
                  CTR no RD Station
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xs hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#181816] dark:text-[#F5F5F0] tracking-tight">
                  FGV
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold mt-0.5">
                  Gestão Comercial
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xs hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#181816] dark:text-[#F5F5F0] tracking-tight">
                  4 Globais
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold mt-0.5 truncate" title="Harvard · Google · IBM · Vanderbilt">
                  Harvard & Google
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl shadow-2xs hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#181816] dark:text-[#F5F5F0] tracking-tight">
                  700+
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold mt-0.5">
                  Especialistas
                </div>
              </div>
            </div>

            {/* Direct Channel Highlight Cards with Magnetic Hover */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* LinkedIn */}
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-card group p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl transition-all shadow-2xs hover:shadow-md flex flex-col justify-between min-h-[115px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#2563EB] dark:text-[#3B82F6] font-semibold mb-1">
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-[#181816] dark:text-white">
                    Perfil Profissional
                  </div>
                  <div className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-1">
                    Conexões, posts e trajetória.
                  </div>
                </div>
              </a>

              {/* Behance */}
              <a
                href={links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-card group p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl transition-all shadow-2xs hover:shadow-md flex flex-col justify-between min-h-[115px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#2563EB] dark:text-[#3B82F6] font-semibold mb-1">
                    <span>BEHANCE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-[#181816] dark:text-white">
                    Galeria Visual
                  </div>
                  <div className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-1">
                    Identidade de marcas & design.
                  </div>
                </div>
              </a>

              {/* Contato Rápido com Feedback Tátil Fitts's Law */}
              <div
                onClick={handleCopyEmail}
                className="magnetic-card group p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl shadow-2xs hover:shadow-md flex flex-col justify-between min-h-[115px] cursor-pointer transition-all"
                title="Clique em qualquer lugar deste card para copiar o e-mail"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#181816] dark:text-[#F5F5F0] font-semibold mb-1">
                    <span>CONTATO</span>
                    <Mail className="w-3.5 h-3.5 text-[#73736C] dark:text-[#A8A89E] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors" />
                  </div>
                  <div className="text-xs font-medium text-[#181816] dark:text-white truncate">
                    {email}
                  </div>
                </div>

                <div className="mt-2 text-xs font-mono text-[#2563EB] dark:text-[#3B82F6] font-medium flex items-center gap-1.5 pt-1">
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">E-mail copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" />
                      <span className="group-hover:underline">Clique para copiar</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Photo with Hairline Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-[#E8E6DF] dark:border-[#2E2E2A] bg-white dark:bg-[#1C1C1A] shadow-md">
              <img
                src={portraitImage}
                alt="Matheus Ribeiro Lemes — Analista de Marketing"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#F4F3EE] dark:bg-[#1C1C1A] border-t border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center justify-between text-xs text-[#57574F] dark:text-[#A8A89E]">
                <span className="font-semibold text-[#181816] dark:text-white">{name}</span>
                <span className="text-xs font-mono text-[#73736C] dark:text-[#A8A89E]">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
