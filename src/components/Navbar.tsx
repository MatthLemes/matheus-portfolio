import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu, X, Sliders } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface NavbarProps {
  name: string;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenEditor?: () => void;
  primaryActionUrl: string;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  theme,
  onToggleTheme,
  onOpenEditor,
  primaryActionUrl,
  isAdmin = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { id: 'inicio', label: 'Início', href: '#inicio' },
    { id: 'trajetoria', label: 'Trajetória', href: '#trajetoria' },
    { id: 'credenciais', label: 'Credenciais', href: '#formacao' },
    { id: 'vitrine', label: 'Vitrine', href: '#projetos' },
    { id: 'competencias', label: 'Competências', href: '#competencias' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 dark:bg-[#121211]/90 backdrop-blur-md border-b border-[#E8E6DF] dark:border-[#2E2E2A] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zona 1: Wordmark em 1 linha */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#inicio"
            className="group flex items-baseline gap-2 text-sm sm:text-base font-bold font-sans tracking-tight text-[#141414] dark:text-[#F5F5F0] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors"
          >
            <span>{name}</span>
            <span className="hidden lg:inline text-[11px] font-mono font-normal text-[#73736C] dark:text-[#A8A89E] tracking-normal">
              · Automação & Design
            </span>
          </a>
        </div>

        {/* Zona 2: 5 Links de navegação estritos com sublinhado e pill deslizante */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E]"
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            const isHovered = hoveredNav === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveNav(link.id)}
                onMouseEnter={() => setHoveredNav(link.id)}
                className={`relative px-3.5 py-2 transition-colors font-medium rounded-lg ${
                  isActive
                    ? 'text-[#2563EB] dark:text-[#3B82F6] font-semibold'
                    : 'hover:text-[#181816] dark:hover:text-white'
                }`}
              >
                {/* Gliding hover pill background */}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-glow"
                    className="absolute inset-0 bg-[#2563EB]/8 dark:bg-[#3B82F6]/15 rounded-lg -z-1"
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}

                <span className="relative z-10">{link.label}</span>

                {/* Active indicator underline */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#2563EB] dark:bg-[#3B82F6] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zona 3: Ações (Alternador de Tema Sol/Lua + LinkedIn CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Sun / Moon */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            className="p-2 rounded-lg text-[#57574F] dark:text-[#D4D4CA] hover:text-[#141414] dark:hover:text-white bg-[#F4F3EE] dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-all duration-120 hover:-translate-y-0.5"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#2563EB]" />
            )}
          </button>

          {isAdmin && onOpenEditor && (
            <button
              onClick={onOpenEditor}
              title="Personalizar links e informações"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-[#57574F] dark:text-[#D4D4CA] bg-[#F4F3EE] dark:bg-[#1C1C1A] hover:bg-[#E8E6DF] dark:hover:bg-[#2E2E2A] transition-colors rounded border border-[#E8E6DF] dark:border-[#2E2E2A]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Editar</span>
            </button>
          )}

          {/* LinkedIn CTA Button */}
          <a
            href={primaryActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-all duration-120 rounded-lg shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#57574F] dark:text-[#D4D4CA] bg-[#F4F3EE] dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A]"
            aria-label="Abrir menu móvel"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] px-5 py-4 space-y-2 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                setActiveNav(link.id);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-[#57574F] dark:text-[#D4D4CA] hover:text-[#2563EB] dark:hover:text-[#3B82F6] border-b border-[#E8E6DF]/50 dark:border-[#2E2E2A]/50 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-mono font-semibold text-[#2563EB] dark:text-[#3B82F6]"
            >
              Vamos Conversar →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
