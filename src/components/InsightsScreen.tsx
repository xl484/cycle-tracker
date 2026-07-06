import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
import { useDailyStatus } from '../hooks/useDailyStatus';
import { Smile, Meh, Frown, Activity, PersonStanding, Dumbbell, Leaf, Mountain, Plus, X } from 'lucide-react';

const LUT=14;const WD=['日','一','二','三','四','五','六'];
const DC:Record<string,string>={menstrual:'#F498B7',follicular:'#8BA8E0',ovulation:'#E85D75',luteal:'#FF9A76'};
const MC=['#F498B7','#76C8A9','#BAC5F4','#FFAAA6'];
let _fid=0;
const Face=({mood,energy}:{mood:number;energy?:number})=>{const c=MC[mood]??'#6B7280';const pct=energy?energy/10:0;const uid=`fm${_fid++}`;return(<svg width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round"><defs><clipPath id={uid}><rect x="0" y={24-pct*24} width="24" height={pct*24}/></clipPath></defs><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.3" fill="none"/>{energy!=null&&<circle cx="12" cy="12" r="10" fill={c} opacity="0.22" clipPath={`url(#${uid})`}/>}<circle cx="9" cy="10" r="1" fill={c} stroke="none"/><circle cx="15" cy="10" r="1" fill={c} stroke="none"/>{mood===3&&<path d="M8 15s2 2 4 2 4-2 4-2" stroke={c} strokeWidth="1.3" fill="none"/>}{mood===2&&<path d="M8 16h8" stroke={c} strokeWidth="1.3" fill="none"/>}{mood===1&&<path d="M8 16h8" stroke={c} strokeWidth="1.3" fill="none" strokeDasharray="2 1"/>}{mood===0&&<path d="M9 16q3-2 6 0" stroke={c} strokeWidth="1.3" fill="none"/>}</svg>);};
function gp(d:number,cl:number,pl:number):string{if(d<=0||d>cl)return'unknown';const fe=cl-LUT;if(d<=pl)return'menstrual';if(d<=fe)return'follicular';if(d===fe+1)return'ovulation';return'luteal';}

const MOODS=[{k:3,label:'开心',icon:Smile,c:'#af90e8'},{k:2,label:'平静',icon:Smile,c:'#8da6f9'},{k:1,label:'疲惫',icon:Meh,c:'#84c9b9'},{k:-1,label:'焦虑',icon:(props:any)=><svg width={props.size||16} height={props.size||16} viewBox="0 0 24 24" fill="none" stroke={props.color||'currentColor'} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="10" r="1" fill={props.color||'currentColor'} stroke="none"/><circle cx="15" cy="10" r="1" fill={props.color||'currentColor'} stroke="none"/><circle cx="12" cy="16" r="2.5"/></svg>,c:'#f5bc8c'},{k:0,label:'低落',icon:Frown,c:'#f584a7'}];
const SPORTS=[{id:'yoga',label:'瑜伽',icon:Leaf},{id:'run',label:'跑步',icon:PersonStanding},{id:'strength',label:'力量训练',icon:Dumbbell},{id:'walk',label:'散步',icon:PersonStanding},{id:'tennis',label:'网球',icon:(props:any)=><svg width={props.size||11} height={props.size||11} viewBox="0 0 24 24" fill="none" stroke={props.color||'currentColor'} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="7"/><path d="M6 7q6 3 12 0 M6 17q6-3 12 0"/></svg>},{id:'hike',label:'爬山',icon:Mountain}];

