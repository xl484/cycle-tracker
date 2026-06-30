import { useState, useEffect, useCallback } from 'react';

export interface DailyStatus { mood: number; energy: number }
type StatusMap = Record<string, DailyStatus>;

const KEY = 'daily-status';

function load(): StatusMap {
  try { return JSON.parse(localStorage.getItem(KEY)||'{}'); }
  catch { return {}; }
}
function save(d: StatusMap) { localStorage.setItem(KEY, JSON.stringify(d)); }

export function useDailyStatus() {
  const [data, setData] = useState<StatusMap>(load);

  const setToday = useCallback((s: DailyStatus) => {
    const today = new Date().toISOString().slice(0,10);
    setData(prev => { const n = {...prev, [today]: s}; save(n); return n; });
  }, []);

  const getDay = useCallback((dateStr: string): DailyStatus|null => {
    return data[dateStr] ?? null;
  }, [data]);

  return { data, setToday, getDay };
}
