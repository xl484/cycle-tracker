import type { CyclePhase, GuidanceItem } from '../types/cycle';

const contentMap: Record<Exclude<CyclePhase, 'unknown'>, GuidanceItem[]> = {
  menstrual: [
    {
      id: 'men-exercise', category: 'exercise', icon: '🧘',
      title: '运动建议',
      content: '避免剧烈运动和高强度训练。推荐散步、轻柔瑜伽、拉伸等温和活动，可缓解经痛和肌肉紧张。热敷腹部有助于舒缓不适。',
    },
    {
      id: 'men-diet', category: 'diet', icon: '🍲',
      title: '饮食建议',
      content: '多饮温水，补充高蛋白食物如汤类、豆制品。适量摄入黑巧克力可缓解不适。避免生冷食物和过量咖啡因。血量流失消耗铁质，多吃红肉、菠菜。',
    },
    {
      id: 'men-sleep', category: 'sleep', icon: '😴',
      title: '睡眠建议',
      content: '经期疲劳感较强，建议比平时早睡30-60分钟。睡前热敷腹部或泡脚有助入睡。如经痛影响睡眠，可尝试侧卧屈膝姿势缓解。',
    },
    {
      id: 'men-mood', category: 'mood', icon: '🌸',
      title: '情绪关怀',
      content: '雌激素和孕酮处于低点，情绪可能偏低或敏感。接纳这个节奏，减少社交压力，给自己安静的独处时光。写日记或听舒缓音乐有帮助。',
    },
  ],
  follicular: [
    {
      id: 'fol-exercise', category: 'exercise', icon: '🏃',
      title: '运动建议',
      content: '利用这段高能量窗口加强锻炼！适合力量训练、有氧运动、跑步等中高强度运动。研究显示此阶段运动表现和力量可达峰值。',
    },
    {
      id: 'fol-diet', category: 'diet', icon: '🥗',
      title: '饮食建议',
      content: '保持均衡营养，多摄入优质蛋白和复合碳水支持体能需求。新鲜蔬菜和水果有助维持上升期的身体代谢。',
    },
    {
      id: 'fol-sleep', category: 'sleep', icon: '😴',
      title: '睡眠建议',
      content: '精力回升期睡眠质量通常较好。保持规律作息，早晨适当晒太阳有助于维持生物钟稳定。运动后充分拉伸可提升深度睡眠。',
    },
    {
      id: 'fol-mood', category: 'mood', icon: '☀️',
      title: '情绪关怀',
      content: '雌激素回升带来积极情绪和自信。这是社交、开启新项目的好时机。利用这份动力去推进之前搁置的计划。',
    },
  ],
  ovulation: [
    {
      id: 'ovu-exercise', category: 'exercise', icon: '🔥',
      title: '运动建议',
      content: '体能处于高峰，可以挑战高强度间歇训练（HIIT）、冲刺跑、大重量训练。注意保持充分热身和补水，留意可能的轻微排卵腹痛。',
    },
    {
      id: 'ovu-diet', category: 'diet', icon: '🥑',
      title: '饮食建议',
      content: '补充足量水分（体温略高时需水量增加）。摄入富含抗氧化物和健康脂肪的食物如牛油果、坚果，支持高峰代谢。',
    },
    {
      id: 'ovu-sleep', category: 'sleep', icon: '😴',
      title: '睡眠建议',
      content: '能量高峰可能导致晚睡冲动，但保持7-8小时睡眠很重要。睡前减少屏幕时间，可以尝试冥想帮助放松。',
    },
    {
      id: 'ovu-mood', category: 'mood', icon: '🌼',
      title: '情绪关怀',
      content: '雌激素峰值带来社交自信和表达欲。适合安排重要沟通、公开演讲。享受这段状态最好的时光，记录下让你开心的事。',
    },
  ],
  luteal: [
    {
      id: 'lut-exercise', category: 'exercise', icon: '🚶',
      title: '运动建议',
      content: '适度降低运动强度但不要完全停止。快走、瑜伽、普拉提和轻度有氧能有效缓解 PMS 情绪波动。运动释放的内啡肽是天然的情绪稳定剂。',
    },
    {
      id: 'lut-diet', category: 'diet', icon: '🍫',
      title: '饮食建议',
      content: '控制甜食和精碳水摄入，避免血糖骤升骤降加重疲惫。可少量摄入黑巧克力。增加镁含量食物（坚果、深绿蔬菜）有助缓解情绪波动。',
    },
    {
      id: 'lut-sleep', category: 'sleep', icon: '😴',
      title: '睡眠建议',
      content: '孕酮升高可能影响睡眠质量。睡前避免咖啡因和酒精，尝试薰衣草精油或温热牛奶。如果半夜醒来，不要看手机，深呼吸帮助重新入睡。',
    },
    {
      id: 'lut-mood', category: 'mood', icon: '🍃',
      title: '情绪关怀',
      content: 'PMS 可能带来焦虑、易怒或低落。允许自己有情绪波动，不必苛责。减少不必要的压力源，安排整理和复盘类工作更舒适。',
    },
  ],
};

const fallback: GuidanceItem[] = [
  { id:'fb-exercise', category:'exercise', icon:'🏃', title:'运动建议', content:'记录经期数据后，获取适合当前阶段的运动指导。' },
  { id:'fb-diet', category:'diet', icon:'🥗', title:'饮食建议', content:'不同阶段身体需求不同，合理饮食帮你更舒适地度过每个时期。' },
  { id:'fb-sleep', category:'sleep', icon:'😴', title:'睡眠建议', content:'周期各阶段对睡眠影响不同，科学调整作息提升休息质量。' },
  { id:'fb-mood', category:'mood', icon:'🌸', title:'情绪关怀', content:'了解荷尔蒙波动对情绪的影响，学会与自己的身体节奏共处。' },
];

export function getGuidance(phase: CyclePhase): GuidanceItem[] {
  if (phase === 'unknown') return fallback;
  return contentMap[phase];
}
