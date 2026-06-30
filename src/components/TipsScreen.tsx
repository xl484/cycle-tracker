import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
import { getGuidance } from '../utils/guidanceContent';
import { useDailyStatus } from '../hooks/useDailyStatus';

const LUT=14;

/* 禅意线条图标 */
const Ico = ({d,color,size}:{d:string;color:string;size?:number})=>(
  <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);

const CATS=[
  {k:'exercise',label:'运动',icon:<Ico color="#BAC5F4" d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M7 22l2-9-1 1v4H6v-5l5-3 3 1 5-3 1 2-3 4-2 1-1 5h-2z"/>},
  {k:'diet',label:'饮食',icon:<Ico color="#76C8A9" d="M3 8h18l-3 13H6L3 8z M8 3h8l-2 5H10L8 3z"/>},
  {k:'sleep',label:'睡眠',icon:<Ico color="#F498B7" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>},
  {k:'mood',label:'情绪',icon:<Ico color="#FFAAA6" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01"/>},
];

const ROWS=[
  {k:'exercise',label:'适合运动',bg:'rgba(186,197,244,0.12)',c:'#BAC5F4',
    v:(p:string)=>p==='menstrual'?'轻柔瑜伽 / 散步':p==='follicular'?'力量训练 / 有氧':p==='ovulation'?'HIIT / 冲刺跑':'快走 / 普拉提',
    d:"M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M7 22l2-9-1 1v4H6v-5l5-3 3 1 5-3 1 2-3 4-2 1-1 5h-2z"},
  {k:'diet',label:'饮食建议',bg:'rgba(168,230,207,0.12)',c:'#76C8A9',
    v:(p:string)=>p==='menstrual'?'高蛋白 / 高铁食物':p==='follicular'?'均衡营养 / 蔬果':p==='ovulation'?'补水 / 抗氧化物':'控糖 / 补镁食物',
    d:"M3 8h18l-3 13H6L3 8z M8 3h8l-2 5H10L8 3z"},
  {k:'sleep',label:'睡眠建议',bg:'rgba(244,152,183,0.12)',c:'#F498B7',
    v:(p:string)=>p==='menstrual'?'早睡 / 热敷助眠':p==='follicular'?'规律作息 / 晒晨光':p==='ovulation'?'7-8h / 减少屏幕':'薰衣草 / 深呼吸',
    d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},
  {k:'mood',label:'情绪关怀',bg:'rgba(255,211,182,0.12)',c:'#FFAAA6',
    v:(p:string)=>p==='menstrual'?'接纳节奏 / 独处':p==='follicular'?'积极社交 / 推进':p==='ovulation'?'自信表达 / 记录':'减少压力 / 复盘',
    d:"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01"},
];

const META:Record<string,{e:string;l:string;d:string}>={
  menstrual:{e:'●',l:'经期',d:'内膜脱落，能量处于低谷。给自己更多休息和温暖，放缓节奏，避免过度消耗。'},
  follicular:{e:'◉',l:'卵泡期',d:'雌激素逐步回升，精力和情绪都在攀升。这是开启新计划、加强锻炼的好时机。'},
  ovulation:{e:'◎',l:'排卵期',d:'魅力四射、能量较高的阶段。身体状态和情绪稳定，适合拓展社交和推进计划。'},
  luteal:{e:'○',l:'黄体期',d:'孕酮升高可能带来疲惫和情绪波动。适度降低强度，安排整理和复盘会更舒适。'},
  unknown:{e:'●',l:'周期',d:''},
};

const MOODS=[
  {k:3,icon:<Ico color="#FFAAA6" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01"/>},
  {k:2,icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BAC5F4" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14h8" strokeLinecap="round"/><circle cx="9" cy="9" r="1" fill="#BAC5F4" stroke="none"/><circle cx="15" cy="9" r="1" fill="#BAC5F4" stroke="none"/></svg>},
  {k:1,icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#76C8A9" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14h8" strokeLinecap="round"/></svg>},
  {k:0,icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F498B7" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14s2-2 4-2 4 2 4 2" strokeLinecap="round"/><circle cx="9" cy="9" r="1" fill="#F498B7" stroke="none"/><circle cx="15" cy="9" r="1" fill="#F498B7" stroke="none"/></svg>},
];

export default function TipsScreen({initialCat,onBack}:{initialCat?:string;onBack:()=>void}){
  const{phaseInfo,cycleData}=useCycleContext();
  const[expanded,setExpanded]=useState<string|null>(initialCat??null);
  const[selMood,setSelMood]=useState(-1);
  const[energy,setEnergy]=useState(7);
  const[saved,setSaved]=useState(false);
  const{setToday}=useDailyStatus();
  const handleSave=()=>{setToday({mood:selMood>=0?selMood:2,energy});setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const p=phaseInfo.phase;const m=META[p]??META.unknown;
  const cl=cycleData?.cycleLength??28;const pl=cycleData?.periodLength??5;const fl=cl-LUT;
  const items=getGuidance(p);
  const segs=[{id:'menstrual',l:'经期',f:pl},{id:'follicular',l:'卵泡期',f:fl-pl},{id:'ovulation',l:'排卵期',f:1},{id:'luteal',l:'黄体期',f:LUT}];

  return(
    <>
      <div className="sbar" style={{marginBottom:12}}>
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 5L2 13l8 8M2 13h20"/></svg>
          计划与建议
        </button>
      </div>

      {/* 4 分类入口 */}
      <div className="cat-tabs">
        {CATS.map(c=>(<button key={c.k} className={`cat-tab ${expanded===c.k?'on':''}`} onClick={()=>setExpanded(c.k===expanded?null:c.k)}>{c.icon}<span style={{marginLeft:6}}>{c.label}</span></button>))}
      </div>

      <div style={{margin:'0 24px 16px',padding:'28px 24px 24px',borderRadius:28,
        background:'linear-gradient(180deg,rgba(255,255,255,0.65) 0%,rgba(255,255,255,0.3) 100%)',
        backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.45)',borderTop:'1px solid rgba(255,255,255,0.6)',
        boxShadow:'0 8px 32px rgba(162,172,216,0.25),inset 0 1px 0 rgba(255,255,255,0.5)',
        position:'relative',overflow:'hidden'}}>

        <div style={{position:'absolute',right:-16,top:'4%',width:70,height:70,borderRadius:'50%',
          background:'radial-gradient(circle at 35% 35%,rgba(255,255,255,0.9),rgba(244,152,183,0.4),rgba(229,186,245,0.1))',
          border:'1px solid rgba(255,255,255,0.5)'}}/>

        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16,position:'relative',zIndex:1}}>
          <div style={{position:'relative',width:44,height:44,flexShrink:0}}>
            <div style={{width:44,height:44,borderRadius:'50%',border:'1.5px solid rgba(255,255,255,0.6)'}}/>
            <div style={{position:'absolute',inset:6,borderRadius:'50%',background:'rgba(186,197,244,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'#4B5563',fontWeight:300}}>{m.e}</div>
          </div>
          <div>
            <div style={{fontSize:20,fontWeight:600,color:'#4B5563'}}>{m.l}</div>
            <div style={{fontSize:12,fontWeight:500,color:'#9CA3AF'}}>第 {phaseInfo.dayInCycle||'-'} 天 / 共 {cl} 天</div>
          </div>
        </div>

        <p style={{fontSize:13,fontWeight:400,color:'#6B7280',lineHeight:1.7,margin:'0 0 20px',position:'relative',zIndex:1}}>{m.d}</p>

        {ROWS.map(r=>{
          const full=items.find(i=>i.category===r.k);
          const isOpen=expanded===r.k;
          return(
            <div key={r.k} style={{position:'relative',zIndex:1}}>
              <div onClick={()=>setExpanded(isOpen?null:r.k)}
                style={{display:'flex',alignItems:'center',gap:14,padding:'14px',borderRadius:18,
                  background:'rgba(255,255,255,0.4)',border:'1px solid rgba(255,255,255,0.3)',
                  marginBottom:8,cursor:'pointer'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:r.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Ico color={r.c} d={r.d} size={14}/>
                </div>
                <span style={{fontSize:13,fontWeight:600,color:'#4B5563',flex:1}}>{r.label}</span>
                <span style={{fontSize:12,fontWeight:500,color:r.c,textAlign:'right',maxWidth:140}}>{r.v(p)}</span>
              </div>
              {isOpen&&full&&(
                <div style={{padding:'0 14px 12px',fontSize:12,color:'#6B7280',lineHeight:1.6}}>{full.content}</div>
              )}
            </div>
          );
        })}

        <div style={{borderTop:'1px solid rgba(255,255,255,0.4)',paddingTop:16,marginTop:4,position:'relative',zIndex:1}}>
          <div style={{fontSize:11,fontWeight:600,color:'#6B7280',marginBottom:10}}>记录今日状态</div>
          <div style={{display:'flex',gap:14,marginBottom:12}}>
            {MOODS.map((mo,i)=>(
              <button key={i} onClick={()=>setSelMood(mo.k)}
                style={{width:32,height:32,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.6)',
                  background:selMood===mo.k?'rgba(255,255,255,0.6)':'rgba(255,255,255,0.25)',
                  cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',padding:0}}>{mo.icon}</button>
            ))}
          </div>
          <div className="slider-lbl"><span>精力水平</span><span style={{color:'var(--peri)',fontWeight:600}}>{energy}</span></div>
          <div className="slider"><div className="slider-f" style={{width:`${(energy/10)*100}%`}}><div className="slider-k" style={{left:`calc(${(energy/10)*100}% - 7px)`}}/></div></div>
          <button className="btn" onClick={handleSave} style={{marginTop:12}}>{saved?'✓ 已保存':'记录今日状态 ›'}</button>
        </div>
      </div>

    </>
  );
}
