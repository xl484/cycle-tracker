// ===== 周期数据类型 =====

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown';

export interface CycleData {
  lastPeriodDate: string;   // ISO date "YYYY-MM-DD"
  cycleLength: number;      // 平均周期天数 (21-45)
  periodLength: number;     // 经期天数 (2-10)
}

export interface PhaseInfo {
  phase: CyclePhase;
  dayInCycle: number;       // 当前周期第几天 (1-based)
  daysUntilNextPhase: number;
  phaseLabel: string;       // 中文名称
  phaseEmoji: string;       // emoji
}

export interface GuidanceItem {
  id: string;
  category: 'energy' | 'exercise' | 'work' | 'diet';
  icon: string;
  title: string;
  content: string;
}

export interface BubbleConfig {
  id: number;
  size: number;
  left: number;
  driftX: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  color: string;
  isAtmo?: boolean; // 大气泡模式（巨大 + 极淡 + 极高模糊）
}

export interface ValidationError {
  field: string;
  message: string;
}
