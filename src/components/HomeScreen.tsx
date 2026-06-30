import { useCycleContext } from '../context/CycleContext';
import type { Tab } from './Dashboard';

const PH:Record<string,{e:string;l:string;v:number}>={
  menstrual:{e:'●',l:'经期',v:40},follicular:{e:'◉',l:'卵泡期',v:75},
  ovulation:{e:'◎',l:'排卵期',v:95},luteal:{e:'○',l:'黄体期',v:55},unknown:{e:'●',l:'周期',v:0},
};
const SvgIco=({d,color}:{d:string;color:string})=>(
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const STATS=(p:string)=>[
  {k:'exercise',l:'推荐运动', v:p==='ovulation'?'HIIT':p==='follicular'?'有氧跑步':p==='luteal'?'散步':'瑜伽',
   c:'rgba(186,197,244,.12)',t:'#BAC5F4',nav:'exercise',
   d:'M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M7 22l2-9-1 1v4H6v-5l5-3 3 1 5-3 1 2-3 4-2 1-1 5h-2z'},
  {k:'body',l:'身体感受', v:p==='ovulation'?'精力充沛':p==='follicular'?'轻盈有力':p==='luteal'?'可能水肿':'易疲惫',
   c:'rgba(168,230,207,.12)',t:'#76C8A9',nav:'diet',
   d:'M3 8h18l-3 13H6L3 8z M8 3h8l-2 5H10L8 3z'},
  {k:'energy',l:'能量状态', v:p==='ovulation'?'高峰':p==='follicular'?'上升':p==='luteal'?'下降':'低谷',
   c:'rgba(244,152,183,.12)',t:'#F498B7',nav:'sleep',
   d:'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'},
  {k:'mood',l:'情绪倾向', v:p==='ovulation'?'自信开朗':p==='follicular'?'积极向上':p==='luteal'?'趋于内敛':'需要放松',
   c:'rgba(255,211,182,.12)',t:'#FFAAA6',nav:'mood',
   d:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01'},
];
const TL=[{k:'menstrual',l:'经期',r:'1-5天',c:'#F498B7'},{k:'follicular',l:'卵泡期',r:'6-13天',c:'#8BA8E0'},{k:'ovulation',l:'排卵期',r:'14-16天',c:'#E85D75'},{k:'luteal',l:'黄体期',r:'17-28天',c:'#FF9A76'}];

/* 禅意线条图标 */
const ZIcon = ({d,color}:{d:string;color?:string})=>(
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color||'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const ZFill = ({d,color}:{d:string;color?:string})=>(
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color||'currentColor'}><path d={d}/></svg>
);

const ACTIONS=[
  {label:'运动',icon:<ZIcon color="#BAC5F4" d="M13 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M7 21l2-8-2 1v3H5v-4l4-2 3 1 4-3 2 1-3 4-2 1-1 6h-2z"/>},
  {label:'饮食',icon:<ZIcon color="#76C8A9" d="M3 8h18l-3 13H6L3 8z M8 3h8l-2 5H10L8 3z"/>},
  {label:'睡眠',icon:<ZIcon color="#F498B7" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>},
  {label:'情绪',icon:<ZIcon color="#FFAAA6" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01"/>},
];

export default function HomeScreen({onNav,goTips}:{onNav:(t:Tab)=>void;goTips:(cat?:string)=>void}){
  const{phaseInfo,cycleData}=useCycleContext();
  const p=phaseInfo.phase;const ph=PH[p]??PH.unknown;

  return(
    <>
      <div className="sbar"><span>9:41</span><div className="sbar-r"><div className="sig"><div style={{height:4,opacity:1}}/><div style={{height:6,opacity:1}}/><div style={{height:8,opacity:1}}/><div style={{height:10,opacity:.4}}/></div><div className="sbat"><div className="sbat-f"/></div></div></div>
      <div className="greet">Hi, Luna</div>
      <div className="h1">了解周期，<br/>更好地照顾自己</div>
      <div style={{display:'flex',justifyContent:'flex-end',padding:'0 24px',marginTop:-36}}>
        <button className="top-btn" onClick={()=>onNav('insights')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18 M8 2v4 M16 2v4"/></svg>
        </button>
      </div>

      <div className="bubble-wrap">
        <div className="deco deco-1"/><div className="deco deco-2"/><div className="deco deco-3"/>
        <div className="bubble">
          <div style={{fontSize:36,fontWeight:300,color:'rgba(255,255,255,.9)',lineHeight:1}}>{ph.e}</div>
          <div className="b-n">{ph.l}</div>
          <div className="b-i">第 {phaseInfo.dayInCycle||'-'} 天 / 共 {cycleData?.cycleLength??28} 天</div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',margin:'-8px 0 16px'}}>
        <button className="btn-pill" onClick={()=>onNav('tips')}>查看计划建议 ›</button>
      </div>

      <div className="sec-tit">今日状态概览</div>
      <div className="card" style={{margin:'0 24px',padding:'14px 12px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
          {STATS(p).map((s,i)=>(
            <div key={i} onClick={()=>goTips(s.nav)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:'pointer'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:s.c,display:'flex',alignItems:'center',justifyContent:'center'}}><SvgIco d={s.d} color={s.t}/></div>
              <span style={{fontSize:9,fontWeight:500,color:'var(--txt2)'}}>{s.l}</span>
              <span style={{fontSize:10,fontWeight:600,color:s.t}}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{margin:'16px 24px',padding:16}}>
        <div className="ebar-w" style={{marginTop:0}}>
          <div className="ebar-l"><span>今日能量 <span style={{fontSize:9,fontWeight:400,color:'var(--txt3)'}}>阶段预期</span></span><span style={{fontWeight:600,color:'var(--pink)'}}>{ph.v}%</span></div>
          <div className="ebar-b"><div className="ebar-f" style={{width:`${ph.v}%`}}/></div>
        </div>
        <div className="stat-r">
          <div className="stat-b"><div className="stat-n">{phaseInfo.dayInCycle||'-'}</div><div className="stat-l">周期第几天</div></div>
          <div className="stat-b"><div className="stat-n">{phaseInfo.daysUntilNextPhase||'-'}</div><div className="stat-l">距下次经期</div></div>
          <div className="stat-b"><div className="stat-n">{cycleData?.cycleLength??28}</div><div className="stat-l">平均周期</div></div>
        </div>
      </div>


      <div style={{margin:'0 24px',padding:'12px 0',display:'flex',gap:10,alignItems:'flex-start'}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}}>
          {p==='menstrual'&&<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M8 2v4 M16 2v4"/>}
          {p==='follicular'&&<><circle cx="12" cy="12" r="5"/><path d="M12 1v4 M12 19v4 M1 12h4 M19 12h4 M4.2 4.2l3 3 M16.8 16.8l3 3 M4.2 19.8l3-3 M16.8 7.2l3-3"/></>}
          {p==='ovulation'&&<path d="M12 2l3 7h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"/>}
          {p==='luteal'&&<><path d="M3 12h2l2-9 4 18 3-12 2 6h5"/></>}
        </svg>
        <span style={{fontSize:11,color:'var(--txt2)',lineHeight:1.5}}>{
          p==='menstrual'?'今天多喝温水，给自己一个安静的午后。':
          p==='follicular'?'精力在回升，适合开启那件想了很久的事。':
          p==='ovulation'?'状态正好，大胆推进，今天是属于你的。':
          p==='luteal'?'放慢一点没关系，整理和复盘也是前进。':''
        }</span>
      </div>
    </>
  );
}
