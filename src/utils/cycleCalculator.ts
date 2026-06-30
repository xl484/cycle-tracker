import type { CycleData, CyclePhase, PhaseInfo } from '../types/cycle';

const LUTEAL_LENGTH = 14; // 黄体期固定 14 天

export function getPhaseInfo(data: CycleData | null): PhaseInfo {
  if (!data || !data.lastPeriodDate || !data.cycleLength) {
    return {
      phase: 'unknown',
      dayInCycle: 0,
      daysUntilNextPhase: 0,
      phaseLabel: '未知阶段',
      phaseEmoji: '❓',
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastDate = new Date(data.lastPeriodDate + 'T00:00:00');

  if (isNaN(lastDate.getTime())) {
    return {
      phase: 'unknown',
      dayInCycle: 0,
      daysUntilNextPhase: 0,
      phaseLabel: '日期无效',
      phaseEmoji: '⚠️',
    };
  }

  if (lastDate > today) {
    return {
      phase: 'unknown',
      dayInCycle: 0,
      daysUntilNextPhase: 0,
      phaseLabel: '日期在未来',
      phaseEmoji: '⚠️',
    };
  }

  const { cycleLength, periodLength } = data;

  // 校验周期合理性
  if (cycleLength < periodLength + LUTEAL_LENGTH) {
    return {
      phase: 'unknown',
      dayInCycle: 0,
      daysUntilNextPhase: 0,
      phaseLabel: '周期设置异常',
      phaseEmoji: '⚠️',
    };
  }

  const daysSinceStart = Math.floor(
    (today.getTime() - lastDate.getTime()) / 86400000
  );

  const dayInCycle = (daysSinceStart % cycleLength) + 1;
  const follicularLength = cycleLength - LUTEAL_LENGTH;

  // 阶段判定
  let phase: CyclePhase;
  let phaseLabel: string;
  let phaseEmoji: string;
  let daysUntilNextPhase: number;

  if (dayInCycle <= periodLength) {
    phase = 'menstrual';
    phaseLabel = '经期';
    phaseEmoji = '🌸';
    daysUntilNextPhase = periodLength - dayInCycle + 1;
  } else if (dayInCycle <= follicularLength) {
    phase = 'follicular';
    phaseLabel = '卵泡期';
    phaseEmoji = '☀️';
    daysUntilNextPhase = follicularLength - dayInCycle + 1;
  } else if (dayInCycle === follicularLength + 1) {
    phase = 'ovulation';
    phaseLabel = '排卵期';
    phaseEmoji = '🌼';
    daysUntilNextPhase = 1;
  } else {
    phase = 'luteal';
    phaseLabel = '黄体期';
    phaseEmoji = '🍃';
    const daysInLuteal = dayInCycle - follicularLength - 1;
    daysUntilNextPhase = LUTEAL_LENGTH - daysInLuteal;
  }

  return { phase, dayInCycle, daysUntilNextPhase, phaseLabel, phaseEmoji };
}

export function validateCycleData(
  data: Partial<CycleData>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.lastPeriodDate) {
    errors.push('请选择上一次月经开始日期');
  } else {
    const d = new Date(data.lastPeriodDate + 'T00:00:00');
    if (isNaN(d.getTime())) {
      errors.push('日期格式无效');
    } else if (d > new Date()) {
      errors.push('日期不能在未来');
    }
  }

  if (data.cycleLength != null) {
    if (data.cycleLength < 21 || data.cycleLength > 45) {
      errors.push('周期长度应在 21–45 天之间');
    }
  } else {
    errors.push('请设置平均周期长度');
  }

  if (data.periodLength != null) {
    if (data.periodLength < 2 || data.periodLength > 10) {
      errors.push('经期长度应在 2–10 天之间');
    }
  } else {
    errors.push('请设置经期长度');
  }

  // 交叉校验
  const cl = data.cycleLength ?? 28;
  const pl = data.periodLength ?? 5;
  if (cl < pl + LUTEAL_LENGTH) {
    errors.push(`周期长度（${cl}天）太短，经期+黄体期至少需要 ${pl + LUTEAL_LENGTH} 天`);
  }

  return { valid: errors.length === 0, errors };
}

export function getDefaultCycleData(): CycleData {
  const today = new Date();
  // 默认上次月经为 7 天前
  const defaultDate = new Date(today);
  defaultDate.setDate(today.getDate() - 7);
  const dateStr = defaultDate.toISOString().slice(0, 10);

  return {
    lastPeriodDate: dateStr,
    cycleLength: 28,
    periodLength: 5,
  };
}
