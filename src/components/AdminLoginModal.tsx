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
        className="relative w-full max-w-sm bg-white border border-[#E2E2D8] rounded-xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#8A8A80] hover:text-[#1A1A1A] transition-colors"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#F4F4EE] border border-[#E2E2D8] flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          <h3 className="text-lg font-bold text-[#141414]">Área do Autor</h3>
          <p className="text-xs text-[#6B6B62] mt-1 max-w-xs leading-relaxed">
            Acesso exclusivo para Matheus Lemes gerenciar projetos, playlists e conteúdos do portfólio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4A42] mb-1.5">
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
                className={`w-full px-3.5 py-2.5 pr-10 text-sm bg-[#FCFCFB] border rounded-lg focus:outline-none transition-colors ${
                  error
                    ? 'border-red-500 focus:border-red-600 bg-red-50/20'
                    : 'border-[#D5D5CA] focus:border-[#1A1A1A]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A80] hover:text-[#1A1A1A] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                Senha incorreta. Acesso restrito ao proprietário.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141414] hover:bg-[#2A2A2A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
          >
            <span>Desbloquear Modo ADM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#F0F0EA] flex items-center justify-center gap-1.5 text-[11px] text-[#8A8A80]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Proteção ativa contra edições de visitantes</span>
        </div>
      </div>
    </div>
  );
};
