import React, { useState } from 'react';
import { 
  Smile, Activity, Leaf, Moon, Plus, ChevronLeft, Share2, 
  Home, Calendar, PieChart, User, ChevronRight, Droplet, Sun, Wind,
  Frown, Meh, Bell, Settings, Zap, Briefcase, Dumbbell, PersonStanding, 
  Mountain, Snowflake, Edit3, X
} from 'lucide-react';

const CYCLE_LENGTH = 28;
const CURRENT_DAY = 12;

const phaseData = {
  name: '排卵期',
  day: CURRENT_DAY,
  total: CYCLE_LENGTH,
  desc: '这是你魅力四射、能量较高的阶段，身体状态和情绪通常较为稳定，是拓展社交、推进计划的好时机。',
  advice: [
    { label: '精力水平', value: '较高', icon: <Activity className="w-4 h-4 text-[#d988f9]" /> },
    { label: '适合运动', value: '有氧运动 / 舞蹈 / 户外活动', icon: <Activity className="w-4 h-4 text-[#8da6f9]" /> },
    { label: '工作建议', value: '创意工作 / 团队协作 / 演讲展示', icon: <User className="w-4 h-4 text-[#89d6c8]" /> },
    { label: '情绪倾向', value: '自信 / 积极 / 社交欲增强', icon: <Smile className="w-4 h-4 text-[#f7b882]" /> }
  ]
};

// 模拟历史记录数据，用于在日历上显示情绪
const mockDailyRecords = {
  18: { mood: 'happy', icon: <Smile className="w-2.5 h-2.5" /> },
  19: { mood: 'tired', icon: <Meh className="w-2.5 h-2.5" /> },
  20: { mood: 'calm', icon: <Smile className="w-2.5 h-2.5" /> }, // 今天
};

