import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
import { getGuidance } from '../utils/guidanceContent';

const LUT=14;
const M:Record<string,{e:string;l:string;d:string}>={
  menstrual:{e:'🌸',l:'经期',d:'内膜脱落，能量低谷，适合休息和温暖自我关怀。'},
  follicular:{e:'☀️',l:'卵泡期',d:'雌激素回升，精力和情绪上升，适合新开始。'},
  ovulation:{e:'🌼',l:'排卵期',d:'LH 激素峰值，卵子即将释放，状态最好的时刻！'},
  luteal:{e:'🍃',l:'黄体期',d:'孕酮升高，可能疲惫。降低强度，整理复盘。'},
  unknown:{e:'🌸',l:'周期',d:''},
};
const CATS=[{k:'exercise',l:'运动',i:'🏃'},{k:'work',l:'工作',i:'💼'},{k:'diet',l:'饮食',i:'🥗'},{k:'energy',l:'精力',i:'⚡'}];
const METERS=[{k:'energy',l:'能量',i:'⚡',v:(p:string)=>p==='ovulation'?95:p==='follicular'?80:p==='luteal'?55:p==='menstrual'?40:0},{k:'mood',l:'情绪稳定性',i:'💆',v:(p:string)=>p==='ovulation'?90:p==='follicular'?85:p==='luteal'?50:p==='menstrual'?55:0},{k:'ex',l:'运动适宜度',i:'🏃',v:(p:string)=>p==='ovulation'?95:p==='follicular'?88:p==='luteal'?50:p==='menstrual'?35:0}];

export default function TipsScreen(){
  const{phaseInfo,cycleData}=useCycleContext();
  const[cat,setCat]=useState('exercise');
  const p=phaseInfo.phase;
  const m=M[p]??M.unknown;
  const cl=cycleData?.cycleLength??28;
  const pl=cycleData?.periodLength??5;
  const fl=cl-LUT;
  const items=getGuidance(p);
  const cur=items.find(g=>g.category===cat)??items[0];

  const segs=[{id:'menstrual',l:'经期',f:pl},{id:'follicular',l:'卵泡期',f:fl-pl},{id:'ovulation',l:'排卵期',f:1},{id:'luteal',l:'黄体期',f:LUT}];

  return(
    <>
      <div className="hd" style={{paddingTop:4}}>
        <h1 className="hd-title" style={{margin:0}}>今日建议</h1>
        <div style={{color:'rgba(255,255,255,.55)',fontSize:10,marginTop:2}}>基于你当前的 <b style={{color:'#fff'}}>{m.l}</b> 阶段</div>
      </div>

      <div className="card" style={{margin:'8px 12px',padding:12}}>
        <div style={{color:'rgba(255,255,255,.7)',fontSize:11,fontWeight:600,marginBottom:8}}>周期进度</div>
        <div className="phase-bars" style={{margin:0}}>
          {segs.map(s=>(<div key={s.id} className="pb-col" style={{flex:s.f}}><div className={`pb-bar ${p===s.id?'on':''}`}/><div className={`pb-lbl ${p===s.id?'on':''}`}>{s.l}</div></div>))}
        </div>
        <div style={{color:'rgba(255,255,255,.5)',fontSize:10,textAlign:'center',marginTop:8}}>周期第 {phaseInfo.dayInCycle} 天 · {m.l}第 {p==='menstrual'?phaseInfo.dayInCycle:p==='follicular'?phaseInfo.dayInCycle-pl:p==='ovulation'?1:p==='luteal'?phaseInfo.dayInCycle-fl:'-'} 天</div>
      </div>

      <div className="card" style={{margin:'8px 12px',padding:12,display:'flex',gap:10,alignItems:'flex-start'}}>
        <div className="pcard-icon" style={{width:32,height:32,borderRadius:12,fontSize:18}}>{m.e}</div>
        <div>
          <div style={{color:'#fff',fontWeight:600,fontSize:11}}>{m.l} · 阶段特征</div>
          <div style={{color:'rgba(255,255,255,.65)',fontSize:10,lineHeight:1.5,marginTop:2}}>{m.d}</div>
        </div>
      </div>

      <div className="cat-tabs">
        {CATS.map(c=>(<button key={c.k} className={`cat-tab ${cat===c.k?'on':''}`} onClick={()=>setCat(c.k)}>{c.i} {c.l}</button>))}
      </div>

      {cur&&(
        <div className="card" style={{margin:'0 12px 8px',padding:14,display:'flex',gap:12,alignItems:'flex-start'}}>
          <span style={{fontSize:28,flexShrink:0}}>{cur.icon}</span>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:4}}>{cur.title}</div>
            <div style={{color:'rgba(255,255,255,.7)',fontSize:10,lineHeight:1.6}}>{cur.content}</div>
          </div>
        </div>
      )}

      <div className="card" style={{margin:'0 12px',padding:12}}>
        <div style={{color:'rgba(255,255,255,.7)',fontSize:11,fontWeight:600,marginBottom:10}}>今日身体状态</div>
        {METERS.map(x=>{const v=x.v(p);return(
          <div key={x.k} className="meter-r">
            <span className="meter-i">{x.i}</span><span className="meter-l">{x.l}</span>
            <div className="meter-b"><div className="meter-f" style={{width:`${v}%`}}/></div>
            <span className="meter-p">{v}%</span>
          </div>
        );})}
      </div>
    </>
  );
}
