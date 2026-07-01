import { useState, useCallback } from 'react';

export interface CycleRecord { startDate: string; endDate?: string; cycleLength: number }
const KEY = 'cycle-history';

function load(): CycleRecord[] {
  try { return JSON.parse(localStorage.getItem(KEY)||'[]'); }
  catch { return []; }
}
function save(d: CycleRecord[]) { localStorage.setItem(KEY, JSON.stringify(d)); }

export function useCycleHistory() {
  const [history, setHistory] = useState<CycleRecord[]>(load);

  const addRecord = useCallback((r: CycleRecord) => {
    setHistory(prev => {
      const exists = prev.find(p => p.startDate === r.startDate);
      const next = exists ? prev.map(p => p.startDate===r.startDate?r:p) : [r, ...prev];
      save(next); return next;
    });
  }, []);

  return { history, addRecord };
}
