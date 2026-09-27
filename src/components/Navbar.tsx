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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[#66665E] whitespace-nowrap">
          <a href="#inicio" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Início
          </a>
          <a href="#trajetoria" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Linha do Tempo
          </a>
          <a href="#formacao" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Formação
          </a>
          <a href="#certificacoes" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Certificações
          </a>
          <a href="#conquistas" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Conquistas
          </a>
          <a href="#projetos" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Vitrine
          </a>
          <a href="#linkedin-destaques" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            LinkedIn
          </a>
          <a href="#repertorio-criativo" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Música & Poesia
          </a>
          <a href="#competencias" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Competências
          </a>
          <a href="#contato" className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
            Contato
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

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E8E2] bg-[#FCFCFB] px-6 py-4 space-y-2 text-sm font-medium text-[#4A4A42]">
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
            Linha do Tempo Profissional
          </a>
          <a 
            href="#formacao" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Formação Acadêmica
          </a>
          <a 
            href="#certificacoes" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Certificações
          </a>
          <a 
            href="#conquistas" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Projetos & Conquistas
          </a>
          <a 
            href="#projetos" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Vitrine de Projetos (Behance)
          </a>
          <a 
            href="#linkedin-destaques" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Destaques do LinkedIn
          </a>
          <a 
            href="#repertorio-criativo" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Música & Poesia
          </a>
          <a 
            href="#competencias" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Competências & Ferramentas
          </a>
          <a 
            href="#contato" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1A1A1A]"
          >
            Contato
          </a>
        </div>
      )}
    </header>
  );
};
