import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CycleData, PhaseInfo } from '../types/cycle';
import { useCycleData } from '../hooks/useCycleData';
import { getPhaseInfo } from '../utils/cycleCalculator';

interface CycleContextValue {
  cycleData: CycleData | null;
  phaseInfo: PhaseInfo;
  hasData: boolean;
  saveCycleData: (data: CycleData) => void;
  resetCycleData: () => void;
}

const CycleContext = createContext<CycleContextValue | null>(null);

export function CycleProvider({ children }: { children: React.ReactNode }) {
  const { data, saveData, resetData, hasData } = useCycleData();
  const [cycleData, setCycleData] = useState<CycleData | null>(data);
  const [phaseInfo, setPhaseInfo] = useState<PhaseInfo>(() => getPhaseInfo(data));

  // 每 60 秒刷新一次（处理跨日）
  useEffect(() => {
    const tick = () => {
      setPhaseInfo(getPhaseInfo(cycleData));
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [cycleData]);

  // 当 data 变化时同步
  useEffect(() => {
    setCycleData(data);
    setPhaseInfo(getPhaseInfo(data));
  }, [data]);

  const saveCycleData = useCallback(
    (d: CycleData) => {
      saveData(d);
      setCycleData(d);
      setPhaseInfo(getPhaseInfo(d));
    },
    [saveData]
  );

  const resetCycleData = useCallback(() => {
    resetData();
    setCycleData(null);
    setPhaseInfo(getPhaseInfo(null));
  }, [resetData]);

  return (
    <CycleContext.Provider
      value={{ cycleData, phaseInfo, hasData, saveCycleData, resetCycleData }}
    >
      {children}
    </CycleContext.Provider>
  );
}

export function useCycleContext(): CycleContextValue {
  const ctx = useContext(CycleContext);
  if (!ctx) {
    throw new Error('useCycleContext must be used within CycleProvider');
  }
  return ctx;
}
