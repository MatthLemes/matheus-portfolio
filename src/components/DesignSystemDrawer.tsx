import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Palette, Type, Box, Sparkles, Layers, Sliders, ExternalLink } from 'lucide-react';

interface DesignSystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  category: '60% Canvas' | '30% Superfícies & Linhas' | '10% Acento Cobalto';
  darkHex?: string;
}

export const DesignSystemDrawer: React.FC<DesignSystemDrawerProps> = ({ isOpen, onClose }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components' | 'spacing'>('colors');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const tokens: ColorToken[] = [
    // 60% Canvas
    { name: 'Canvas Alabaster', role: 'Fundo Primário (Modo Claro)', hex: '#FAF9F5', category: '60% Canvas' },
    { name: 'Canvas Obsidiana', role: 'Fundo Primário (Modo Escuro)', hex: '#121211', category: '60% Canvas' },
    
    // 30% Superfícies
    { name: 'Branco Puro', role: 'Superfícies & Cartões Claros', hex: '#FFFFFF', category: '30% Superfícies & Linhas' },
    { name: 'Areia Alabaster', role: 'Superfície Secundária Clara', hex: '#F4F3EE', category: '30% Superfícies & Linhas' },
    { name: 'Grafite Superfície', role: 'Superfícies & Cartões Escuros', hex: '#1C1C1A', category: '30% Superfícies & Linhas' },
    { name: 'Grafite Cartão', role: 'Superfície Elevada Escura', hex: '#242422', category: '30% Superfícies & Linhas' },
    { name: 'Hairline Claro', role: 'Divisores e Bordas 1px', hex: '#E8E6DF', category: '30% Superfícies & Linhas' },
    { name: 'Hairline Escuro', role: 'Divisores Escuros 1px', hex: '#2E2E2A', category: '30% Superfícies & Linhas' },

    // 10% Acento Nobre
    { name: 'Azul Cobalto Claro', role: 'Acento Primário & Ações', hex: '#2563EB', category: '10% Acento Cobalto' },
    { name: 'Azul Cobalto Escuro', role: 'Acento Primário (Modo Escuro)', hex: '#3B82F6', category: '10% Acento Cobalto' },
    { name: 'Cobalto Hover', role: 'Hover de Botões & Links', hex: '#1D4ED8', category: '10% Acento Cobalto' },
    { name: 'Cobalto Tint', role: 'Fundo Sutil Translúcido', hex: 'rgba(37, 99, 235, 0.08)', category: '10% Acento Cobalto' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF9F5] dark:bg-[#121211] text-[#181816] dark:text-[#F5F5F0] border-l border-[#E8E6DF] dark:border-[#2E2E2A] shadow-2xl h-full flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center justify-between bg-white dark:bg-[#1C1C1A]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Design System Editorial</span>
                </div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-[#141414] dark:text-white mt-1">
                  Guia de Tokens & Arquitetura
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[#73736C] hover:text-[#181816] dark:hover:text-white rounded-lg hover:bg-[#F4F3EE] dark:hover:bg-[#242422] transition-colors"
                aria-label="Fechar gaveta"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Drawer */}
            <div className="flex items-center border-b border-[#E8E6DF] dark:border-[#2E2E2A] px-5 sm:px-6 bg-[#F4F3EE]/50 dark:bg-[#181816] text-xs font-mono">
              <button
                onClick={() => setActiveTab('colors')}
                className={`py-3 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'colors'
                    ? 'border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6]'
                    : 'border-transparent text-[#73736C] hover:text-[#181816] dark:hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Cores (60-30-10)</span>
              </button>
              <button
                onClick={() => setActiveTab('typography')}
                className={`py-3 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'typography'
                    ? 'border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6]'
                    : 'border-transparent text-[#73736C] hover:text-[#181816] dark:hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Tipografia</span>
              </button>
              <button
                onClick={() => setActiveTab('components')}
                className={`py-3 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'components'
                    ? 'border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6]'
                    : 'border-transparent text-[#73736C] hover:text-[#181816] dark:hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Componentes</span>
              </button>
              <button
                onClick={() => setActiveTab('spacing')}
                className={`py-3 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'spacing'
                    ? 'border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6]'
                    : 'border-transparent text-[#73736C] hover:text-[#181816] dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Métricas</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Tab 1: Cores */}
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  {/* Proportion Explanation Bar */}
                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold">
                      Hierarquia de Cores 60 · 30 · 10
                    </div>
                    {/* Visual proportion bar */}
                    <div className="h-4 w-full rounded-md overflow-hidden flex border border-[#E8E6DF] dark:border-[#2E2E2A]">
                      <div className="w-[60%] bg-[#FAF9F5] dark:bg-[#121211] border-r border-[#E8E6DF] dark:border-[#2E2E2A]" title="60% Canvas Neutro" />
                      <div className="w-[30%] bg-[#FFFFFF] dark:bg-[#1C1C1A] border-r border-[#E8E6DF] dark:border-[#2E2E2A]" title="30% Superfícies & Cartões" />
                      <div className="w-[10%] bg-[#2563EB]" title="10% Acento Cobalto Nobre" />
                    </div>
                    <div className="grid grid-cols-3 text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] pt-1">
                      <span><strong>60%</strong> Canvas Neutro</span>
                      <span><strong>30%</strong> Superfícies</span>
                      <span className="text-[#2563EB] dark:text-[#3B82F6]"><strong>10%</strong> Cobalto</span>
                    </div>
                  </div>

                  {/* Swatches List */}
                  {(['60% Canvas', '30% Superfícies & Linhas', '10% Acento Cobalto'] as const).map((cat) => (
                    <div key={cat} className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold flex items-center justify-between">
                        <span>{cat}</span>
                        <span className="text-[10px] text-[#A8A89E]">Clique no card para copiar</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {tokens
                          .filter((t) => t.category === cat)
                          .map((token) => {
                            const isCopied = copiedToken === token.name;
                            const isRgba = token.hex.startsWith('rgba');

                            return (
                              <button
                                key={token.name}
                                onClick={() => copyToClipboard(token.hex, token.name)}
                                className="group p-3 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl text-left transition-all duration-120 flex items-center gap-3 shadow-2xs hover:shadow-xs relative"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 shrink-0 shadow-inner flex items-center justify-center"
                                  style={{ backgroundColor: token.hex }}
                                >
                                  {isCopied && <Check className="w-4 h-4 text-emerald-500 drop-shadow" />}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-semibold text-[#181816] dark:text-white truncate">
                                    {token.name}
                                  </div>
                                  <div className="text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] truncate">
                                    {isCopied ? '✓ Código copiado!' : token.hex}
                                  </div>
                                </div>

                                <div className="text-[#A8A89E] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Tipografia */}
              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-4">
                    <div className="border-b border-[#E8E6DF] dark:border-[#2E2E2A] pb-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                        Família Principal: Plus Jakarta Sans
                      </div>
                      <p className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-1">
                        Utilizada para títulos editoriais com tracking-tight e text-wrap: balance, transmitindo sofisticação e precisão contemporânea.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#8C8C80]">Display Title (text-3xl / 4xl · bold)</span>
                        <div className="text-2xl font-bold tracking-tight text-[#141414] dark:text-white">
                          Matheus Ribeiro Lemes
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#8C8C80]">Section Heading (text-xl · semibold)</span>
                        <div className="text-lg font-semibold tracking-tight text-[#141414] dark:text-white">
                          Trajetória, Credenciais & Vitrine
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#8C8C80]">Body Editorial (text-sm · leading-relaxed)</span>
                        <p className="text-sm text-[#4A4A42] dark:text-[#D4D4CA] leading-relaxed">
                          Visão holística unindo análise de dados, automação de processos comerciais e identidade visual de alto impacto.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-4">
                    <div className="border-b border-[#E8E6DF] dark:border-[#2E2E2A] pb-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                        Família de Apoio: JetBrains Mono (Tabular)
                      </div>
                      <p className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-1">
                        Dedicada a métricas, contadores numéricos, metadados cronológicos e separadores sem vibração plástica.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono">
                      <div>
                        <span className="text-[10px] text-[#8C8C80]">Métricas de Impacto (tabular-nums font-mono)</span>
                        <div className="text-xl font-bold text-[#2563EB] dark:text-[#3B82F6] tabular-nums">
                          +40% CTR · 2026 · 700+ ESPECIALISTAS
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#8C8C80]">Regra Anti-Slop (Zero-Pills com Middot)</span>
                        <div className="text-xs text-[#57574F] dark:text-[#A8A89E] flex items-center gap-2 pt-1">
                          <span>São Paulo, SP</span>
                          <span className="text-[#2563EB] dark:text-[#3B82F6]">·</span>
                          <span>Bolsista Harvard</span>
                          <span className="text-[#2563EB] dark:text-[#3B82F6]">·</span>
                          <span>Google Analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Componentes & Microinterações */}
              {activeTab === 'components' && (
                <div className="space-y-6">
                  {/* Botões do Sistema */}
                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold">
                      Botões do Sistema & Hover Magnético
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Botão Primário Cobalto */}
                      <button className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-all duration-120 hover:-translate-y-0.5 shadow-xs hover:shadow-md flex items-center gap-1.5">
                        <span>Ação Primária</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      {/* Botão Hairline */}
                      <button className="px-4 py-2 text-xs font-semibold text-[#181816] dark:text-white bg-transparent border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-lg transition-all duration-120 hover:-translate-y-0.5">
                        Botão Hairline
                      </button>

                      {/* Ghost Button */}
                      <button className="px-4 py-2 text-xs font-mono text-[#73736C] dark:text-[#A8A89E] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors">
                        Ghost Mono →
                      </button>
                    </div>

                    <p className="text-[11px] text-[#73736C] dark:text-[#A8A89E] font-mono pt-1">
                      * Microinteração magnética suave: <code>translateY(-2px)</code> e sombra difusa em 120ms.
                    </p>
                  </div>

                  {/* Anti-Slop Discipline Demonstration */}
                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold">
                      Disciplina Anti-Slop (Zero-Pills)
                    </div>

                    <div className="space-y-3">
                      {/* What to avoid */}
                      <div className="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg">
                        <div className="text-[11px] font-mono text-red-700 dark:text-red-400 font-semibold mb-1">
                          ✕ Slop Genérico (Chips Plásticos & Pulsing Dots)
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-[10px] text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Disponível
                          </span>
                          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded-full text-[10px]">
                            2026
                          </span>
                        </div>
                      </div>

                      {/* Editorial standard */}
                      <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg">
                        <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                          ✓ Padrão Editorial (Tipografia Limpa & Middot)
                        </div>
                        <div className="text-xs font-mono text-[#181816] dark:text-white flex items-center gap-2">
                          <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">Disponível</span>
                          <span className="text-[#A8A89E]">·</span>
                          <span className="tabular-nums">2026</span>
                          <span className="text-[#A8A89E]">·</span>
                          <span>São Paulo, SP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Métricas & Espaçamentos */}
              {activeTab === 'spacing' && (
                <div className="space-y-6">
                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold">
                      Matemática de Espaçamentos (Base 4px / 8px)
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between p-2 bg-[#F4F3EE] dark:bg-[#242422] rounded">
                        <span>Micro (p-1 / gap-1)</span>
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">4px</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#F4F3EE] dark:bg-[#242422] rounded">
                        <span>Compacto (p-2 / gap-2)</span>
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">8px</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#F4F3EE] dark:bg-[#242422] rounded">
                        <span>Card Regular (p-4 / gap-4)</span>
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">16px</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#F4F3EE] dark:bg-[#242422] rounded">
                        <span>Seção Espaçosa (p-6 / gap-6)</span>
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">24px</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#F4F3EE] dark:bg-[#242422] rounded">
                        <span>Ritmo Editorial (py-16 / py-20)</span>
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">64px · 80px</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold">
                      Raios de Curvatura (Hairline Precision)
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg text-center bg-[#F4F3EE] dark:bg-[#242422]">
                        <div className="font-semibold">rounded-lg</div>
                        <div className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">8px (botões & tags)</div>
                      </div>

                      <div className="p-3 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-center bg-[#F4F3EE] dark:bg-[#242422]">
                        <div className="font-semibold">rounded-xl</div>
                        <div className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">12px (cartões vitrine)</div>
                      </div>

                      <div className="p-3 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-2xl text-center bg-[#F4F3EE] dark:bg-[#242422]">
                        <div className="font-semibold">rounded-2xl</div>
                        <div className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">16px (superfícies hero)</div>
                      </div>

                      <div className="p-3 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-full text-center bg-[#F4F3EE] dark:bg-[#242422]">
                        <div className="font-semibold">rounded-full</div>
                        <div className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">Apenas botões circulares</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of Drawer */}
            <div className="p-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A] bg-white dark:bg-[#1C1C1A] flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E]">
              <span>Design System v2.0 · Tailwind v4</span>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-md bg-[#F4F3EE] dark:bg-[#242422] text-[#181816] dark:text-white hover:bg-[#E8E6DF] dark:hover:bg-[#2E2E2A] transition-colors font-semibold"
              >
                Fechar Painel
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
