import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface HeroProps {
  name: string;
  headline: string;
  about: string;
  location: string;
  email: string;
  links: SocialLinks;
  portraitImage: string;
  onOpenEditor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  headline,
  about,
  location,
  email,
  links,
  portraitImage,
  onOpenEditor,
}) => {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="inicio" className="pt-8 pb-14 md:pt-12 md:pb-20 border-b border-[#EAEAE2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top quiet metadata line */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#73736C] mb-6">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#1A1A1A]" />
            <span>{location}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Inglês B2 Upper-Intermediate</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-semibold">Disponível para Oportunidades</span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Bio & Action Channels */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141414] leading-[1.08] mb-3 font-sans">
                {name}
              </h1>
              <p className="text-lg sm:text-xl text-[#0A66C2] font-medium leading-relaxed font-sans">
                {headline}
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E5E5DC] rounded text-sm sm:text-base text-[#4A4A42] leading-relaxed shadow-xs">
              <div className="text-xs font-mono uppercase tracking-wider text-[#8A8A80] mb-2 font-semibold">
                Sobre Mim
              </div>
              <p>{about}</p>
            </div>

            {/* Serial Position Effect (Primacy): Quick Key Impact Metrics for 5-Second Scan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 bg-white border border-[#E5E5DC] rounded-lg shadow-2xs hover:border-[#0A66C2] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-sans text-[#0A66C2] tracking-tight">
                  +40%
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] font-semibold mt-0.5">
                  CTR no RD Station
                </div>
              </div>

              <div className="p-3 bg-white border border-[#E5E5DC] rounded-lg shadow-2xs hover:border-[#0A66C2] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-sans text-[#141414] tracking-tight">
                  FGV
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] font-semibold mt-0.5">
                  Gestão Comercial
                </div>
              </div>

              <div className="p-3 bg-white border border-[#E5E5DC] rounded-lg shadow-2xs hover:border-[#0A66C2] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-sans text-[#141414] tracking-tight">
                  4 Globais
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] font-semibold mt-0.5 truncate" title="Harvard · Google · IBM · Vanderbilt">
                  Harvard & Google
                </div>
              </div>

              <div className="p-3 bg-white border border-[#E5E5DC] rounded-lg shadow-2xs hover:border-[#0A66C2] transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-sans text-[#141414] tracking-tight">
                  700+
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#73736C] font-semibold mt-0.5">
                  Especialistas
                </div>
              </div>
            </div>

            {/* Direct Channel Highlight Cards — Fitts's Law Optimized Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* LinkedIn */}
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white border border-[#E5E5DC] hover:border-[#0A66C2] rounded-lg transition-all shadow-xs hover:shadow-md flex flex-col justify-between min-h-[115px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0A66C2] font-semibold mb-1">
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    Perfil Profissional
                  </div>
                  <div className="text-xs text-[#73736C] mt-1">
                    Conexões, posts e trajetória.
                  </div>
                </div>
              </a>

              {/* Behance */}
              <a
                href={links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white border border-[#E5E5DC] hover:border-[#0057FF] rounded-lg transition-all shadow-xs hover:shadow-md flex flex-col justify-between min-h-[115px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0057FF] font-semibold mb-1">
                    <span>BEHANCE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    Galeria no Behance
                  </div>
                  <div className="text-xs text-[#73736C] mt-1">
                    Projetos visuais e design.
                  </div>
                </div>
              </a>

              {/* Contato Rápido com Copiar E-mail (Fitts's Law Target) */}
              <div
                onClick={() => handleCopy(email, 'email')}
                className="group p-4 bg-white border border-[#E5E5DC] hover:border-[#0A66C2] rounded-lg shadow-xs hover:shadow-md flex flex-col justify-between min-h-[115px] cursor-pointer transition-all"
                title="Clique em qualquer lugar deste card para copiar o e-mail"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#1A1A1A] font-semibold mb-1">
                    <span>CONTATO</span>
                    <Mail className="w-3.5 h-3.5 text-[#73736C] group-hover:text-[#0A66C2] transition-colors" />
                  </div>
                  <div className="text-xs font-medium text-[#1A1A1A] truncate">
                    {email}
                  </div>
                </div>

                <div className="mt-2 text-xs font-mono text-[#0A66C2] font-medium flex items-center gap-1.5 pt-1">
                  {copiedText === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-700 font-semibold">E-mail copiado!</span>
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

          {/* Right Column: Matheus's Real Portrait Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded border border-[#DFDFD6] bg-stone-100 shadow-md">
              <img
                src={portraitImage}
                alt="Matheus Ribeiro Lemes — Analista de Marketing"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#FCFCFB] border-t border-[#E8E8E0] flex items-center justify-between text-xs text-[#6E6E65]">
                <span className="font-medium text-[#1A1A1A]">{name}</span>
                <span className="text-xs font-mono text-[#8C8C80]">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
