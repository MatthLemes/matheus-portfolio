import React, { useState, useEffect } from 'react';
import {
  X,
  Github,
  UploadCloud,
  Download,
  Copy,
  Check,
  CheckCheck,
  AlertCircle,
  HelpCircle,
  Key,
  FolderGit2,
  RefreshCw,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

const GITHUB_REPO_KEY = 'matheus_github_repo_config';
const GITHUB_TOKEN_KEY = 'matheus_github_token_config';
const GITHUB_BRANCH_KEY = 'matheus_github_branch_config';

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [repo, setRepo] = useState(() => {
    return localStorage.getItem(GITHUB_REPO_KEY) || '';
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem(GITHUB_TOKEN_KEY) || '';
  });
  const [branch, setBranch] = useState(() => {
    return localStorage.getItem(GITHUB_BRANCH_KEY) || 'main';
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (repo) localStorage.setItem(GITHUB_REPO_KEY, repo.trim());
    if (token) localStorage.setItem(GITHUB_TOKEN_KEY, token.trim());
    if (branch) localStorage.setItem(GITHUB_BRANCH_KEY, branch.trim());
  }, [repo, token, branch]);

  if (!isOpen) return null;

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handlePublishToGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repo || !token) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, preencha o repositório (ex: usuario/repo) e o seu GitHub Personal Access Token.',
      });
      return;
    }

    setIsPublishing(true);
    setStatusMessage(null);

    try {
      // 1. Sanitize repo format
      const cleanRepo = repo.replace('https://github.com/', '').replace(/\/$/, '').trim();
      const filePath = 'src/data/portfolioData.json';
      const cleanBranch = branch.trim() || 'main';

      // 2. Fetch current file SHA from GitHub if it exists
      let currentSha: string | undefined = undefined;
      const getFileRes = await fetch(
        `https://api.github.com/repos/${cleanRepo}/contents/${filePath}?ref=${cleanBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        currentSha = fileData.sha;
      }

      // 3. Encode content to Base64 (supporting Unicode UTF-8)
      const jsonContent = JSON.stringify(data, null, 2);
      const encodedContent = btoa(
        encodeURIComponent(jsonContent).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );

      // 4. Commit and push directly to GitHub via contents API
      const putRes = await fetch(
        `https://api.github.com/repos/${cleanRepo}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `chore: sincronização automática do portfólio [${new Date().toLocaleTimeString('pt-BR')}]`,
            content: encodedContent,
            sha: currentSha,
            branch: cleanBranch,
          }),
        }
      );

      if (!putRes.ok) {
        const errorData = await putRes.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Erro ${putRes.status} ao comunicar com a API do GitHub`
        );
      }

      setStatusMessage({
        type: 'success',
        text: 'Commit enviado ao GitHub com sucesso! O Vercel iniciou o deploy automático e seu site estará atualizado em 30 a 60 segundos.',
      });
    } catch (err: any) {
      console.error('Erro na sincronização GitHub:', err);
      setStatusMessage({
        type: 'error',
        text: `Falha ao sincronizar: ${err.message || 'Verifique o token e as permissões de repo'}.`,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] text-[#181816] dark:text-[#F5F5F0] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#151514]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 dark:bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold font-sans">
                Sincronização GitHub & Vercel
              </h3>
              <p className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">
                Publicação automática em tempo real para produção
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73736C] hover:text-[#181816] dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Diagnostic explanation */}
          <div className="p-3.5 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#2563EB] dark:text-[#3B82F6]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Como funciona a atualização no Vercel?</span>
            </div>
            <p className="text-[#57574F] dark:text-[#A8A89E] leading-relaxed">
              O Vercel hospeda o portfólio como um site estático de alta performance. Ele só reconstrói e publica novas alterações quando um commit entra no branch <strong>{branch || 'main'}</strong> do GitHub. Conectando seu token abaixo, toda edição feita no Modo ADM realiza o commit diretamente no seu GitHub, acionando o deploy do Vercel na mesma hora!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePublishToGitHub} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                Repositório no GitHub (ex: usuario/portfolio) *
              </label>
              <div className="relative">
                <FolderGit2 className="w-4 h-4 text-[#A8A89E] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="ex: matheuslemes/portfolio"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  GitHub Personal Access Token (PAT) *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#A8A89E] absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  placeholder="main"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#73736C] dark:text-[#A8A89E]">
              O token é guardado apenas no seu próprio navegador (localStorage). Ele precisa da permissão de <code>repo</code> no GitHub.
            </p>

            {statusMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed">{statusMessage.text}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPublishing}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Publicando no GitHub...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Publicar no GitHub & Disparar Vercel Agora</span>
                </>
              )}
            </button>
          </form>

          {/* Manual Backup Options */}
          <div className="pt-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A] space-y-2.5">
            <div className="text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] font-medium">
              Opções Manuais de Backup & Gravação
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#151514] hover:bg-[#F4F3EE] dark:hover:bg-[#242422] rounded-lg transition-colors text-[#181816] dark:text-white"
              >
                <Download className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Baixar portfolioData.json</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#151514] hover:bg-[#F4F3EE] dark:hover:bg-[#242422] rounded-lg transition-colors text-[#181816] dark:text-white"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar JSON do Portfólio</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#73736C] dark:text-[#A8A89E] leading-relaxed">
              Você pode baixar o arquivo e substituí-lo em <code>src/data/portfolioData.json</code> no seu repositório a qualquer momento caso não queira usar tokens da API.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#151514]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
