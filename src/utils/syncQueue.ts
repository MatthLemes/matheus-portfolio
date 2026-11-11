/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from '../types/portfolio';

export const PENDING_QUEUE_STORAGE_KEY = 'matheus_portfolio_pending_sync_queue';
export const LOCAL_STORAGE_ACTIVE_KEY = 'matheus_portfolio_data_active';
export const SYNC_LOGS_STORAGE_KEY = 'matheus_portfolio_sync_logs';

export interface PendingSyncEntry {
  id: string;
  timestamp: number;
  payload: PortfolioData;
  retries: number;
  lastAttempt?: number;
  error?: string;
}

export type SyncEventType =
  | 'local_save'
  | 'api_save_success'
  | 'api_save_error'
  | 'offline_queued'
  | 'auto_retry'
  | 'github_sync'
  | 'reconciliation_merge';

export interface SyncLogEntry {
  id: string;
  timestamp: number;
  type: SyncEventType;
  status: 'success' | 'warning' | 'error' | 'info';
  title: string;
  details: string;
  target: 'localStorage' | 'api' | 'github' | 'runtime';
  httpStatus?: number | string;
  error?: string;
  itemsCount?: {
    projects: number;
    highlights: number;
    poems: number;
  };
}

/**
 * Retrieves the pending sync queue from localStorage.
 */
export function getPendingQueue(): PendingSyncEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PENDING_QUEUE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[SyncQueue] Failed to parse pending queue from storage:', err);
    return [];
  }
}

/**
 * Enqueues or updates the pending portfolio state snapshot.
 */
export function enqueuePendingSync(payload: PortfolioData, errorMessage?: string): PendingSyncEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const queue = getPendingQueue();
    const existingRetries = queue.length > 0 ? queue[queue.length - 1].retries : 0;

    const newEntry: PendingSyncEntry = {
      id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      payload,
      retries: existingRetries,
      error: errorMessage,
    };

    const updatedQueue: PendingSyncEntry[] = [newEntry];
    localStorage.setItem(PENDING_QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
    return updatedQueue;
  } catch (err) {
    console.error('[SyncQueue] Failed to enqueue sync item:', err);
    return [];
  }
}

/**
 * Removes all pending items after successful sync.
 */
export function clearPendingQueue(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PENDING_QUEUE_STORAGE_KEY);
  } catch (err) {
    console.error('[SyncQueue] Failed to clear queue:', err);
  }
}

/**
 * Returns true if there are pending unsynced changes.
 */
export function hasPendingSync(): boolean {
  return getPendingQueue().length > 0;
}

/**
 * Returns the latest pending payload if available.
 */
export function getLatestPendingPayload(): PortfolioData | null {
  const queue = getPendingQueue();
  if (queue.length === 0) return null;
  return queue[queue.length - 1].payload;
}

/**
 * Retrieves sync diagnostic logs from localStorage.
 */
export function getSyncLogs(): SyncLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SYNC_LOGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[SyncQueue] Failed to parse sync logs from storage:', err);
    return [];
  }
}

/**
 * Appends a new diagnostic entry to the sync history (retains last 60 entries).
 */
export function addSyncLog(entry: Omit<SyncLogEntry, 'id' | 'timestamp'>): SyncLogEntry {
  const newEntry: SyncLogEntry = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
  };

  if (typeof window !== 'undefined') {
    try {
      const logs = getSyncLogs();
      const updated = [newEntry, ...logs].slice(0, 60);
      localStorage.setItem(SYNC_LOGS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('[SyncQueue] Failed to write sync log:', err);
    }
  }

  return newEntry;
}

/**
 * Clears stored sync logs.
 */
export function clearSyncLogs(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SYNC_LOGS_STORAGE_KEY);
  } catch (err) {
    console.warn('[SyncQueue] Failed to clear sync logs:', err);
  }
}

export type SyncResult =
  | { success: true; status: number }
  | { success: false; status: number | 'network_error' | 'timeout'; error: string; isServerAbsent: boolean };

/**
 * Attempts to push a payload to the backend save API with an explicit timeout.
 */
export async function sendPortfolioSave(payload: PortfolioData, timeoutMs = 8000): Promise<SyncResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch('/api/save-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (res.ok) {
      return { success: true, status: res.status };
    }

    // 404 indicates the static server (e.g. Vercel CDN) has no /api/save-portfolio route
    const isServerAbsent = res.status === 404;
    return {
      success: false,
      status: res.status,
      error: `Server responded with status ${res.status}`,
      isServerAbsent,
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    const isAbort = (err as Error)?.name === 'AbortError';
    return {
      success: false,
      status: isAbort ? 'timeout' : 'network_error',
      error: (err as Error)?.message || 'Network request failed',
      isServerAbsent: false,
    };
  }
}
