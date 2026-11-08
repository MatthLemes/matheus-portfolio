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
        className="relative w-full max-w-2xl bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] text-[#181816] dark:text-[#F5F5F0] rounded-xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#181816]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
            <h3 className="text-base font-semibold font-sans">
              Personalizar Informações do Perfil
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73736C] hover:text-[#181816] dark:hover:text-white transition-colors rounded-lg hover:bg-[#F4F3EE] dark:hover:bg-[#242422]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Links Section */}
            <div className="space-y-4">
              <div className="pb-1 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                  Links Profissionais
                </h4>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
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
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
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
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Profile Basics */}
            <div className="space-y-4 pt-2 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
              <div className="pb-1 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E]">
                  Dados de Identificação & Contato
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
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
                    className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Título / Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Sobre Mim
                </label>
                <textarea
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB] resize-y"
                />
              </div>
            </div>

            {/* Persistence Notice */}
            <div className="p-3.5 bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border border-[#2563EB]/30 dark:border-[#3B82F6]/30 rounded-lg text-xs text-[#2563EB] dark:text-[#3B82F6] flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">
                  Sincronização em Tempo Real:
                </p>
                <p className="leading-relaxed">
                  As alterações são gravadas diretamente no arquivo do projeto e salvas no navegador.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#181816]">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F4F3EE] dark:bg-[#242422] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg transition-colors"
                title="Copiar dados formatados para enviar no chat"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copiado!</span>
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
                className="px-4 py-2 text-xs font-medium text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-colors rounded-lg shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Salvo!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Alterações</span>
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
