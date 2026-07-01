import { useState, useCallback } from 'react';
import type { CycleData } from '../types/cycle';

const STORAGE_KEY = 'cycle-data';

function readFromStorage(): CycleData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.lastPeriodDate && parsed.cycleLength && parsed.periodLength) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeToStorage(data: CycleData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage 写满或不可用
    console.warn('无法保存数据到 localStorage');
  }
}

function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useCycleData() {
  const [data, setData] = useState<CycleData | null>(() => readFromStorage());

  const saveData = useCallback((newData: CycleData) => {
    writeToStorage(newData);
    setData(newData);
  }, []);

  const resetData = useCallback(() => {
    clearStorage();
    setData(null);
  }, []);

  return { data, saveData, resetData, hasData: data !== null };
}
