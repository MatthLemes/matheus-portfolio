import React, { useState } from 'react';
import { Sliders, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  name: string;
  onOpenEditor: () => void;
  primaryActionUrl: string;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ name, onOpenEditor, primaryActionUrl, isAdmin = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFCFB]/95 backdrop-blur-md border-b border-[#E8E8E2] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile menu button (on mobile left) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 p-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A4A42] hover:text-[#1A1A1A]"
            aria-label="Menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Menu</span>
          </button>
        </div>

        {/* Desktop Navigation Links — 6 Chunked Items (Miller's Law) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-[#66665E] whitespace-nowrap">
          <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Início
          </a>
          <a href="#trajetoria" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Trajetória
          </a>
          <a href="#formacao" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap" title="Formação, Certificações & Conquistas">
            Credenciais
          </a>
          <a href="#projetos" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap" title="Projetos no Behance & Destaques do LinkedIn">
            Vitrine
          </a>
          <a href="#repertorio-criativo" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap" title="Playlists do Spotify & Poesias">
            Espaço Criativo
          </a>
          <a href="#competencias" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Competências
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin && (
            <button
              onClick={onOpenEditor}
              title="Personalizar links e informações"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#4A4A42] bg-[#F1F1EB] hover:bg-[#E6E6DE] transition-colors rounded border border-[#E0E0D6] whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Editar Perfil</span>
            </button>
          )}

          <a
            href={primaryActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] transition-colors rounded whitespace-nowrap"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile nav drawer — Consolidated 6 Items */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E8E2] bg-[#FCFCFB] px-6 py-4 space-y-2.5 text-sm font-medium text-[#4A4A42]">
          <a 
            href="#inicio" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Início
          </a>
          <a 
            href="#trajetoria" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Trajetória <span className="text-xs text-[#82827A] font-normal block sm:inline sm:ml-1">— Linha do tempo profissional</span>
          </a>
          <a 
            href="#formacao" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Credenciais <span className="text-xs text-[#82827A] font-normal block sm:inline sm:ml-1">— Formação, certificações e conquistas</span>
          </a>
          <a 
            href="#projetos" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Vitrine <span className="text-xs text-[#82827A] font-normal block sm:inline sm:ml-1">— Projetos Behance e destaques</span>
          </a>
          <a 
            href="#repertorio-criativo" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Espaço Criativo <span className="text-xs text-[#82827A] font-normal block sm:inline sm:ml-1">— Playlists e poesias</span>
          </a>
          <a 
            href="#competencias" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Competências <span className="text-xs text-[#82827A] font-normal block sm:inline sm:ml-1">— Hard skills e ferramentas</span>
          </a>
          <div className="pt-2 border-t border-[#E8E8E2]">
            <a 
              href="#contato" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-[#0A66C2] font-semibold hover:text-[#084e96]"
            >
              Vamos Conversar →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
