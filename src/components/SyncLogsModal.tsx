/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  HardDrive,
  Wifi,
  WifiOff,
  Copy,
  Trash2,
  Check,
  ExternalLink,
  ShieldAlert,
  Server,
} from 'lucide-react';
import {
  SyncLogEntry,
  getSyncLogs,
  clearSyncLogs,
  getPendingQueue,
  LOCAL_STORAGE_ACTIVE_KEY,
  addSyncLog,
} from '../utils/syncQueue';
import { PortfolioData } from '../types/portfolio';

interface SyncLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onFlushQueue?: () => Promise<void>;
}

export function SyncLogsModal({ isOpen, onClose, data, onFlushQueue }: SyncLogsModalProps) {
  const [logs, setLogs] = useState<SyncLogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'errors' | 'success' | 'network'>('all');
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const pendingQueue = getPendingQueue();

  const loadLogs = () => {
    setLogs(getSyncLogs());
  };

  useEffect(() => {
    if (isOpen) {
      loadLogs();
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate local storage approximate size
  let storageSizeKb = 0;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY);
    if (raw) {
      storageSizeKb = Math.round((new Blob([raw]).size / 1024) * 10) / 10;
    }
  } catch {
    storageSizeKb = 0;
  }

  const filteredLogs = logs.filter((log) => {
    if (filter === 'errors') return log.status === 'error' || log.status === 'warning';
    if (filter === 'success') return log.status === 'success';
    if (filter === 'network') return log.target === 'api' || log.type === 'offline_queued';
    return true;
  });

  const handleCopyLogs = async () => {
    try {
      const summary = {
        exportedAt: new Date().toISOString(),
        onlineStatus: isOnline,
        storageSizeKb,
        pendingQueueCount: pendingQueue.length,
        itemsInState: {
          projects: data.embeddedProjects?.length || 0,
          highlights: data.linkedInHighlights?.length || 0,
          poems: data.compactPoems?.length || 0,
        },
        logs,
      };
      await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy logs:', err);
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('Deseja limpar todo o histórico de logs de diagnóstico?')) {
      clearSyncLogs();
      loadLogs();
    }
  };

  const handleTestApiConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const start = performance.now();
    try {
      const res = await fetch('/api/portfolio-data', { method: 'GET' });
      const duration = Math.round(performance.now() - start);

      if (res.ok) {
        setTestResult(`✓ Resposta em ${duration}ms (HTTP 200 OK). Servidor backend Node ativo e respondendo.`);
        addSyncLog({
          type: 'api_save_success',
          status: 'success',
          title: 'Teste de Conexão com API',
          details: `GET /api/portfolio-data respondeu em ${duration}ms com HTTP 200.`,
          target: 'api',
          httpStatus: 200,
        });
      } else if (res.status === 404) {
        setTestResult(`⚠ HTTP 404 Not Found (${duration}ms). Este host está rodando em CDN Estático (como Vercel Jamstack sem servidor gravável no disco). Use a sincronização com GitHub para publicar.`);
        addSyncLog({
          type: 'api_save_error',
          status: 'warning',
          title: 'Teste de Conexão - Endpoint Ausente (404)',
          details: 'Host estático sem backend gravável. Requer deploy via commit no GitHub.',
          target: 'api',
          httpStatus: 404,
        });
      } else {
        setTestResult(`❌ Servidor retornou HTTP ${res.status} em ${duration}ms.`);
        addSyncLog({
          type: 'api_save_error',
          status: 'error',
          title: 'Teste de Conexão Falhou',
          details: `Servidor retornou status HTTP ${res.status}`,
          target: 'api',
          httpStatus: res.status,
        });
      }
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - start);
      setTestResult(`❌ Falha de rede (${duration}ms): ${(err as Error)?.message || 'Erro de conexão'}`);
      addSyncLog({
        type: 'api_save_error',
        status: 'error',
        title: 'Teste de Conexão - Erro de Rede',
        details: (err as Error)?.message || 'Falha de conexão',
        target: 'api',
        httpStatus: 'network_error',
      });
    } finally {
      setIsTesting(false);
      loadLogs();
    }
  };

  const handleTriggerFlush = async () => {
    if (onFlushQueue) {
      await onFlushQueue();
      loadLogs();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] dark:bg-[#181816] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#2E2E2A]/20 dark:border-white/10 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#2E2E2A]/10 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#1F1F1D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 dark:bg-[#3B82F6]/15 flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#181816] dark:text-[#F5F5F0] flex items-center gap-2">
                <span>Log de Sincronização & Diagnóstico</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  Modo ADM
                </span>
              </h2>
              <p className="text-xs text-[#5E5E56] dark:text-[#9E9E92]">
                Histórico de salvamentos locais, chamadas de API e diagnósticos de conectividade.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5E5E56] hover:text-[#181816] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Diagnostic Status Summary Cards */}
        <div className="p-6 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: Local Storage */}
          <div className="p-3.5 rounded-xl border border-[#2E2E2A]/10 dark:border-white/10 bg-white dark:bg-[#1E1E1C]">
            <div className="flex items-center justify-between text-xs text-[#5E5E56] dark:text-[#9E9E92] mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <HardDrive className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                Persistência Local
              </span>
              <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {storageSizeKb} KB
              </span>
            </div>
            <div className="text-sm font-semibold text-[#181816] dark:text-[#F5F5F0]">
              {data.embeddedProjects?.length || 0} proj · {data.linkedInHighlights?.length || 0} posts · {data.compactPoems?.length || 0} poesias
            </div>
            <div className="text-[11px] text-[#5E5E56] dark:text-[#9E9E92] mt-1 font-mono truncate">
              Chave: {LOCAL_STORAGE_ACTIVE_KEY}
            </div>
          </div>

          {/* Card 2: Pending Queue */}
          <div className="p-3.5 rounded-xl border border-[#2E2E2A]/10 dark:border-white/10 bg-white dark:bg-[#1E1E1C]">
            <div className="flex items-center justify-between text-xs text-[#5E5E56] dark:text-[#9E9E92] mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <RefreshCw className={`w-3.5 h-3.5 ${pendingQueue.length > 0 ? 'text-amber-500 animate-spin' : 'text-emerald-500'}`} />
                Fila Pendente
              </span>
              <span className={`font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${pendingQueue.length > 0 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'}`}>
                {pendingQueue.length} item{pendingQueue.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="text-sm font-semibold text-[#181816] dark:text-[#F5F5F0]">
              {pendingQueue.length > 0 ? 'Aguardando sincronização' : 'Fila 100% sincronizada'}
            </div>
            <div className="text-[11px] text-[#5E5E56] dark:text-[#9E9E92] mt-1">
              {pendingQueue.length > 0 ? 'Tentará automaticamente ao reconectar' : 'Sem itens retidos'}
            </div>
          </div>

          {/* Card 3: Network Status */}
          <div className="p-3.5 rounded-xl border border-[#2E2E2A]/10 dark:border-white/10 bg-white dark:bg-[#1E1E1C]">
            <div className="flex items-center justify-between text-xs text-[#5E5E56] dark:text-[#9E9E92] mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                {isOnline ? (
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                )}
                Rede do Navegador
              </span>
              <span className={`font-mono text-[11px] font-semibold ${isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="text-sm font-semibold text-[#181816] dark:text-[#F5F5F0]">
              {isOnline ? 'Conexão ativa' : 'Trabalhando local'}
            </div>
            <div className="text-[11px] text-[#5E5E56] dark:text-[#9E9E92] mt-1">
              {isOnline ? 'Pronto para sincronizar' : 'Itens salvos com segurança'}
            </div>
          </div>
        </div>

        {/* Quick Diagnostics Guidance Callout */}
        <div className="px-6 pb-3">
          <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-[#1E3A8A] dark:text-blue-300 flex items-start gap-2.5">
            <Server className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">Diagnóstico da Arquitetura:</span> Se você estiver na Vercel, o Vercel é um host estático (CDN) sem disco gravável. Portanto, qualquer salvamento via API resultará em 404 (esperado). Os dados ficam 100% seguros no seu navegador e para subir à Vercel basta usar o botão <strong>&apos;Sincronizar GitHub & Vercel&apos;</strong> que compila a versão oficial diretamente.
            </div>
          </div>

          {testResult && (
            <div className="mt-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-[11px] text-[#181816] dark:text-[#F5F5F0]">
              {testResult}
            </div>
          )}
        </div>

        {/* Filter Bar & Quick Actions */}
        <div className="px-6 py-2.5 border-y border-[#2E2E2A]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#161614] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816] font-semibold' : 'text-[#5E5E56] hover:text-[#181816] dark:text-[#9E9E92] dark:hover:text-white'}`}
            >
              Todos ({logs.length})
            </button>
            <button
              onClick={() => setFilter('errors')}
              className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'errors' ? 'bg-rose-600 text-white font-semibold' : 'text-[#5E5E56] hover:text-[#181816] dark:text-[#9E9E92] dark:hover:text-white'}`}
            >
              Erros & Falhas ({logs.filter((l) => l.status === 'error' || l.status === 'warning').length})
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'success' ? 'bg-emerald-600 text-white font-semibold' : 'text-[#5E5E56] hover:text-[#181816] dark:text-[#9E9E92] dark:hover:text-white'}`}
            >
              Sucessos ({logs.filter((l) => l.status === 'success').length})
            </button>
            <button
              onClick={() => setFilter('network')}
              className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'network' ? 'bg-[#2563EB] text-white font-semibold' : 'text-[#5E5E56] hover:text-[#181816] dark:text-[#9E9E92] dark:hover:text-white'}`}
            >
              Rede & API
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestApiConnection}
              disabled={isTesting}
              className="px-2.5 py-1 rounded-md border border-[#2E2E2A]/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-[#181816] dark:text-white font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
              <span>Testar API</span>
            </button>
            {pendingQueue.length > 0 && onFlushQueue && (
              <button
                onClick={handleTriggerFlush}
                className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-mono font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Forçar Fila ({pendingQueue.length})</span>
              </button>
            )}
            <button
              onClick={handleCopyLogs}
              className="px-2.5 py-1 rounded-md border border-[#2E2E2A]/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-[#181816] dark:text-white font-mono flex items-center gap-1.5 transition-colors"
              title="Copiar relatório completo de logs"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="p-1 rounded-md hover:bg-rose-500/10 text-[#5E5E56] hover:text-rose-500 transition-colors"
                title="Limpar logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Logs Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2.5 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-[#5E5E56] dark:text-[#9E9E92]">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="font-medium text-sm text-[#181816] dark:text-[#F5F5F0]">Nenhum registro encontrado no filtro</p>
              <p className="text-xs mt-1">Os eventos de gravação, salvamento local e chamadas de rede aparecerão aqui conforme você interagir com o ADM.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const date = new Date(log.timestamp);
              const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

              return (
                <div
                  key={log.id}
                  className={`p-3 rounded-xl border transition-all ${
                    log.status === 'success'
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-500/20'
                      : log.status === 'error'
                      ? 'bg-rose-50/50 dark:bg-rose-950/15 border-rose-500/25'
                      : log.status === 'warning'
                      ? 'bg-amber-50/50 dark:bg-amber-950/15 border-amber-500/25'
                      : 'bg-white dark:bg-[#1E1E1C] border-[#2E2E2A]/10 dark:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {log.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      {log.status === 'error' && <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                      {log.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      {log.status === 'info' && <Activity className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                      <span className="font-semibold text-[#181816] dark:text-[#F5F5F0]">{log.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {log.httpStatus && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          String(log.httpStatus).startsWith('2')
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}>
                          HTTP {log.httpStatus}
                        </span>
                      )}
                      <span className="text-[11px] text-[#5E5E56] dark:text-[#9E9E92]">
                        {dateStr} {timeStr}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#5E5E56] dark:text-[#CCCCCC] leading-relaxed break-words font-sans">
                    {log.details}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#5E5E56] dark:text-[#9E9E92]">
                    <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      Alvo: {log.target}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      Tipo: {log.type}
                    </span>
                    {log.itemsCount && (
                      <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        Itens: {log.itemsCount.projects}p / {log.itemsCount.highlights}h / {log.itemsCount.poems}po
                      </span>
                    )}
                    {log.error && (
                      <span className="text-rose-500 truncate max-w-xs">
                        Erro: {log.error}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#2E2E2A]/10 dark:border-white/10 bg-white dark:bg-[#1F1F1D] flex items-center justify-between text-xs font-mono">
          <span className="text-[#5E5E56] dark:text-[#9E9E92]">
            Total de registros: {logs.length} (retém até os últimos 60)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#181816] hover:bg-black dark:bg-[#F5F5F0] dark:hover:bg-white text-white dark:text-[#181816] font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
