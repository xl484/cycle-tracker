import { useState, useEffect } from 'react';
import { useCycleContext } from '../context/CycleContext';

export default function InputCard() {
  const { cycleData, saveCycleData } = useCycleContext();

  // 默认值
  const defaultDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })();

  const [lastDate, setLastDate] = useState(cycleData?.lastPeriodDate ?? defaultDate);
  const [cycleLen, setCycleLen] = useState(cycleData?.cycleLength ?? 28);
  const [periodLen, setPeriodLen] = useState(cycleData?.periodLength ?? 5);

  // 当 context 数据变化时同步
  useEffect(() => {
    if (cycleData) {
      setLastDate(cycleData.lastPeriodDate);
      setCycleLen(cycleData.cycleLength);
      setPeriodLen(cycleData.periodLength);
    }
  }, [cycleData]);

  const handleUpdate = () => {
    saveCycleData({
      lastPeriodDate: lastDate,
      cycleLength: cycleLen,
      periodLength: periodLen,
    });
  };

  return (
    <div className="input-card glass-card">
      <h2 className="input-header">更新今日状态</h2>

      <div className="input-field">
        <label>末次月经日期</label>
        <input
          type="date"
          value={lastDate}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setLastDate(e.target.value)}
        />
      </div>

      <div className="input-field">
        <label>周期长度</label>
        <div className="slider-row">
          <input
            type="range"
            min={21}
            max={45}
            value={cycleLen}
            onChange={(e) => setCycleLen(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span className="slider-value">{cycleLen}天</span>
        </div>
        <div className="range-labels">
          <span>21天</span><span>45天</span>
        </div>
      </div>

      <div className="input-field">
        <label>经期时长</label>
        <div className="slider-row">
          <input
            type="range"
            min={2}
            max={10}
            value={periodLen}
            onChange={(e) => setPeriodLen(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span className="slider-value">{periodLen}天</span>
        </div>
      </div>

      <button className="update-btn" onClick={handleUpdate}>
        更新今日状态
      </button>
    </div>
  );
}
