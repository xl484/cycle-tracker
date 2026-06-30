import type { CyclePhase } from '../types/cycle';
import { getGuidance } from '../utils/guidanceContent';

interface TipsCardProps {
  phase: CyclePhase;
}

export default function TipsCard({ phase }: TipsCardProps) {
  const items = getGuidance(phase).slice(0, 4);

  return (
    <div className="tips-card glass-card">
      <h2 className="tips-header">今日建议</h2>
      <div className="tips-grid">
        {items.map((item) => (
          <div key={item.id} className="tip-item">
            <span className="tip-icon">{item.icon}</span>
            <h3 className="tip-title">{item.title}</h3>
            <p className="tip-body">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