const GlassCard = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/30 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(100,100,150,0.1)] rounded-3xl ${className}`}
  >
    {children}
  </div>
);

const HomeScreen = ({ setView }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar animate-in fade-in duration-500 pb-24 px-5">
      <div className="flex justify-between items-center mt-12 mb-6">
        <div>
          <h1 className="text-white/90 text-lg font-light tracking-wide">Hi, Luna</h1>
          <p className="text-white text-2xl font-medium mt-1 leading-snug">了解周期，<br />更好地照顾自己</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer shadow-sm active:scale-95 transition-transform">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      <div className="relative w-full flex justify-center py-6">
        <div 
          className="relative w-64 h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 hover:scale-105"
          onClick={() => setView('details')}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(200,180,255,0.3) 100%)',
            boxShadow: 'inset -8px -8px 24px rgba(255,255,255,0.6), inset 8px 8px 24px rgba(255,255,255,0.9), 0 20px 40px rgba(120,110,200,0.2)',
            border: '1.5px solid rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <h2 className="text-3xl font-bold text-white drop-shadow-md">排卵期</h2>
          <p className="text-white/90 text-sm mt-2 tracking-wider">第 12 天 / 共 28 天</p>
          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/30 border border-white/50 text-white text-xs font-medium flex items-center backdrop-blur-sm shadow-sm hover:bg-white/40 transition-colors">
            查看阶段详情 <ChevronRight className="w-3 h-3 ml-1" />
          </div>
          <div className="absolute top-2 right-6 w-10 h-10 rounded-full bg-gradient-to-tr from-white/20 to-white/70 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8)] border border-white/50 animate-pulse"></div>
          <div className="absolute bottom-6 left-4 w-6 h-6 rounded-full bg-gradient-to-tr from-white/20 to-white/70 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8)] border border-white/50 animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute -bottom-2 right-12 w-4 h-4 rounded-full bg-gradient-to-tr from-white/20 to-white/70 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)] border border-white/50"></div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-white/80 text-xs font-medium mb-3 ml-1">今日状态概览</h3>
        <GlassCard className="flex justify-between items-center px-4 py-5">
          {[
            { icon: <Activity className="w-5 h-5 text-[#af90e8]" />, label: '精力', val: '较高' },
            { icon: <Smile className="w-5 h-5 text-[#89a8df]" />, label: '情绪', val: '平稳' },
            { icon: <Leaf className="w-5 h-5 text-[#84c9b9]" />, label: '身体', val: '轻盈' },
            { icon: <Moon className="w-5 h-5 text-[#b0a8ca]" />, label: '睡眠', val: '良好' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 relative">
               {idx !== 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/30"></div>}
               <div className="mb-2 opacity-90">{item.icon}</div>
               <span className="text-[10px] text-[#7a7a9a] mb-0.5">{item.label}</span>
               <span className="text-xs font-medium text-[#5a5a75]">{item.val}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      <GlassCard className="mt-5 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-[#5a5a75] mb-3">记录经期</h3>
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] text-[#8a8aa8]">开始日期</p>
              <p className="text-sm font-bold text-[#5a5a75] mt-0.5">5月20日</p>
            </div>
            <div>
              <p className="text-[10px] text-[#8a8aa8]">周期长度</p>
              <p className="text-sm font-bold text-[#5a5a75] mt-0.5">28 天</p>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ffa7c4] to-[#fdb5ee] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,160,200,0.5)] active:scale-95 transition-transform cursor-pointer">
          <Plus className="w-6 h-6" />
        </div>
      </GlassCard>

      <div className="mt-6 mb-4 relative">
         <h3 className="text-white/80 text-xs font-medium mb-4 ml-1 flex items-center">
            周期阶段总览 <ChevronRight className="w-3 h-3 ml-0.5" />
         </h3>
         <div className="px-2">
            <div className="absolute top-12 left-6 right-6 h-[2px] bg-white/40 z-0"></div>
            <div className="flex justify-between relative z-10">
              {[
                { label: '经期', days: '1-5天', icon: <Droplet className="w-3.5 h-3.5" />, active: false, color: 'text-[#ffa7c4]' },
                { label: '卵泡期', days: '6-13天', icon: <Sun className="w-3.5 h-3.5" />, active: false, color: 'text-[#c6b4f9]' },
                { label: '排卵期', days: '14-16天', icon: <Activity className="w-3.5 h-3.5" />, active: true, color: 'text-[#af90e8]' },
                { label: '黄体期', days: '17-28天', icon: <Wind className="w-3.5 h-3.5" />, active: false, color: 'text-[#f5d09b]' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                    ${item.active ? `bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-white scale-110 ${item.color}` : 'bg-[#ebe8f4]/60 border border-white/60 text-[#a0a0b8]'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[11px] ${item.active ? 'font-medium text-[#5a5a75]' : 'text-[#8a8aa8]'}`}>{item.label}</span>
                  <span className="text-[9px] text-[#a0a0b8] scale-90">{item.days}</span>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const DetailsScreen = ({ setView }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar animate-in slide-in-from-right duration-400 relative">
      <div className="flex justify-between items-center p-5 pt-12 relative z-10">
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer active:scale-95" onClick={() => setView('home')}>
          <ChevronLeft className="w-5 h-5" />
        </div>
        <span className="text-white font-medium tracking-wider">阶段详情</span>
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer active:scale-95">
          <Share2 className="w-4 h-4" />
        </div>
      </div>

      <div className="px-6 mt-6 flex flex-col items-center text-center relative z-10">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(200,180,255,0.4) 100%)', boxShadow: 'inset -4px -4px 10px rgba(255,255,255,0.5), inset 4px 4px 10px rgba(255,255,255,0.9), 0 10px 20px rgba(120,110,200,0.15)', border: '1px solid rgba(255,255,255,0.8)' }}>
           <Activity className="w-8 h-8 text-white drop-shadow-sm" />
           <div className="absolute top-1 right-2 w-3 h-3 rounded-full bg-white/70 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)]"></div>
        </div>
        <h2 className="text-3xl font-bold text-white drop-shadow-sm tracking-wide">{phaseData.name}</h2>
        <p className="text-white/80 text-sm mt-2">第 {phaseData.day} 天 / 共 {phaseData.total} 天</p>
      </div>

      <div className="px-8 mt-8 mb-6 relative z-10">
        <p className="text-white/90 text-[13px] leading-relaxed font-light tracking-wide text-justify">{phaseData.desc}</p>
      </div>

      <div className="px-5 relative z-10 pb-10">
        <GlassCard className="py-2 px-1">
          {phaseData.advice.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-white/20 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[13px] font-medium text-[#5a5a75]">{item.label}</span>
              </div>
              <div className="text-[12px] text-[#8a8aa8] flex items-center">
                {item.value} <ChevronRight className="w-3.5 h-3.5 ml-1.5 opacity-40" />
              </div>
            </div>
          ))}
        </GlassCard>
        <button className="w-full mt-6 py-4 rounded-full bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_20px_rgba(100,100,150,0.1)] text-[#5a5a75] text-sm font-medium hover:bg-white/50 active:scale-[0.98] transition-all flex justify-center items-center">
          记录今日状态 <ChevronRight className="w-4 h-4 ml-1 opacity-60" />
        </button>
      </div>
    </div>
  );
};