export default function InsightsScreen({onBack}:{onBack:()=>void}){
  const{phaseInfo,cycleData,saveCycleData}=useCycleContext();
  const{getDay,setToday}=useDailyStatus();
  const[corr,setCorr]=useState<'start'|'end'|null>(null);
  const[selMood,setSelMood]=useState(2);const[energy,setEnergy]=useState(7);
  const[selSports,setSelSports]=useState<string[]>([]);const[showAdd,setShowAdd]=useState(false);const[addText,setAddText]=useState('');
  const[customSports,setCustomSports]=useState<{id:string;label:string}[]>([]);const[saved,setSaved]=useState(false);

  const now=new Date();const[yr,setYr]=useState(now.getFullYear());const[mo,setMo]=useState(now.getMonth()+1);
  const prevMonth=()=>{if(mo===1){setYr(yr-1);setMo(12)}else setMo(mo-1);};
  const nextMonth=()=>{if(mo===12){setYr(yr+1);setMo(1)}else setMo(mo+1);};
  const cl=cycleData?.cycleLength??28;const pl=cycleData?.periodLength??5;
  const ld=cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00'):new Date(yr,now.getMonth(),now.getDate()-7);
  const fd=new Date(yr,mo-1,1);const sd=fd.getDay();const dim=new Date(yr,mo,0).getDate();
  const days:{d:number;ph:string;td:boolean;ds:string}[]=[];
  for(let i=0;i<sd;i++)days.push({d:0,ph:'unknown',td:false,ds:''});
  for(let d=1;d<=dim;d++){const dt=new Date(yr,mo-1,d);const diff=Math.floor((dt.getTime()-ld.getTime())/86400000);const doc=((diff%cl)+cl)%cl+1;const ds=`${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;days.push({d,ph:gp(doc,cl,pl),td:dt.toDateString()===now.toDateString(),ds});}

  const allSports=[...SPORTS,...customSports];
  const toggleSport=(id:string)=>{setSelSports(prev=>prev.includes(id)?prev.filter(s=>s!==id):[...prev,id]);};
  const handleAdd=()=>{if(addText.trim()){const id=`c_${Date.now()}`;setCustomSports(prev=>[...prev,{id,label:addText.trim(),icon:Activity}]);setSelSports(prev=>[...prev,id]);setAddText('');setShowAdd(false);}};
  const getSportLabel=(id:string)=>allSports.find(s=>s.id===id)?.label||'';
  const handleSave=()=>{const sportLabels=selSports.map(getSportLabel).filter(Boolean);setToday({mood:selMood,energy,sports:sportLabels});setSaved(true);setTimeout(()=>setSaved(false),2000);};

  const glass={background:'rgba(255,255,255,.3)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,.45)',borderTop:'1px solid rgba(255,255,255,.55)',boxShadow:'0 6px 24px rgba(100,100,150,.06)'};

  return(<>
    <div className="sbar" style={{marginBottom:10}}>
      <button className="back-btn" onClick={onBack}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 5L2 13l8 8M2 13h20"/></svg>日历与数据</button>
    </div>

    <div className="sroll" style={{paddingBottom:20}}>
      {/* 1. 今日记录 */}
      <div style={{margin:'0 24px 16px',padding:20,borderRadius:24,...glass}}>
        <div style={{fontSize:12,fontWeight:600,color:'#5a5a75',marginBottom:10}}>今日记录</div>
        <div style={{fontSize:10,color:'#7a7a9a',marginBottom:10}}>感觉如何？</div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
          {MOODS.map(mo=>{const active=selMood===mo.k;const Icon=mo.icon;
            return(<div key={mo.k} onClick={()=>setSelMood(mo.k)} style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',gap:3}}>
              <div style={{width:34,height:34,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .3s',background:active?`linear-gradient(135deg,${mo.c},${mo.c}cc)`:'rgba(255,255,255,.35)',border:active?`2px solid ${mo.c}`:'1px solid rgba(255,255,255,.45)',boxShadow:active?`0 4px 10px ${mo.c}33`:undefined,transform:active?'scale(1.08)':'scale(1)'}}><Icon size={16} color={active?'#fff':'#8a8aa8'}/></div>
              <span style={{fontSize:9,color:active?'#5a5a75':'#8a8aa8',fontWeight:active?600:400}}>{mo.label}</span>
            </div>);})}
        </div>

        <div style={{fontSize:10,color:'#7a7a9a',marginBottom:8}}>今日运动</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:8}}>
          {allSports.map(s=>{const active=selSports.includes(s.id);const Icon=s.icon;
            return(<button key={s.id} onClick={()=>toggleSport(s.id)} style={{display:'flex',alignItems:'center',gap:3,padding:'3px 9px',borderRadius:16,border:active?'1px solid #af90e8':'1px solid rgba(255,255,255,.35)',background:active?'rgba(255,255,255,.6)':'rgba(255,255,255,.15)',color:active?'#5a5a75':'#8a8aa8',fontSize:10,fontWeight:active?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all .2s'}}><Icon size={11} color={active?'#af90e8':'#a0a0b8'}/>{s.label}</button>);})}
          {!showAdd&&<button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:3,padding:'3px 9px',borderRadius:16,border:'1px dashed rgba(0,0,0,.12)',background:'transparent',color:'#8a8aa8',fontSize:10,cursor:'pointer',fontFamily:'inherit'}}><Plus size={10}/>其他</button>}
        </div>
        {showAdd&&<div style={{display:'flex',gap:4,marginBottom:8}}>
          <input value={addText} onChange={e=>setAddText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleAdd()} placeholder="运动名称..." style={{flex:1,padding:'4px 8px',borderRadius:12,border:'1px solid rgba(0,0,0,.08)',fontSize:10,fontFamily:'inherit',background:'rgba(255,255,255,.4)',outline:'none'}}/>
          <button onClick={handleAdd} style={{padding:'4px 10px',borderRadius:12,border:'none',background:'linear-gradient(90deg,#af90e8,#d4bcf9)',color:'#fff',fontSize:10,cursor:'pointer',fontFamily:'inherit'}}>确认</button>
          <button onClick={()=>{setShowAdd(false);setAddText('');}} style={{padding:'4px 6px',borderRadius:12,border:'none',background:'rgba(255,255,255,.4)',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center'}}><X size={11} color="#8a8aa8"/></button>
        </div>}

        <div style={{marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:10,color:'#5a5a75',fontWeight:500}}>精力水平</span><span style={{fontSize:10,color:'#8a8aa8',fontWeight:600}}>{energy}</span></div>
          <input type="range" min="1" max="10" value={energy} onChange={e=>setEnergy(Number(e.target.value))}
            style={{width:'100%',height:7,appearance:'none',WebkitAppearance:'none',background:'rgba(255,255,255,.35)',borderRadius:4,outline:'none',cursor:'pointer',accentColor:'#af90e8'}}/>
        </div>
        <button onClick={handleSave} style={{width:'100%',padding:11,borderRadius:22,border:'none',background:saved?'#84c9b9':'linear-gradient(90deg,#fcaecb,#cbbcf6)',color:'#fff',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 14px rgba(200,160,220,.2)'}}>{saved?'✓ 已保存':'保存'}</button>
      </div>

      {/* 2. 日历 */}
      <div style={{margin:'0 24px 16px',padding:16,borderRadius:24,...glass}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <button onClick={prevMonth} style={{border:'none',background:'none',fontSize:18,color:'#a0a0b8',cursor:'pointer',padding:'0 4px'}}>‹</button>
          <span style={{fontSize:14,fontWeight:700,color:'#5a5a75'}}>{yr}年 {mo}月</span>
          <button onClick={nextMonth} style={{border:'none',background:'none',fontSize:18,color:'#a0a0b8',cursor:'pointer',padding:'0 4px'}}>›</button>
          <div style={{display:'flex',gap:4}}>
            <button onClick={()=>setCorr(corr==='start'?null:'start')} style={{fontSize:9,padding:'3px 8px',borderRadius:8,border:'1px solid rgba(0,0,0,0.06)',background:corr==='start'?'#af90e8':'transparent',color:corr==='start'?'#fff':'#a0a0b8',cursor:'pointer',fontFamily:'inherit'}}>{corr==='start'?'选择中':'校正开始日'}</button>
            <button onClick={()=>setCorr(corr==='end'?null:'end')} style={{fontSize:9,padding:'3px 8px',borderRadius:8,border:'1px solid rgba(0,0,0,0.06)',background:corr==='end'?'#af90e8':'transparent',color:corr==='end'?'#fff':'#a0a0b8',cursor:'pointer',fontFamily:'inherit'}}>{corr==='end'?'选择中':'校正结束日'}</button>
          </div>
        </div>
        {corr&&<div style={{fontSize:9,color:'#af90e8',textAlign:'center',marginBottom:6}}>点击日期完成校正</div>}
        <div className="cal-wd">{WD.map(w=><span key={w}>{w}</span>)}</div>
        <div className="cal-grid">
          {days.map((d,i)=>{const s=d.ds?getDay(d.ds):null;const canSet=corr&&d.ds;
            return(<div key={i} className={`cal-d${d.td?' today':''}${d.d===0?' dim':''}`} onClick={()=>{if(!canSet)return;if(corr==='start'){saveCycleData({lastPeriodDate:d.ds,cycleLength:cycleData?.cycleLength||28,periodLength:cycleData?.periodLength||5});}if(corr==='end'){const start=new Date((cycleData?.lastPeriodDate||d.ds)+'T00:00:00');const end=new Date(d.ds+'T00:00:00');const diff=Math.round((end.getTime()-start.getTime())/86400000)+1;if(diff>=2&&diff<=10)saveCycleData({lastPeriodDate:cycleData?.lastPeriodDate||d.ds,cycleLength:cycleData?.cycleLength||28,periodLength:diff});}setCorr(null);}} style={canSet?{cursor:'pointer',borderRadius:12,background:corr==='start'?'rgba(244,152,183,.1)':'rgba(168,230,207,.1)'}:{}}>
              <span className="cal-num" style={d.d>0?{color:DC[d.ph]??'#5a5a75'}:{}}>{d.d>0?d.d:''}</span>
              {d.d>0&&(s?<div style={{width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center'}}><Face mood={s.mood} energy={s.energy}/></div>:<div className="cal-dot" style={{background:'#a0a0b8',opacity:.25}}/>)}
            </div>);})}
        </div>
        <div className="cal-leg">
          <span><div style={{width:7,height:7,borderRadius:'50%',background:'#fbaecf',display:'inline-block',marginRight:3}}/>经期</span>
          <span><div style={{width:7,height:7,borderRadius:'50%',background:'#d8cbf9',display:'inline-block',marginRight:3}}/>卵泡期</span>
          <span><div style={{width:7,height:7,borderRadius:'50%',background:'#af90e8',display:'inline-block',marginRight:3}}/>排卵期</span>
          <span><div style={{width:7,height:7,borderRadius:'50%',background:'#fce6c5',display:'inline-block',marginRight:3}}/>黄体期</span>
        </div>
      </div>

      {/* 3. 一周运动记录 */}
      <div style={{margin:'0 24px 16px',padding:16,borderRadius:24,...glass}}>
        <div style={{fontSize:13,fontWeight:700,color:'#5a5a75',marginBottom:10}}>一周运动记录</div>
        {(()=>{
          const week:{d:string;w:string;sports:string[];hasRec:boolean}[]=[];
          for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const ds=d.toISOString().slice(0,10);const s=getDay(ds);const wd=['日','一','二','三','四','五','六'];week.push({d:`${d.getMonth()+1}/${d.getDate()}`,w:wd[d.getDay()],sports:s?.sports||[],hasRec:!!s});}
          const has=week.filter(w=>w.sports.length>0);
          return(<div>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:8}}><span style={{fontSize:10,color:'#7a7a9a',fontWeight:500}}>本周 · {has.length}天运动</span></div>
            <div style={{display:'flex',gap:4}}>
              {week.map((w,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{minHeight:64,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',gap:2}}>
                    {w.sports.map((sp,j)=><span key={j} style={{fontSize:8,color:'#5a5a75',fontWeight:500,lineHeight:1.2}}>{sp}</span>)}
                    {w.hasRec&&w.sports.length===0&&<span style={{fontSize:8,color:'#a0a0b8'}}>休息</span>}
                    {!w.hasRec&&<span style={{fontSize:8,color:'#ccc'}}>—</span>}
                  </div>
                  <div style={{width:'100%',height:w.hasRec?3:2,borderRadius:2,background:w.hasRec?'#af90e8':'rgba(0,0,0,.06)'}}/>
                  <span style={{fontSize:8,color:'#a0a0b8'}}>{w.w}</span>
                  <span style={{fontSize:7,color:'#a0a0b8'}}>{w.d}</span>
                </div>
              ))}
            </div>
          </div>);
        })()}
      </div>
    </div>
  </>);
}
