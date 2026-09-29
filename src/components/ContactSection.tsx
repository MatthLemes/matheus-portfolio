import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Phone, MessageSquare } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface ContactSectionProps {
  links: SocialLinks;
  name: string;
  email: string;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  links,
  name,
  email,
  isAdmin = false,
  onToggleAdmin,
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
    <section id="contato" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#7D7D75] mb-1.5 font-semibold">
                09. Contato Direto
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] tracking-tight">
                Vamos conversar?
              </h2>
              <p className="text-sm sm:text-base text-[#57574F] mt-3 leading-relaxed">
                Estou disponível para oportunidades em Marketing, CRM, Automação, Conteúdo e projetos de Design. Fique à vontade para entrar em contato.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-4 bg-white border border-[#E2E2D8] rounded space-y-2 shadow-xs">
              <div className="text-xs font-mono uppercase text-[#88887E]">
                E-mail Profissional
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-[#1A1A1A] font-medium truncate">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="shrink-0 p-1.5 text-xs text-[#4A4A42] hover:text-[#1A1A1A] bg-[#F4F4EE] rounded transition-colors flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-[#88887E] mb-2">
                Canais Profissionais
              </div>
              <div className="flex flex-col space-y-2">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white border border-[#E5E5DC] hover:border-[#0A66C2] rounded text-xs font-medium text-[#1A1A1A] transition-colors"
                >
                  <span>LinkedIn (Conectar e acompanhar posts)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0A66C2]" />
                </a>

                <a
                  href={links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white border border-[#E5E5DC] hover:border-[#0057FF] rounded text-xs font-medium text-[#1A1A1A] transition-colors"
                >
                  <span>Behance (Galeria de projetos visuais)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0057FF]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Fast message form */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2D8] rounded p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-sans font-semibold text-[#1A1A1A] mb-2">
              Enviar mensagem direta
            </h3>
            <p className="text-xs sm:text-sm text-[#66665E] mb-6">
              Envie uma mensagem sobre oportunidades, parcerias ou projetos.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-[#73736C] mb-1">
                    Seu Nome *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full px-3.5 py-2 text-sm border border-[#DCDCD2] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-[#73736C] mb-1">
                    Seu E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="seu.email@empresa.com"
                    className="w-full px-3.5 py-2 text-sm border border-[#DCDCD2] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-[#73736C] mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem ou proposta de oportunidade..."
                  className="w-full px-3.5 py-2 text-sm border border-[#DCDCD2] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A] resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-[#333333] transition-colors rounded flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar por E-mail</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="mt-16 pt-8 border-t border-[#EAEAE2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7A70] gap-4">
          <div>
            © {new Date().getFullYear()} {name} · São Paulo, SP
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Automação & CRM</span>
            <span aria-hidden="true">·</span>
            <span>Design Gráfico</span>
            <span aria-hidden="true">·</span>
            <span>IA Aplicada</span>
          </div>

          {onToggleAdmin && (
            <button
              onClick={onToggleAdmin}
              className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors border ${
                isAdmin
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-transparent text-[#9E9E94] hover:text-[#1A1A1A] border-transparent hover:border-[#D5D5CA]'
              }`}
            >
              {isAdmin ? '🔒 Sair do Modo ADM' : '⚙️ Modo ADM (Autor)'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
