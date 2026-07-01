import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
import { getGuidance } from '../utils/guidanceContent';
import { Activity, Smile, Moon, Zap, Sparkles, ChevronRight, Droplet, Sun, Wind } from 'lucide-react';


const GUIDE_ICONS=[{c:'#af90e8',icon:Zap},{c:'#8da6f9',icon:Activity},{c:'#8BA8E0',icon:Moon},{c:'#f5bc8c',icon:Smile},{c:'#f0a0c0',icon:Sparkles}];

export default function TipsScreen({initialCat,onBack}:{initialCat?:string;onBack:()=>void}){
  const{phaseInfo,cycleData}=useCycleContext();
  const[expanded,setExpanded]=useState<string|null>(initialCat||null);
  const p=phaseInfo.phase;const cl=cycleData?.cycleLength??28;
  const items=getGuidance(p);

  const META:Record<string,{e:string;l:string;d:string}>={
    menstrual:{e:'●',l:'经期',d:'内膜脱落，能量处于低谷。给自己更多休息和温暖，放缓节奏。'},
    follicular:{e:'◉',l:'卵泡期',d:'雌激素回升，精力和情绪攀升。适合开启新计划、加强锻炼。'},
    ovulation:{e:'◎',l:'排卵期',d:'魅力四射、能量较高。身体和情绪稳定，适合拓展社交。'},
    luteal:{e:'○',l:'黄体期',d:'孕酮升高可能带来疲惫。降低强度，整理和复盘会更舒适。'},
    unknown:{e:'●',l:'周期',d:''},
  };
  const m=META[p]??META.unknown;

  const summaries:Record<string,string>={
    exercise:p==='menstrual'?'散步 / 温和瑜伽':p==='follicular'?'跑步 / 力量训练':p==='ovulation'?'HIIT / 大重量':'普拉提 / 散步',
    diet:p==='menstrual'?'补铁 / 温热食物':p==='follicular'?'蛋白 / 发酵食品':p==='ovulation'?'蔬果 / 抗氧化物':'复合碳水 / 补镁',
    sleep:p==='menstrual'?'早睡 / 热敷助眠':p==='follicular'?'规律作息 / 晨光':p==='ovulation'?'7-8h / 少屏幕':'凉爽卧室 / 薰衣草',
    mood:p==='menstrual'?'内省 / 降低社交':p==='follicular'?'设定目标 / 社交':p==='ovulation'?'沟通 / 表达自我':'独处 / 减少决策',
    skincare:p==='menstrual'?'温和保湿 / 修护':p==='follicular'?'VC精华 / 温和刷酸':p==='ovulation'?'保持日常护理':'控油抗痘 / 补锌',
  };

  return(
    <>
      <div className="sbar" style={{marginBottom:8}}>
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 5L2 13l8 8M2 13h20"/></svg>
          阶段指引
        </button>
      </div>

      <div className="sroll" style={{paddingBottom:20}}>
        {/* 阶段头部 */}
        <div style={{margin:'0 24px 16px',padding:'20px 18px',borderRadius:24,
          background:'rgba(255,255,255,.3)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,.45)',borderTop:'1px solid rgba(255,255,255,.55)',
          boxShadow:'0 6px 24px rgba(100,100,150,.06)',display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:48,height:48,borderRadius:'50%',flexShrink:0,
            background:'linear-gradient(135deg,rgba(255,255,255,.6),rgba(200,180,255,.35))',
            boxShadow:'inset -3px -3px 8px rgba(255,255,255,.4),inset 3px 3px 8px rgba(255,255,255,.8),0 8px 16px rgba(120,110,200,.1)',
            border:'1px solid rgba(255,255,255,.7)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {p==='menstrual'?<Droplet size={20} color="#ffa7c4"/>:p==='follicular'?<Sun size={20} color="#c6b4f9"/>:p==='ovulation'?<Activity size={20} color="#af90e8"/>:p==='luteal'?<Wind size={20} color="#f5d09b"/>:<Activity size={20} color="#5a5a75"/>}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:'#5a5a75'}}>{m.l}</div>
            <div style={{fontSize:11,fontWeight:500,color:'#8a8aa8'}}>第 {phaseInfo.dayInCycle||'-'} 天 / 共 {cl} 天</div>
          </div>
        </div>

        <div style={{margin:'0 24px'}}>
          <div style={{fontSize:11,color:'#8a8aa8',lineHeight:1.7,marginBottom:16}}>{m.d}</div>
        </div>

        {/* 4个可展开指引 */}
        <div style={{margin:'0 24px'}}>
          {items.map((g,i)=>{
            const isOpen=expanded===g.category;
            const gi=GUIDE_ICONS[i];
            const Icon=gi.icon;
            const summary=summaries[g.category]||'';
            return(
              <div key={g.id} style={{marginBottom:8,
                background:'rgba(255,255,255,.3)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,.45)',borderRadius:20,
                boxShadow:'0 4px 16px rgba(100,100,150,.05)',overflow:'hidden',transition:'all .3s'}}>
                <div onClick={()=>setExpanded(isOpen?null:g.category)}
                  style={{padding:14,display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flex:1}}>
                    <div style={{width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                      background:'linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.15))',
                      border:'1px solid rgba(255,255,255,.5)',position:'relative'}}>
                      <div style={{position:'absolute',inset:0,borderRadius:'50%',background:gi.c,opacity:.12}}/>
                      <Icon size={16} color={gi.c}/>
                      <div style={{position:'absolute',top:2,right:3,width:5,height:5,borderRadius:'50%',background:'rgba(255,255,255,.7)'}}/>
                    </div>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:700,color:'#5a5a75'}}>{g.title}</div>
                      <div style={{fontSize:10,color:gi.c,fontWeight:500,marginTop:1}}>{summary}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#a0a0b8" style={{transform:isOpen?'rotate(90deg)':'rotate(0)',transition:'transform .3s',flexShrink:0}}/>
                </div>
                {isOpen&&<div style={{padding:'0 14px 14px',borderTop:'1px solid rgba(255,255,255,.2)'}}>
                  <p style={{fontSize:11,color:'#5a5a75',lineHeight:1.7,margin:0,paddingTop:10,whiteSpace:'pre-line'}}>{g.content}</p>
                </div>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
