import { useCycleContext } from '../context/CycleContext';

const I:Record<string,{e:string;l:string;d:string;v:number;s:string}>={
  menstrual:{e:'🌸',l:'经期',d:'内膜脱落，能量低谷。给自己更多休息和温暖，放缓节奏。',v:40,s:'能量低谷 · 温柔以待'},
  follicular:{e:'☀️',l:'卵泡期',d:'雌激素回升，精力情绪都在攀升。开始新项目、加强锻炼的好时机！',v:75,s:'稳步回升 · 日渐充盈'},
  ovulation:{e:'🌼',l:'排卵期',d:'LH 激素峰值，卵子即将释放。这是你一个月中状态最好的时刻！',v:95,s:'精力顶峰 · 自信开朗'},
  luteal:{e:'🍃',l:'黄体期',d:'孕酮升高，可能感到疲惫和情绪波动。降低强度，整理复盘更舒适。',v:55,s:'趋于内敛 · 放缓节奏'},
  unknown:{e:'🌸',l:'周期',d:'输入末次经期日期和周期长度，开始追踪你的身体节奏。',v:0,s:''},
};
const WD=['日','一','二','三','四','五','六'];

export default function HomeScreen(){
  const{phaseInfo,cycleData}=useCycleContext();
  const p=phaseInfo.phase;
  const d=I[p]??I.unknown;
  const n=new Date();

  return(
    <>
      <div className="hd">
        <div className="hd-row">
          <div>
            <div className="hd-date">{n.getMonth()+1}月{n.getDate()}日 · 周{WD[n.getDay()]}</div>
            <h1 className="hd-title">今天，了解你的<br/>身体状态</h1>
          </div>
          <button className="hd-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
          </button>
        </div>
      </div>

      <div className="pcard card">
        <div className="pcard-glow"/>
        <div style={{display:'flex',gap:12,alignItems:'flex-start',position:'relative',zIndex:1}}>
          <div className="pcard-icon">{d.e}</div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="pcard-name">{d.l}</span>
              <span className="pcard-badge">第 {phaseInfo.dayInCycle||'-'} 天</span>
            </div>
            <div className="pcard-sub">{d.s}</div>
            <div className="pcard-desc">{d.d}</div>
          </div>
        </div>
        <div className="ebar-w" style={{position:'relative',zIndex:1}}>
          <div className="ebar-l">
            <span style={{display:'flex',alignItems:'center',gap:4}}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
              今日能量
            </span>
            <span style={{color:'#fff',fontWeight:600,fontSize:11}}>{d.v}%</span>
          </div>
          <div className="ebar-b"><div className="ebar-f" style={{width:`${d.v}%`}}/></div>
        </div>
        <div className="stat-r" style={{position:'relative',zIndex:1}}>
          <div className="stat-b"><div className="stat-n">{phaseInfo.dayInCycle||'-'}</div><div className="stat-l">周期第几天</div></div>
          <div className="stat-b"><div className="stat-n">{phaseInfo.daysUntilNextPhase||'-'}</div><div className="stat-l">距下次经期</div></div>
          <div className="stat-b"><div className="stat-n">{cycleData?.cycleLength??28}</div><div className="stat-l">平均周期</div></div>
        </div>
      </div>

      <div className="qrow">
        {[{e:'🏃',l:'运动'},{e:'🥗',l:'饮食'},{e:'😴',l:'睡眠'},{e:'📝',l:'记录'}].map(a=>(
          <button key={a.l} className="qbtn"><span>{a.e}</span><span>{a.l}</span></button>
        ))}
      </div>

      <div className="plan">
        <div className="plan-hd"><h3>今日计划</h3><span className="plan-more">查看全部 ›</span></div>
        {[{i:'🧘',n:'晨间冥想',t:'07:30 · 10 分钟',d:true},{i:'🏋️',n:'适当运动',t:p==='menstrual'?'轻松散步 · 20 分钟':'18:00 · 30 分钟',d:false},{i:'📓',n:'症状记录',t:'随时记录',d:false}].map((x,k)=>(
          <div key={k} className="plan-it card">
            <div className="plan-ic">{x.i}</div>
            <div style={{flex:1}}><div className="plan-nm">{x.n}</div><div className="plan-tm">{x.t}</div></div>
            <div className={`plan-ck ${x.d?'done':'todo'}`}>
              {x.d&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
