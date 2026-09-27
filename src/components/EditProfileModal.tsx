import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Check, Sliders, Copy, CheckCheck, Info } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface EditProfileModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar as informações padrão do currículo?')) {
      onReset();
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border border-[#E2E2D8] rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFEFEA] bg-[#FCFCFB]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1A1A1A]" />
            <h3 className="text-base font-semibold text-[#1A1A1A]">
              Personalizar Informações do Perfil
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6960] hover:text-[#1A1A1A] transition-colors rounded hover:bg-[#F0F0EA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Links Section */}
            <div className="space-y-4">
              <div className="pb-1 border-b border-[#EFEFEA]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0A66C2] font-semibold">
                  Links Profissionais
                </h4>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                  URL do LinkedIn
                </label>
                <input
                  type="url"
                  required
                  value={formData.links.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0A66C2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                  URL do Behance
                </label>
                <input
                  type="url"
                  required
                  value={formData.links.behance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, behance: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#0057FF]"
                />
              </div>
            </div>

            {/* Profile Basics */}
            <div className="space-y-4 pt-2 border-t border-[#EFEFEA]">
              <div className="pb-1 border-b border-[#EFEFEA]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#73736C]">
                  Dados de Identificação & Contato
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                        links: { ...formData.links, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                  Título / Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#55554D] mb-1">
                  Sobre Mim
                </label>
                <textarea
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#D8D8CE] rounded bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#1A1A1A] resize-y"
                />
              </div>
            </div>

            {/* Persistence Notice */}
            <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs text-[#166534] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-[#15803D]">
                  Como salvar de forma permanente para todos os visitantes:
                </p>
                <p className="text-[#166534] leading-relaxed">
                  As alterações feitas pela tela ficam salvas neste navegador. Para que seus links, playlists e projetos fiquem gravados permanentemente no código para qualquer pessoa acessar, clique em <strong>Copiar Dados (JSON)</strong> e envie no chat para que eu grave direto no repositório!
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#EFEFEA] bg-[#FCFCFB]">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-[#8C8C80] hover:text-[#1A1A1A] flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs font-mono font-medium text-[#0A66C2] hover:text-[#084e96] flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded transition-colors"
                title="Copiar dados formatados para enviar no chat"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copiado! Envie no chat</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Dados (JSON)</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#55554D] hover:text-[#1A1A1A] transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-[#333333] transition-colors rounded shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Salvo no Navegador!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar no Navegador</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