const CalendarScreen = () => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSportText, setOtherSportText] = useState('');
  const [customSports, setCustomSports] = useState([]); // 新增：用于存储用户自定义输入的运动

  const defaultSportsList = [
    { id: 'run', label: '跑步', icon: <PersonStanding className="w-4 h-4" /> },
    { id: 'strength', label: '力量训练', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'tennis', label: '网球', icon: <Activity className="w-4 h-4" /> },
    { id: 'badminton', label: '羽毛球', icon: <Activity className="w-4 h-4" /> },
    { id: 'ski', label: '滑雪', icon: <Snowflake className="w-4 h-4" /> },
    { id: 'mountain', label: '爬山', icon: <Mountain className="w-4 h-4" /> },
    { id: 'yoga', label: '瑜伽', icon: <Leaf className="w-4 h-4" /> },
  ];

  // 合并默认运动和用户自定义的运动
  const allSports = [...defaultSportsList, ...customSports];

  const toggleSport = (id) => {
    setSelectedSports(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // 处理添加自定义运动
  const handleAddCustomSport = () => {
    if (otherSportText.trim()) {
      const newSportId = `custom_${Date.now()}`;
      // 添加到自定义运动列表，默认使用 Activity 图标
      setCustomSports([...customSports, { id: newSportId, label: otherSportText.trim(), icon: <Activity className="w-4 h-4" /> }]);
      // 自动将其设为选中状态
      setSelectedSports([...selectedSports, newSportId]);
      // 清空输入框并收起
      setOtherSportText('');
      setShowOtherInput(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar animate-in fade-in duration-500 pb-24 px-5">
      <div className="flex justify-between items-center mt-12 mb-6">
        <h1 className="text-white/90 text-xl font-medium tracking-wide">周期日历</h1>
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer active:scale-95">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <GlassCard className="p-4 mb-5">
        <div className="flex justify-between items-center mb-2 px-2">
           <span className="text-[#5a5a75] font-bold text-sm">2026年 5月</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
            <div key={i} className="text-[11px] text-[#8a8aa8] font-medium pb-2">{day}</div>
          ))}
          {['28', '29', '30'].map(d => <div key={'e'+d} className="text-sm text-white/40 pt-1.5 h-10">{d}</div>)}
          
          {Array.from({length: 31}, (_, i) => {
            const date = i + 1;
            let bgColor = "transparent";
            let textColor = "text-[#5a5a75]";
            let glow = "";
            
            if (date >= 5 && date <= 9) { bgColor = "bg-gradient-to-br from-[#ffa7c4]/60 to-[#fdb5ee]/60 backdrop-blur-sm border border-white/50"; }
            else if (date >= 10 && date <= 13) { bgColor = "bg-[#d8cbf9]/40 border border-white/40"; }
            else if (date >= 14 && date <= 16) { 
              bgColor = "bg-gradient-to-br from-[#d4bcf9] to-[#af90e8] text-white border border-white/70";
              glow = "shadow-[0_4px_12px_rgba(175,144,232,0.4)] scale-[1.05] font-bold";
              textColor = "text-white";
            }
            else if (date >= 17 && date <= 28) { bgColor = "bg-[#fbe8c7]/50 border border-white/40"; }
            else if (date === 20) { textColor = "text-[#f584a7] font-bold"; }

            const dailyRecord = mockDailyRecords[date];

            return (
              <div key={date} className="flex flex-col items-center justify-start h-10">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full text-[13px] transition-all z-10 ${bgColor} ${textColor} ${glow}`}>
                  {date}
                </div>
                <div className="h-3 mt-0.5 opacity-80 flex items-center justify-center">
                  {dailyRecord && (
                    <span className={date === 20 ? 'text-[#af90e8]' : 'text-[#a0a0b8]'}>{dailyRecord.icon}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between items-center mt-3 px-1 border-t border-white/20 pt-3">
          {[
            { label: '经期', color: 'bg-[#fbaecf]' },
            { label: '卵泡期', color: 'bg-[#d8cbf9]' },
            { label: '排卵期', color: 'bg-[#af90e8]' },
            { label: '黄体期', color: 'bg-[#fce6c5]' },
          ].map((item, idx) => (
             <div key={idx} className="flex items-center">
               <div className={`w-2 h-2 rounded-full ${item.color} mr-1.5 shadow-sm`}></div>
               <span className="text-[10px] text-[#8a8aa8]">{item.label}</span>
             </div>
          ))}
        </div>
      </GlassCard>

      <h3 className="text-white/90 text-sm font-medium mb-3 mt-2 flex items-center gap-2">
         <Edit3 className="w-4 h-4" /> 今日记录
      </h3>
      <GlassCard className="p-6">
        <p className="text-[11px] text-[#5a5a75] font-medium mb-4">感觉如何？</p>
        <div className="flex justify-between items-center mb-8">
          {[
            { icon: <Smile />, label: '开心' },
            { icon: <Smile />, label: '平静', active: true },
            { icon: <Meh />, label: '疲惫' },
            { icon: <Frown />, label: '焦虑' },
            { icon: <Frown />, label: '低落' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center cursor-pointer group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                ${item.active ? 'bg-gradient-to-tr from-[#af90e8] to-[#d4bcf9] text-white shadow-[0_4px_15px_rgba(175,144,232,0.4)] scale-110' : 'bg-white/40 text-[#a0a0b8] border border-white/50 group-hover:bg-white/60'}`}>
                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
              </div>
              <span className={`text-[10px] ${item.active ? 'text-[#5a5a75] font-medium' : 'text-[#8a8aa8]'}`}>{item.label}</span>
            </div>
          ))}
        </div>

        {}
        <div className="mb-8 relative">
           <div className="flex justify-between items-center mb-3">
              <p className="text-[11px] text-[#5a5a75] font-medium">今日运动</p>
           </div>
           
           {/* 改动点1：将溢出横向滚动(overflow-x-auto) 改为 自动换行(flex-wrap)，并设置间距 gap */}
           <div className="flex flex-wrap gap-2.5 pb-2">
              {allSports.map(sport => {
                const isActive = selectedSports.includes(sport.id);
                return (
                  <button 
                    key={sport.id}
                    onClick={() => toggleSport(sport.id)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 border text-[11px]
                      ${isActive ? 'bg-white/80 border-[#d4bcf9] text-[#5a5a75] shadow-sm font-medium scale-105' : 'bg-white/20 border-white/40 text-[#8a8aa8] hover:bg-white/30'}`}
                  >
                    {React.cloneElement(sport.icon, { className: `w-3.5 h-3.5 ${isActive ? 'text-[#af90e8]' : 'opacity-60'}` })}
                    {sport.label}
                  </button>
                )
              })}
              {/* “其他”按钮作为最后的元素，参与折行排列 */}
              <button 
                onClick={() => setShowOtherInput(true)}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 border border-dashed border-[#a0a0b8]/50 text-[#8a8aa8] text-[11px] hover:bg-white/30 transition-all"
              >
                <Plus className="w-3 h-3" /> 其他
              </button>
           </div>

           {/* 改动点2：展开的输入框逻辑更新，支持回车确认，并调用 handleAddCustomSport 变为新标签 */}
           <div className={`transition-all duration-300 overflow-hidden ${showOtherInput ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
              <div className="flex items-center gap-2 bg-white/40 border border-white/60 p-1.5 rounded-2xl shadow-inner">
                 <input 
                   type="text" 
                   placeholder="输入运动名称 (按回车保存)..." 
                   value={otherSportText} 
                   onChange={(e) => setOtherSportText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSport()}
                   className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#5a5a75] px-2 placeholder:text-[#a0a0b8]"
                 />
                 <button onClick={() => { setShowOtherInput(false); setOtherSportText(''); }} className="p-1.5 bg-white/50 text-[#8a8aa8] rounded-full hover:bg-white/80"><X className="w-3 h-3" /></button>
                 <button onClick={handleAddCustomSport} className="px-3 py-1 bg-gradient-to-r from-[#d4bcf9] to-[#af90e8] text-white text-[11px] rounded-full shadow-sm font-medium">确认</button>
              </div>
           </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-[#5a5a75] font-medium">精力水平</span>
              <span className="text-[12px] text-[#8a8aa8]">7</span>
            </div>
            <div className="relative h-2.5 bg-white/40 rounded-full shadow-inner border border-white/20">
              <div className="absolute top-0 left-0 h-full w-[70%] bg-gradient-to-r from-[#d4bcf9] to-[#af90e8] rounded-full"></div>
              <div className="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full border-2 border-[#af90e8] shadow-[0_2px_8px_rgba(175,144,232,0.5)]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-[#5a5a75] font-medium">身体不适</span>
              <span className="text-[12px] text-[#8a8aa8]">2</span>
            </div>
            <div className="relative h-2.5 bg-white/40 rounded-full shadow-inner border border-white/20">
              <div className="absolute top-0 left-0 h-full w-[20%] bg-gradient-to-r from-[#e6dfff] to-[#cbbcf6] rounded-full"></div>
              <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full border-2 border-[#cbbcf6] shadow-[0_2px_8px_rgba(203,188,246,0.5)]"></div>
            </div>
          </div>
        </div>

        <button className="w-full mt-8 py-3.5 rounded-full bg-gradient-to-r from-[#fcaecb] to-[#cbbcf6] text-white text-sm font-bold shadow-[0_8px_20px_rgba(200,160,220,0.3)] hover:opacity-90 active:scale-95 transition-all">
          保存
        </button>
      </GlassCard>
    </div>
  );
};

const InsightsScreen = () => {
  const [expanded, setExpanded] = useState(null);

  const guides = [
    {
      id: 'energy',
      title: '精力状态',
      subtitle: '精力逐渐上升',
      desc: '适合学习新事物，制定计划',
      content: '在卵泡期和排卵前夕，随着雌激素水平的显著回升，大脑神经递质活跃度提升。此时你的认知能力和专注度通常处于月经周期的高峰，疲劳感降低。抓住这段高能量窗口期，去攻克那些需要深度思考、复杂逻辑或大量注意力的困难任务吧。',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-[#af90e8]',
      bgColor: 'bg-[#af90e8]',
      iconShadow: 'shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),_0_6px_12px_rgba(175,144,232,0.3)]'
    },
    {
      id: 'sports',
      title: '适合运动',
      subtitle: '瑜伽 · 慢跑 · 普拉提',
      desc: '有氧与拉伸结合',
      content: '科研表明，排卵期前后女性的半蹲力量和耐力表现出色。你可以适当提升运动强度，例如增加核心力量训练或进行 HIIT。不过要注意排卵日当天少数人可能出现轻微“经间痛”，如果感到不适，请切换回轻柔的普拉提或恢复性瑜伽。',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-[#8da6f9]',
      bgColor: 'bg-[#8da6f9]',
      iconShadow: 'shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),_0_6px_12px_rgba(141,166,249,0.3)]'
    },
    {
      id: 'work',
      title: '工作建议',
      subtitle: '适合专注型工作',
      desc: '可以推进项目，安排重要会议',
      content: '这段时期的荷尔蒙变化使你在表达能力、共情能力以及社交欲望上都有明显增强。非常适合安排团队头脑风暴、发表演讲、或者与重要客户进行商务谈判。你散发的自信和积极态度将极大地帮助你获得支持。',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'text-[#c09de5]',
      bgColor: 'bg-[#c09de5]',
      iconShadow: 'shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),_0_6px_12px_rgba(192,157,229,0.3)]'
    },
    {
      id: 'mood',
      title: '情绪倾向',
      subtitle: '情绪稳定，积极乐观',
      desc: '自信心提升，社交状态佳',
      content: '告别了经期的低落和不适，雌激素和少量增加的睾酮会让你感到心情愉悦、外向且富有魅力。顺应这股积极的情绪流，多和朋友聚会，或者尝试一些以前不敢尝试的新鲜事物，享受这段身心舒适的时光。',
      icon: <Smile className="w-5 h-5" />,
      color: 'text-[#f5bc8c]',
      bgColor: 'bg-[#f5bc8c]',
      iconShadow: 'shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),_0_6px_12px_rgba(245,188,140,0.3)]'
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar animate-in fade-in duration-500 pb-24 px-5">
      <div className="mt-12 mb-6">
        <h1 className="text-white/90 text-2xl font-medium tracking-wide">阶段指引</h1>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => {
          const isExpanded = expanded === guide.id;
          return (
            <GlassCard key={guide.id} className="overflow-hidden transition-all duration-300">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer active:bg-white/10 transition-colors"
                onClick={() => setExpanded(isExpanded ? null : guide.id)}
              >
                <div>
                  <h3 className="text-[12px] text-[#8a8aa8] mb-2">{guide.title}</h3>
                  <h4 className="text-[15px] font-bold text-[#5a5a75] mb-1">{guide.subtitle}</h4>
                  <p className="text-[10px] text-[#8a8aa8]">{guide.desc}</p>
                </div>
                
                {/* 3D 拟物化图标按钮 */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center relative flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'scale-90 opacity-70' : ''}`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)',
                    border: '1px solid rgba(255,255,255,0.6)',
                  }}
                >
                  <div className={`absolute inset-0 rounded-full opacity-20 ${guide.bgColor}`}></div>
                  <div className={`relative z-10 ${guide.color} ${guide.iconShadow}`}>
                    {guide.icon}
                  </div>
                  {/* 高光反光点 */}
                  <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-white/80 shadow-[0_0_2px_rgba(255,255,255,0.8)]"></div>
                </div>
              </div>

              {/* 展开的详情内容 (使用 CSS Grid 实现平滑动画) */}
              <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-2 border-t border-white/20">
                    <p className="text-[12px] text-[#5a5a75] leading-relaxed tracking-wide text-justify">
                      {guide.content}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar animate-in fade-in duration-500 pb-24 px-5">
      <div className="flex justify-between items-center mt-12 mb-6">
        <h1 className="text-white/90 text-xl font-medium tracking-wide">我的主页</h1>
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer active:scale-95">
          <Settings className="w-4 h-4" />
        </div>
      </div>
      
      <GlassCard className="p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4bcf9] to-[#fcaecb] p-1">
          <div className="w-full h-full bg-white/50 rounded-full border-2 border-white flex items-center justify-center">
             <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#5a5a75]">Luna</h2>
          <p className="text-xs text-[#8a8aa8] mt-1">已记录 12 个周期</p>
        </div>
      </GlassCard>

      <div className="mt-6 space-y-4">
        {[
          { label: '周期报告', icon: <PieChart className="w-4 h-4 text-[#af90e8]" /> },
          { label: '提醒设置', icon: <Bell className="w-4 h-4 text-[#f584a7]" /> },
          { label: '应用设置', icon: <Settings className="w-4 h-4 text-[#8da6f9]" /> },
          { label: '帮助与反馈', icon: <Smile className="w-4 h-4 text-[#84c9b9]" /> }
        ].map((item, i) => (
          <GlassCard key={i} className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/40 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-[#5a5a75]">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8a8aa8]" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState('home'); // 'home' or 'details' (仅在首页下生效)

  return (
    <div className="min-h-screen bg-[#d8d5df] flex items-center justify-center py-10 font-sans">
      
      {/* 手机容器 */}
      <div 
        className="w-full max-w-[390px] h-[844px] relative overflow-hidden shadow-2xl rounded-[3rem] border-[8px] border-white/90 bg-[#e6e2f4]"
        style={{ background: 'linear-gradient(165deg, #c7c6ec 0%, #d8d3f6 25%, #e6e2f4 55%, #f2ebf5 100%)' }}
      >
        {/* 内容路由 */}
        {activeTab === 'home' && view === 'home' && <HomeScreen setView={setView} />}
        {activeTab === 'home' && view === 'details' && <DetailsScreen setView={setView} />}
        {activeTab === 'calendar' && <CalendarScreen />}
        {activeTab === 'insights' && <InsightsScreen />}
        {activeTab === 'profile' && <ProfileScreen />}

        {/* 底部导航栏 (Glassmorphism Bottom Bar) */}
        <div className="absolute bottom-0 w-full h-20 bg-white/40 backdrop-blur-2xl border-t border-white/50 flex items-center justify-around px-4 z-50 rounded-b-[2.5rem] shadow-[0_-10px_30px_rgba(255,255,255,0.4)]">
          {[
            { id: 'home', icon: <Home />, label: '首页' },
            { id: 'calendar', icon: <Calendar />, label: '记录' },
            { id: 'insights', icon: <PieChart />, label: '指引' },
            { id: 'profile', icon: <User />, label: '我的' },
          ].map((tab) => {
            const isActive = activeTab === tab.id && (tab.id !== 'home' || view === 'home');
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id === 'home') setView('home'); }}
                className={`flex flex-col items-center justify-center w-14 h-14 transition-all ${
                  isActive ? 'text-[#f584a7] scale-105' : 'text-[#a4a4be] hover:text-[#8a8aa8]'
                }`}
              >
                <div className={`mb-1 transition-all ${isActive ? 'drop-shadow-sm' : ''}`}>
                  {React.cloneElement(tab.icon, { 
                    className: `w-[22px] h-[22px] ${isActive ? 'fill-current opacity-20' : ''}`,
                    strokeWidth: isActive ? 2.5 : 2
                  })}
                </div>
                <span className={`text-[10px] ${isActive ? 'font-medium' : 'font-normal'}`}>{tab.label}</span>
                {isActive && <div className="w-1 h-1 bg-[#f584a7] rounded-full mt-1 absolute bottom-1"></div>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}