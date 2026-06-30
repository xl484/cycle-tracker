import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
import { validateCycleData, getDefaultCycleData } from '../utils/cycleCalculator';
import type { CycleData } from '../types/cycle';

export default function OnboardingForm() {
  const { saveCycleData } = useCycleContext();
  const defaults = getDefaultCycleData();
  const [form, setForm] = useState<CycleData>(defaults);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (patch: Partial<CycleData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCycleData(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    saveCycleData(form);
  };

  return (
    <div className="onboarding-shell">
      <div className="onboarding-card glass-card">
        <div className="onboarding-header">
          <span className="onboarding-emoji">🌸</span>
          <h1>女性周期助手</h1>
          <p className="onboarding-sub">
            请设置你的周期信息，我们将为你提供个性化陪伴
          </p>
        </div>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="lastPeriod">📅 上一次月经开始日期</label>
            <input
              id="lastPeriod"
              type="date"
              value={form.lastPeriodDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => update({ lastPeriodDate: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="cycleLength">
              🔄 平均周期长度：
              <strong className="slider-value">{form.cycleLength} 天</strong>
            </label>
            <input
              id="cycleLength"
              type="range"
              min={21}
              max={45}
              value={form.cycleLength}
              onChange={(e) => update({ cycleLength: Number(e.target.value) })}
            />
            <div className="range-labels">
              <span>21</span>
              <span>28 (平均)</span>
              <span>45</span>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="periodLength">
              🩸 经期持续天数：
              <strong className="slider-value">{form.periodLength} 天</strong>
            </label>
            <input
              id="periodLength"
              type="range"
              min={2}
              max={10}
              value={form.periodLength}
              onChange={(e) => update({ periodLength: Number(e.target.value) })}
            />
            <div className="range-labels">
              <span>2</span>
              <span>5 (平均)</span>
              <span>10</span>
            </div>
          </div>

          {errors.length > 0 && (
            <ul className="form-errors">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}

          <button type="submit" className="primary-btn onboarding-btn">
            开始记录 ✨
          </button>
        </form>
      </div>
    </div>
  );
}
