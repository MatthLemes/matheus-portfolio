import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Lock, Sparkles } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface ContactSectionProps {
  links: SocialLinks;
  name: string;
  email: string;
  isAdmin?: boolean;
  onOpenLoginModal?: () => void;
  onLogoutAdmin?: () => void;
  onOpenDesignSystem?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  links,
  name,
  email,
  isAdmin = false,
  onOpenLoginModal,
  onLogoutAdmin,
  onOpenDesignSystem,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;

    const subject = encodeURIComponent(`Contato Profissional — ${senderName}`);
    const body = encodeURIComponent(
      `Olá Matheus,\n\nMeu nome é ${senderName} (${senderEmail}).\n\nMensagem:\n${message}\n\nAtenciosamente,\n${senderName}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-[#FAF9F5] dark:bg-[#121211] text-[#181816] dark:text-[#F5F5F0] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-2 font-semibold">
                09. Contato Direto
              </div>
              <div className="text-xs font-mono text-[#57574F] dark:text-[#A8A89E] mb-3 flex items-center gap-1.5">
                <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">Disponível</span>
                <span>·</span>
                <span>Oportunidades em Marketing, CRM & IA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-white tracking-tight">
                Vamos conversar?
              </h2>
              <p className="text-sm sm:text-base text-[#57574F] dark:text-[#A8A89E] mt-3 leading-relaxed">
                Estou pronto para agregar com visão analítica e criativa em Marketing, Automação, Conteúdo Estratégico e Design de Interfaces. Envie uma mensagem ou conecte-se diretamente.
              </p>
            </div>

            {/* Email Card with Fitts's Law tactile feedback */}
            <div
              onClick={copyEmail}
              className="magnetic-card p-5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl space-y-2 shadow-2xs hover:shadow-md cursor-pointer transition-all group"
              title="Clique em qualquer lugar deste cartão para copiar o e-mail"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#73736C] dark:text-[#A8A89E]">
                <span>E-MAIL PROFISSIONAL</span>
                <span className="text-[11px] text-[#2563EB] dark:text-[#3B82F6] font-medium group-hover:underline">
                  {copiedEmail ? 'Copiado!' : 'Clique para copiar'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="font-mono text-sm text-[#181816] dark:text-white font-semibold truncate">
                  {email}
                </span>
                <div
                  className={`shrink-0 px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                    copiedEmail
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#2563EB]/10 dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6] group-hover:bg-[#2563EB] group-hover:text-white'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-2 font-semibold">
                Canais Profissionais
              </div>
              <div className="flex flex-col space-y-2">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-card flex items-center justify-between p-3.5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl text-xs font-medium text-[#181816] dark:text-white transition-all shadow-2xs"
                >
                  <span>LinkedIn (Conexões e publicações)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                </a>

                <a
                  href={links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-card flex items-center justify-between p-3.5 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-xl text-xs font-medium text-[#181816] dark:text-white transition-all shadow-2xs"
                >
                  <span>Behance (Identidades visuais & projetos)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct message form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl p-6 sm:p-8 shadow-2xs">
            <h3 className="text-xl font-sans font-semibold text-[#141414] dark:text-white mb-2">
              Enviar mensagem direta
            </h3>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mb-6">
              Preencha os campos abaixo para abrir seu cliente de e-mail já formatado.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Seu Nome *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:bg-white dark:focus:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Seu E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="seu.email@empresa.com"
                    className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:bg-white dark:focus:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem ou proposta de oportunidade..."
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:bg-white dark:focus:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6] resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-all duration-120 hover:-translate-y-0.5 rounded-lg flex items-center gap-2 shadow-xs hover:shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar por E-mail</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Clean Editorial Footer with Design System Drawer Trigger */}
        <div className="mt-16 pt-8 border-t border-[#E8E6DF] dark:border-[#2E2E2A] flex flex-col md:flex-row items-center justify-between text-xs text-[#73736C] dark:text-[#A8A89E] gap-4">
          <div>
            © {new Date().getFullYear()} {name} · São Paulo, SP
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <span>Automação & CRM</span>
            <span aria-hidden="true">·</span>
            <span>Design Gráfico</span>
            <span aria-hidden="true">·</span>
            <span>IA Aplicada</span>
          </div>

          {/* Action Zone: Design System Drawer Trigger + Admin Area */}
          <div className="flex items-center gap-3">
            {onOpenDesignSystem && (
              <button
                onClick={onOpenDesignSystem}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-[#E8E6DF] dark:border-[#2E2E2A] bg-white dark:bg-[#1C1C1A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6] transition-all duration-120 hover:-translate-y-0.5 shadow-2xs"
                title="Abrir gaveta com tokens de cores, tipografia e componentes"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tokens de Design ↗</span>
              </button>
            )}

            {isAdmin ? (
              <button
                onClick={onLogoutAdmin}
                className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg transition-colors bg-[#181816] dark:bg-white text-white dark:text-[#181816] flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Sair do ADM</span>
              </button>
            ) : (
              onOpenLoginModal && (
                <button
                  onClick={onOpenLoginModal}
                  className="text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F4F3EE] dark:hover:bg-[#1C1C1A]"
                  title="Acesso exclusivo do autor (requer senha)"
                >
                  <Lock className="w-3 h-3" />
                  <span>Área do Autor</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
