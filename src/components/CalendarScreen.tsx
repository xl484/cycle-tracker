import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';

const LUT=14;
const WD=['日','一','二','三','四','五','六'];
const DC:Record<string,string>={menstrual:'#e87ca0',follicular:'#9b7fd4',ovulation:'#d4a020',luteal:'#4db89a'};
const MI:Record<string,{e:string;l:string;d:string}>={
  menstrual:{e:'🌸',l:'经期',d:'内膜脱落，能量低谷，适合放缓节奏。'},
  follicular:{e:'☀️',l:'卵泡期',d:'雌激素回升，精力情绪都在攀升。'},
  ovulation:{e:'🌼',l:'排卵期',d:'LH 激素峰值，卵子即将释放。状态最好的时刻！'},
  luteal:{e:'🍃',l:'黄体期',d:'孕酮升高，可能疲惫。降低强度。'},
  unknown:{e:'🌸',l:'周期',d:''},
};
function gp(d:number,cl:number,pl:number):string{
  if(d<=0||d>cl)return'unknown';
  const fe=cl-LUT;
  if(d<=pl)return'menstrual';if(d<=fe)return'follicular';if(d===fe+1)return'ovulation';return'luteal';
}

export default function CalendarScreen(){
  const{phaseInfo,cycleData}=useCycleContext();
  const now=new Date();
  const[yr,setYr]=useState(now.getFullYear());
  const[mo,setMo]=useState(now.getMonth()+1);
  const cl=cycleData?.cycleLength??28;
  const pl=cycleData?.periodLength??5;
  const ld=cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00'):new Date(now.getFullYear(),now.getMonth(),now.getDate()-7);

  const prv=()=>{if(mo===1){setYr(yr-1);setMo(12)}else setMo(mo-1);};
  const nxt=()=>{if(mo===12){setYr(yr+1);setMo(1)}else setMo(mo+1);};
  const fd=new Date(yr,mo-1,1);const sd=fd.getDay();const dim=new Date(yr,mo,0).getDate();
  const days:{d:number;ph:string;td:boolean}[]=[];
  for(let i=0;i<sd;i++)days.push({d:0,ph:'unknown',td:false});
  for(let d=1;d<=dim;d++){
    const dt=new Date(yr,mo-1,d);const diff=Math.floor((dt.getTime()-ld.getTime())/86400000);
    const doc=((diff%cl)+cl)%cl+1;days.push({d,ph:gp(doc,cl,pl),td:dt.toDateString()===now.toDateString()});
  }

  const cdoc=phaseInfo.dayInCycle;const dtnp=cdoc>0?cl-cdoc+1:0;
  const np=new Date(now);np.setDate(now.getDate()+dtnp);
  const fe=cl-LUT;const dtov=cdoc>0&&cdoc<=fe?fe+1-cdoc:(fe+1+cl-cdoc);
  const no=new Date(now);no.setDate(now.getDate()+dtov);
  const tm=MI[phaseInfo.phase]??MI.unknown;
  const fmt=(d:Date)=>`${d.getMonth()+1}月${d.getDate()}日`;

  return(
    <>
      <div className="hd" style={{paddingTop:4}}>
        <div className="hd-row">
          <h1 className="hd-title" style={{margin:0}}>周期日历</h1>
          <button className="hd-btn" style={{width:28,height:28}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14 M12 5v14"/></svg>
          </button>
        </div>
      </div>

      <div className="mnav"><button onClick={prv}>‹</button><span>{yr}年 {mo}月</span><button onClick={nxt}>›</button></div>
      <div className="leg">{[{c:'#e87ca0',l:'经期'},{c:'#9b7fd4',l:'卵泡期'},{c:'#d4a020',l:'排卵期'},{c:'#4db89a',l:'黄体期'}].map(x=><span key={x.l}><div className="leg-d" style={{background:x.c}}/>{x.l}</span>)}</div>

      <div className="cal-grid">
        <div className="cal-wd">{WD.map(w=><span key={w}>{w}</span>)}</div>
        <div className="cal-days">
          {days.map((d,i)=>(
            <div key={i} className={`cday${d.td?' today':''}`}>
              {d.d>0&&<><span>{d.d}</span><div className="cday-dot" style={{background:DC[d.ph]??'#ccc'}}/></>}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{margin:'10px 12px',padding:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <span style={{color:'#fff',fontWeight:600,fontSize:12}}>今天 · {now.getMonth()+1}月{now.getDate()}日 · {tm.l}</span>
          <div style={{width:16,height:16,borderRadius:'50%',background:DC[phaseInfo.phase]??'#ccc'}}/>
        </div>
        <div style={{color:'rgba(255,255,255,.65)',fontSize:10,lineHeight:1.5}}>{tm.d}</div>
        <div style={{display:'flex',gap:8,marginTop:10}}>
          {[{e:'🏃',l:'运动打卡'},{e:'📝',l:'症状记录'},{e:'💊',l:'用药提醒'}].map(a=>(<button key={a.l} className="qbtn" style={{flex:1,padding:'6px 0'}}><span>{a.e}</span><span>{a.l}</span></button>))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.15)',marginTop:10,paddingTop:8}}>
          <div style={{color:'rgba(255,255,255,.6)',fontSize:10,marginBottom:6}}>周期预测</div>
          <div style={{display:'flex',gap:8}}>
            <div className="stat-b"><div className="stat-n" style={{fontSize:11}}>{fmt(np)}</div><div className="stat-l">下次经期</div></div>
            <div className="stat-b"><div className="stat-n" style={{fontSize:11}}>{fmt(no)}</div><div className="stat-l">排卵预测</div></div>
          </div>
        </div>
      </div>
    </>
  );
}
