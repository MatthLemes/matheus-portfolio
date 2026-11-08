import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Master password for Matheus Lemes
const AUTHOR_PASSWORD = 'matheus2025';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === AUTHOR_PASSWORD) {
      setError(false);
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-sm bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] text-[#181816] dark:text-[#F5F5F0] rounded-xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#73736C] hover:text-[#181816] dark:hover:text-white transition-colors"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#F4F3EE] dark:bg-[#242422] border border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
          </div>
          <h3 className="text-lg font-bold text-[#141414] dark:text-white">Área do Autor</h3>
          <p className="text-xs text-[#57574F] dark:text-[#A8A89E] mt-1 max-w-xs leading-relaxed">
            Acesso exclusivo para Matheus Lemes gerenciar projetos, playlists e conteúdos do portfólio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] mb-1.5 font-semibold">
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Digite sua senha de autor..."
                autoFocus
                className={`w-full px-3.5 py-2.5 pr-10 text-sm bg-[#FAF9F5] dark:bg-[#121211] border rounded-lg focus:outline-none transition-colors ${
                  error
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#E8E6DF] dark:border-[#2E2E2A] focus:border-[#2563EB] dark:focus:border-[#3B82F6]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73736C] hover:text-[#181816] dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-mono">
                Senha incorreta. Acesso restrito ao proprietário.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-120 hover:-translate-y-0.5 shadow-xs"
          >
            <span>Desbloquear Modo ADM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A] flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#73736C] dark:text-[#A8A89E]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Proteção ativa contra edições de visitantes</span>
        </div>
      </div>
    </div>
  );
};
