import { useCycleContext } from '../context/CycleContext';
import { useDailyStatus } from '../hooks/useDailyStatus';

const LUT=14;const WD=['日','一','二','三','四','五','六'];
const DC:Record<string,string>={menstrual:'#F498B7',follicular:'#8BA8E0',ovulation:'#E85D75',luteal:'#FF9A76'};

/* 线条表情 + 底部填充精力 */
const MC=['#F498B7','#76C8A9','#BAC5F4','#FFAAA6'];
let _fid=0;
const Face=({mood,energy}:{mood:number;energy?:number})=>{
  const c=MC[mood]??'#6B7280';
  const pct=energy?energy/10:0;
  const uid=`fm${_fid++}`;
  return(
    <svg width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round">
      <defs><clipPath id={uid}><rect x="0" y={24-pct*24} width="24" height={pct*24}/></clipPath></defs>
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.3" fill="none"/>
      {energy!=null&&<circle cx="12" cy="12" r="10" fill={c} opacity="0.22" clipPath={`url(#${uid})`}/>}
      <circle cx="9" cy="10" r="1" fill={c} stroke="none"/>
      <circle cx="15" cy="10" r="1" fill={c} stroke="none"/>
      {mood===3&&<path d="M8 15s2 2 4 2 4-2 4-2" stroke={c} strokeWidth="1.3" fill="none"/>}
      {mood===2&&<path d="M8 16h8" stroke={c} strokeWidth="1.3" fill="none"/>}
      {mood===1&&<path d="M8 16h8" stroke={c} strokeWidth="1.3" fill="none" strokeDasharray="2 1"/>}
      {mood===0&&<path d="M9 16q3-2 6 0" stroke={c} strokeWidth="1.3" fill="none"/>}
    </svg>
  );
};
function gp(d:number,cl:number,pl:number):string{if(d<=0||d>cl)return'unknown';const fe=cl-LUT;if(d<=pl)return'menstrual';if(d<=fe)return'follicular';if(d===fe+1)return'ovulation';return'luteal';}

