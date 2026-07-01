import { useCycleContext } from '../context/CycleContext';
import type { Tab } from './Dashboard';
import { Activity, Smile, Leaf, Moon, ChevronRight, Droplet, Sun, Wind, Calendar } from 'lucide-react';

const PH:Record<string,{e:string;l:string;v:number}>={
  menstrual:{e:'●',l:'经期',v:40},follicular:{e:'◉',l:'卵泡期',v:75},
  ovulation:{e:'◎',l:'排卵期',v:95},luteal:{e:'○',l:'黄体期',v:55},unknown:{e:'●',l:'周期',v:0},
};

const TL=[
  {k:'menstrual',l:'经期',r:'1-5天',c:'#ffa7c4',icon:Droplet},
  {k:'follicular',l:'卵泡期',r:'6-13天',c:'#c6b4f9',icon:Sun},
  {k:'ovulation',l:'排卵期',r:'14-16天',c:'#af90e8',icon:Activity},
  {k:'luteal',l:'黄体期',r:'17-28天',c:'#f5d09b',icon:Wind},
];

export default function HomeScreen({onNav,goTips}:{onNav:(t:Tab)=>void;goTips:(cat?:string)=>void}){
  const{phaseInfo,cycleData}=useCycleContext();
  const p=phaseInfo.phase;const ph=PH[p]??PH.unknown;

  return(
    <>
      <div className="sbar"><span>9:41</span><div className="sbar-r"><div className="sig"><div style={{height:4,opacity:1}}/><div style={{height:6,opacity:1}}/><div style={{height:8,opacity:1}}/><div style={{height:10,opacity:.4}}/></div><div className="sbat"><div className="sbat-f"/></div></div></div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'8px 24px 0'}}>
        <div>
          <div style={{fontSize:14,fontWeight:300,color:'rgba(255,255,255,.85)',letterSpacing:1}}>Hi, Luna</div>
          <div style={{fontSize:22,fontWeight:500,color:'#fff',lineHeight:1.3,marginTop:2}}>了解周期，<br/>更好地照顾自己</div>
        </div>
        <button onClick={()=>onNav('insights')} style={{width:38,height:38,borderRadius:14,background:'rgba(255,255,255,.2)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,.35)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>
          <Calendar size={18}/>
        </button>
      </div>

      {/* Gemini 3D 泡泡 */}
      <div style={{display:'flex',justifyContent:'center',padding:'20px 0 8px',position:'relative'}}>
        <div className="deco deco-1"/><div className="deco deco-2"/><div className="deco deco-3"/>
        <div onClick={()=>onNav('tips')} style={{cursor:'pointer',width:220,height:220,borderRadius:'50%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:6,
          background:'radial-gradient(circle at 35% 35%,rgba(255,255,255,.88) 0%,rgba(235,205,255,.55) 28%,rgba(195,215,255,.45) 65%,rgba(254,215,225,.6) 92%,rgba(255,255,255,.25) 100%)',
          boxShadow:'0 16px 44px rgba(186,197,244,.35)',transition:'transform .3s'}}>
          <div style={{fontSize:32,fontWeight:700,color:'#fff',textShadow:'0 2px 6px rgba(0,0,0,.06)'}}>{ph.l}</div>
          <div style={{fontSize:13,fontWeight:400,color:'rgba(255,255,255,.85)',letterSpacing:1}}>第 {phaseInfo.dayInCycle||'-'} 天 / 共 {cycleData?.cycleLength??28} 天</div>
          <div style={{marginTop:4,padding:'4px 14px',borderRadius:20,background:'rgba(255,255,255,.25)',border:'1px solid rgba(255,255,255,.45)',color:'#fff',fontSize:11,fontWeight:500,display:'flex',alignItems:'center',gap:4}}>
            查看阶段详情 <ChevronRight size={12}/>
          </div>
        </div>
      </div>

      {/* 今日状态概览 — Gemini divider风格 */}
      <div style={{margin:'12px 24px 0'}}>
        <div style={{fontSize:11,fontWeight:500,color:'rgba(255,255,255,.75)',marginBottom:8}}>今日状态概览</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 8px',borderRadius:22,
          background:'rgba(255,255,255,.3)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,.5)',borderTop:'1px solid rgba(255,255,255,.6)',
          boxShadow:'0 6px 24px rgba(100,100,150,.07),inset 0 1px 0 rgba(255,255,255,.4)'}}>
          {[
            {icon:<Activity size={18} color="#af90e8"/>,label:'精力',val:p==='ovulation'?'高峰':p==='follicular'?'上升':p==='luteal'?'下降':'低谷',nav:'sleep'},
            {icon:<Smile size={18} color="#89a8df"/>,label:'情绪',val:p==='ovulation'?'自信':p==='follicular'?'积极':p==='luteal'?'内敛':'放松',nav:'mood'},
            {icon:<Leaf size={18} color="#84c9b9"/>,label:'身体',val:p==='ovulation'?'轻盈':p==='follicular'?'舒适':p==='luteal'?'略肿':'疲惫',nav:'diet'},
            {icon:<Moon size={18} color="#b0a8ca"/>,label:'睡眠',val:p==='ovulation'?'好':p==='follicular'?'规律':p==='luteal'?'欠佳':'多睡',nav:'sleep'},
          ].map((s,i)=>(
            <div key={i} onClick={()=>goTips(s.nav)} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,position:'relative',cursor:'pointer'}}>
              {i!==0&&<div style={{position:'absolute',left:0,top:'50%',transform:'translateY(-50%)',width:1,height:28,background:'rgba(255,255,255,.25)'}}/>}
              <div style={{marginBottom:4}}>{s.icon}</div>
              <span style={{fontSize:9,color:'#7a7a9a',marginBottom:1}}>{s.label}</span>
              <span style={{fontSize:11,fontWeight:500,color:'#5a5a75'}}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 记录经期卡 */}
      <div style={{margin:'14px 24px 0',padding:16,borderRadius:22,
        background:'rgba(255,255,255,.3)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,.5)',borderTop:'1px solid rgba(255,255,255,.6)',
        boxShadow:'0 6px 24px rgba(100,100,150,.07)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:12,fontWeight:500,color:'#5a5a75',marginBottom:8}}>记录经期</div>
          <div style={{display:'flex',gap:20}}>
            <div><div style={{fontSize:9,color:'#8a8aa8'}}>开始日期</div><div style={{fontSize:13,fontWeight:700,color:'#5a5a75',marginTop:2}}>{cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00').toLocaleDateString('zh-CN',{month:'long',day:'numeric'}):'未设置'}</div></div>
            <div><div style={{fontSize:9,color:'#8a8aa8'}}>周期长度</div><div style={{fontSize:13,fontWeight:700,color:'#5a5a75',marginTop:2}}>{cycleData?.cycleLength??28} 天</div></div>
          </div>
        </div>
        <div onClick={()=>onNav('profile')} style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#ffa7c4,#fdb5ee)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',cursor:'pointer',boxShadow:'0 4px 12px rgba(255,160,200,.35)'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>
        </div>
      </div>

      {/* 周期阶段总览 — Gemini connecting line */}
      <div style={{margin:'20px 24px 0',position:'relative',paddingBottom:16}}>
        <div onClick={()=>onNav('tips')} style={{fontSize:11,fontWeight:500,color:'rgba(255,255,255,.75)',marginBottom:12,display:'flex',alignItems:'center',gap:4,cursor:'pointer'}}>
          周期阶段总览 <ChevronRight size={12}/>
        </div>
        <div style={{position:'relative',padding:'0 8px'}}>
          <div style={{position:'absolute',top:16,left:20,right:20,height:2,background:'rgba(255,255,255,.35)',zIndex:0}}/>
          <div style={{display:'flex',justifyContent:'space-between',position:'relative',zIndex:1}}>
            {TL.map(t=>{
              const active=p===t.k;
              const Icon=t.icon;
              return(
                <div key={t.k} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                  <div style={{width:30,height:30,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .3s',
                    background:active?'#fff':'rgba(235,232,244,.55)',border:active?'2px solid #fff':'1px solid rgba(255,255,255,.55)',
                    boxShadow:active?'0 0 14px rgba(255,255,255,.7)':undefined,transform:active?'scale(1.1)':'scale(1)'}}>
                    <Icon size={14} color={active?t.c:'#a0a0b8'}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:active?500:400,color:active?'#5a5a75':'#8a8aa8'}}>{t.l}</span>
                  <span style={{fontSize:8,color:'#a0a0b8',transform:'scale(.9)'}}>{t.r}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
