import type { CyclePhase, CycleData } from '../types/cycle';
import ProgressRing from './ProgressRing';

interface PhaseCardProps {
  phase: CyclePhase;
  dayInCycle: number;
  cycleData: CycleData;
}

const PHASE_INFO: Record<string, { emoji: string; label: string; desc: string }> = {
  menstrual: {
    emoji: '🌸',
    label: '经期',
    desc: '内膜脱落，能量低谷。适合放缓节奏，给予自己更多温暖和休息。',
  },
  follicular: {
    emoji: '☀️',
    label: '卵泡期',
    desc: '雌激素回升，精力和情绪上升。开始新项目、加强锻炼的好时机。',
  },
  ovulation: {
    emoji: '🌼',
    label: '排卵期',
    desc: '雌激素峰值，身心状态高点。体能充沛，社交自信增强。',
  },
  luteal: {
    emoji: '🍃',
    label: '黄体期',
    desc: '孕酮升高，可能感到疲惫。降低强度，整理和复盘会更舒适。',
  },
  unknown: {
    emoji: '🌸',
    label: '周期',
    desc: '输入末次经期日期和周期长度，开始追踪你的身体节奏。',
  },
};

export default function PhaseCard({ phase, dayInCycle, cycleData }: PhaseCardProps) {
  const info = PHASE_INFO[phase] ?? PHASE_INFO.unknown;

  return (
    <div className="phase-card">
      <ProgressRing cycleData={cycleData} dayInCycle={dayInCycle} emoji={info.emoji} />
      <p className="phase-label">
        {info.emoji} {info.label} · 第 {dayInCycle} 天
      </p>
      <p className="phase-desc">{info.desc}</p>
    </div>
  );
}