export default function InsightsScreen({onBack}:{onBack:()=>void}){
  const{phaseInfo,cycleData}=useCycleContext();
  const{getDay}=useDailyStatus();
  const now=new Date();const yr=now.getFullYear();const mo=now.getMonth()+1;
  const cl=cycleData?.cycleLength??28;const pl=cycleData?.periodLength??5;const fl=cl-LUT;
  const ld=cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00'):new Date(yr,now.getMonth(),now.getDate()-7);
  const fd=new Date(yr,mo-1,1);const sd=fd.getDay();const dim=new Date(yr,mo,0).getDate();
  const days:{d:number;ph:string;td:boolean;ds:string}[]=[];
  for(let i=0;i<sd;i++)days.push({d:0,ph:'unknown',td:false,ds:''});
  for(let d=1;d<=dim;d++){
    const dt=new Date(yr,mo-1,d);const diff=Math.floor((dt.getTime()-ld.getTime())/86400000);
    const doc=((diff%cl)+cl)%cl+1;
    const ds=`${yr}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    days.push({d,ph:gp(doc,cl,pl),td:dt.toDateString()===now.toDateString(),ds});
  }
  const cdoc=phaseInfo.dayInCycle;const dtnp=cdoc>0?cl-cdoc+1:0;const np=new Date(now);np.setDate(now.getDate()+dtnp);const fmt=(d:Date)=>`${d.getMonth()+1}月${d.getDate()}日`;
  const hist=[26,28,29,28,27,cl];const mx=Math.max(...hist,30);
  const segs=[{l:'经期',f:pl,c:'#F498B7'},{l:'卵泡期',f:fl-pl,c:'#8BA8E0'},{l:'排卵期',f:1,c:'#E85D75'},{l:'黄体期',f:LUT,c:'#FF9A76'}];

  return(
    <>
      <div className="sbar" style={{marginBottom:12}}>
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 5L2 13l8 8M2 13h20"/></svg>
          日历与数据
        </button>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:20,borderRadius:24}}>
        <div style={{fontSize:14,fontWeight:700,color:'var(--txt1)',marginBottom:16}}>周期日历</div>
        <div className="cal-wd">{WD.map(w=><span key={w}>{w}</span>)}</div>
        <div className="cal-grid">
          {days.map((d,i)=>{
            const s=d.ds?getDay(d.ds):null;
            return(
            <div key={i} className={`cal-d${d.td?' today':''}${d.d===0?' dim':''}`}>
              <span className="cal-num" style={d.d>0?{color:DC[d.ph]??'var(--txt2)'}:{}}>{d.d>0?d.d:''}</span>
              {d.d>0&&(s
                ?<div style={{width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center'}}><Face mood={s.mood} energy={s.energy}/></div>
                :<div className="cal-dot" style={{background:'var(--txt2)',opacity:.3}}/>
              )}
            </div>
          );})}
        </div>
        <div className="cal-leg">
          <span><div style={{width:8,height:8,borderRadius:'50%',background:'#F498B7',display:'inline-block',marginRight:4}}/>经期</span>
          <span><div style={{width:8,height:8,borderRadius:'50%',background:'#8BA8E0',display:'inline-block',marginRight:4}}/>卵泡期</span>
          <span><div style={{width:10,height:10,borderRadius:'50%',border:'2px solid #E85D75',background:'#fff',display:'inline-block',marginRight:4}}/>排卵期</span>
          <span><div style={{width:8,height:8,borderRadius:'50%',background:'#FF9A76',display:'inline-block',marginRight:4}}/>黄体期</span>
        </div>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:20,borderRadius:24}}>
        <div style={{fontSize:14,fontWeight:700,color:'var(--txt1)',marginBottom:16}}>数据洞察</div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
          <div><div style={{fontSize:11,color:'var(--txt3)'}}>本周时长</div><div style={{fontSize:18,fontWeight:700,color:'var(--txt1)'}}>{cl} 天</div></div>
          <div style={{textAlign:'right'}}><div style={{fontSize:11,color:'var(--txt3)'}}>周期趋势</div><div style={{fontSize:14,fontWeight:700,color:'var(--mint)'}}>稳定 ›</div></div>
        </div>
        <svg viewBox="0 0 260 50" style={{width:'100%',height:44}}>
          <path d="M0 35 Q50 25,100 30 T180 15 T260 25" fill="none" stroke="#BAC5F4" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="100" cy="30" r="4" fill="#F498B7"/><circle cx="180" cy="15" r="4" fill="#BAC5F4"/><circle cx="260" cy="25" r="4" fill="#BAC5F4"/>
        </svg>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,fontWeight:500,color:'var(--txt3)',marginTop:4}}>
          <span>3/25</span><span>4/22</span><span>5/20</span>
        </div>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:20,borderRadius:24}}>
        <div style={{fontSize:14,fontWeight:700,color:'var(--txt1)',marginBottom:16}}>阶段分布与预测</div>
        <div style={{display:'flex',marginBottom:16}}>
          {segs.map(s=>(
            <div key={s.l} style={{flex:s.f,display:'flex',flexDirection:'column',alignItems:'center',minWidth:0}}>
              <div style={{width:'100%',height:12,borderRadius:6,background:s.c,marginBottom:4}}/>
              <span style={{fontSize:8,color:'var(--txt3)',whiteSpace:'nowrap'}}>{s.l} {s.f}d</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:8}}>
          <div className="stat-b"><div className="stat-n" style={{fontSize:12}}>{fmt(np)}</div><div className="stat-l">下次经期</div></div>
          <div className="stat-b"><div className="stat-n" style={{fontSize:12}}>{cl}天</div><div className="stat-l">平均周期</div></div>
          <div className="stat-b"><div className="stat-n" style={{fontSize:12}}>{pl}天</div><div className="stat-l">经期时长</div></div>
        </div>
      </div>
    </>
  );
}
