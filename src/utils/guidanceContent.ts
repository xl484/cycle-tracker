import type { CyclePhase, GuidanceItem } from '../types/cycle';

// 四阶段四维度的建议内容（基于 PRD 循证文案）
const contentMap: Record<Exclude<CyclePhase, 'unknown'>, GuidanceItem[]> = {
  menstrual: [
    {
      id: 'men-energy',
      category: 'energy',
      icon: '⚡',
      title: '精力状态',
      content: '雌激素和孕酮处于低点，可能感到乏力、腰酸。血量流失会消耗铁质，建议多补充红肉、菠菜等高铁食物。注意多休息，顺应身体的低速节奏。',
    },
    {
      id: 'men-exercise',
      category: 'exercise',
      icon: '🧘',
      title: '运动建议',
      content: '避免剧烈运动和高强度训练。推荐散步、轻柔瑜伽、拉伸等温和活动，可缓解经痛和肌肉紧张。热敷腹部也有助于舒缓不适。',
    },
    {
      id: 'men-work',
      category: 'work',
      icon: '💼',
      title: '工作节奏',
      content: '适当放慢工作节奏，避免熬夜和重体力活。可将重要决策推迟到精力回升后。短暂午休能有效补充体力。',
    },
    {
      id: 'men-diet',
      category: 'diet',
      icon: '🍲',
      title: '饮食建议',
      content: '多饮温水，补充高蛋白食物如汤类、豆制品。适量摄入黑巧克力可缓解不适。避免生冷食物和过量咖啡因。',
    },
  ],
  follicular: [
    {
      id: 'fol-energy',
      category: 'energy',
      icon: '⚡',
      title: '精力状态',
      content: '雌激素稳步回升，精力逐渐恢复，心情更加愉悦。这是你整个周期中体能和情绪的上升期，自信心和动力都在增强。',
    },
    {
      id: 'fol-exercise',
      category: 'exercise',
      icon: '🏃',
      title: '运动建议',
      content: '利用这段高能量窗口加强锻炼！适合力量训练、有氧运动、跑步等中高强度运动。研究显示此阶段运动表现和力量可达峰值。',
    },
    {
      id: 'fol-work',
      category: 'work',
      icon: '💼',
      title: '工作节奏',
      content: '头脑清晰、精力充沛，适合安排高难度任务、重要会议和需要创造力的工作。抓住这个效率高峰时段推进大项目。',
    },
    {
      id: 'fol-diet',
      category: 'diet',
      icon: '🥗',
      title: '饮食建议',
      content: '保持均衡营养，多摄入优质蛋白和复合碳水支持体能需求。新鲜蔬菜和水果有助维持上升期的身体代谢。',
    },
  ],
  ovulation: [
    {
      id: 'ovu-energy',
      category: 'energy',
      icon: '⚡',
      title: '精力状态',
      content: '雌激素达到峰值，精力和注意力集中度都很高。社交欲望和自信心增强，体温可能略有升高。是身体状态最佳的时间点之一。',
    },
    {
      id: 'ovu-exercise',
      category: 'exercise',
      icon: '🔥',
      title: '运动建议',
      content: '体能处于高峰，可以挑战高强度间歇训练（HIIT）、冲刺跑、大重量训练。注意保持充分热身和补水，留意可能的轻微排卵腹痛。',
    },
    {
      id: 'ovu-work',
      category: 'work',
      icon: '💼',
      title: '工作节奏',
      content: '思维敏捷、表达力强，适合完成重要决策、公开演讲或需要创意的项目。利用这段沟通高峰期建立人脉和推进合作。',
    },
    {
      id: 'ovu-diet',
      category: 'diet',
      icon: '🥑',
      title: '饮食建议',
      content: '补充足量水分（体温略高时需水量增加）。摄入富含抗氧化物和健康脂肪的食物如牛油果、坚果，支持高峰代谢。',
    },
  ],
  luteal: [
    {
      id: 'lut-energy',
      category: 'energy',
      icon: '⚡',
      title: '精力状态',
      content: '孕酮升高可能导致疲惫感、情绪波动和腹胀。临近经期前一周 PMS 症状常见：乳房胀痛、失眠、焦虑。这是身体提醒你放慢的信号。',
    },
    {
      id: 'lut-exercise',
      category: 'exercise',
      icon: '🚶',
      title: '运动建议',
      content: '适度降低运动强度，但不要完全停止。快走、瑜伽、普拉提和轻度有氧能有效缓解 PMS 情绪波动。运动释放的内啡肽是天然的安慰剂。',
    },
    {
      id: 'lut-work',
      category: 'work',
      icon: '💼',
      title: '工作节奏',
      content: '避免高压工作连续作战。可安排复盘、整理、规划等相对轻松的任务。给自己留出缓冲时间，避免在疲劳时做重大决策。',
    },
    {
      id: 'lut-diet',
      category: 'diet',
      icon: '🍫',
      title: '饮食建议',
      content: '控制甜食和精碳水摄入，避免血糖骤升骤降加重疲惫。可少量摄入黑巧克力。增加镁含量丰富的食物（坚果、深绿蔬菜）有助缓解情绪波动。',
    },
  ],
};

const fallbackContent: GuidanceItem[] = [
  {
    id: 'fb-energy',
    category: 'energy',
    icon: '⚡',
    title: '精力状态',
    content: '请先设置你的周期数据，我们将为你提供个性化的每日建议。',
  },
  {
    id: 'fb-exercise',
    category: 'exercise',
    icon: '🧘',
    title: '运动建议',
    content: '记录你的经期开始日期和平均周期长度，即可获取适合当前阶段的运动指导。',
  },
  {
    id: 'fb-work',
    category: 'work',
    icon: '💼',
    title: '工作节奏',
    content: '了解自己的周期阶段，有助于更科学地安排工作和休息。',
  },
  {
    id: 'fb-diet',
    category: 'diet',
    icon: '🍲',
    title: '饮食建议',
    content: '不同阶段身体需求不同，合理的饮食搭配能帮助你更舒适地度过每个时期。',
  },
];

export function getGuidance(phase: CyclePhase): GuidanceItem[] {
  if (phase === 'unknown') return fallbackContent;
  return contentMap[phase];
}
