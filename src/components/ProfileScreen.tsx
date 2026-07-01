import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';
const PL:Record<string,string>={menstrual:'● 当前 · 经期',follicular:'◉ 当前 · 卵泡期',ovulation:'◎ 当前 · 排卵期',luteal:'○ 当前 · 黄体期',unknown:'● 当前'};

export default function ProfileScreen({onBack}:{onBack:()=>void}){
  const{cycleData,phaseInfo,saveCycleData}=useCycleContext();
  const[ed,setEd]=useState<'date'|'cycle'|'period'|null>(null);
  const[nOn,setNOn]=useState(true);const[lOn,setLOn]=useState(true);

  const handleExport=()=>{
    if(!cycleData)return;
    const daily=JSON.parse(localStorage.getItem('daily-status')||'{}');
    const data={cycleData,dailyStatus:daily};
    const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='cycle-data.json';a.click();URL.revokeObjectURL(u);
  };

  return(
    <>
      <div className="sbar" style={{marginBottom:16}}>
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 5L2 13l8 8M2 13h20"/></svg>
          我的
        </button>
      </div>

      <div style={{textAlign:'center',marginBottom:20}}>
        <div style={{width:56,height:56,borderRadius:'50%',margin:'0 auto 8px',
          background:'linear-gradient(135deg,#BAC5F4,#E5BAF5)',
          display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:22,fontWeight:600}}>L</div>
        <div style={{fontSize:14,fontWeight:600,color:'var(--txt1)'}}>Hi, Luna</div>
        <div style={{fontSize:11,fontWeight:500,color:'var(--pink)',marginTop:2}}>{PL[phaseInfo.phase]??PL.unknown}</div>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:12}}>
        <div style={{fontSize:11,fontWeight:600,color:'var(--txt2)',marginBottom:8}}>周期设置</div>
        {[
          {k:'date',l:'月经开始日期',v:cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00').toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'}):'未设置',d:'M3 4h18v18H3z M3 10h18 M8 2v4 M16 2v4'},
          {k:'cycle',l:'平均周期长度',v:`${cycleData?.cycleLength??28} 天`,d:'M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9 M12 7v5l3 3'},
          {k:'period',l:'经期持续时长',v:`${cycleData?.periodLength??5} 天`,d:'M12 2v20 M2 12h20'},
        ].map(r=>(
          <div key={r.k} className="setting-row" onClick={()=>setEd(r.k as any)}>
            <span style={{display:'flex',alignItems:'center',gap:8}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={r.d}/></svg>
              {r.l}</span>
            <span style={{fontWeight:500,color:'var(--txt1)',display:'flex',alignItems:'center',gap:4}}>{r.v}<span style={{color:'var(--txt3)'}}>›</span></span>
          </div>
        ))}
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:12}}>
        <div style={{fontSize:11,fontWeight:600,color:'var(--txt2)',marginBottom:8}}>隐私与数据</div>
        <div className="setting-row">
          <div>
            <span style={{display:'flex',alignItems:'center',gap:8}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
              推送提醒</span>
            <div style={{fontSize:9,color:'var(--txt3)',marginTop:2,marginLeft:22}}>排卵期 · 经前期提醒</div>
          </div>
          <button className={`tgl-sw ${nOn?'on':''}`} onClick={()=>setNOn(!nOn)}><div className="kn" style={{left:nOn?20:2}}/></button>
        </div>
        <div className="setting-row">
          <div>
            <span style={{display:'flex',alignItems:'center',gap:8}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
              本地优先存储</span>
            <div style={{fontSize:9,color:'var(--txt3)',marginTop:2,marginLeft:22}}>数据隐私 · 本地加密 · 不共享</div>
          </div>
          <button className={`tgl-sw ${lOn?'on':''}`} onClick={()=>setLOn(!lOn)}><div className="kn" style={{left:lOn?20:2}}/></button>
        </div>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:12}}>
        <div className="menu-row" onClick={handleExport}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12"/></svg>
          <span style={{flex:1,fontWeight:500,color:'var(--txt1)'}}>导出数据</span>
          <span style={{color:'var(--txt3)',fontSize:14}}>›</span>
        </div>
      </div>

      {ed&&(
        <div className="modal-bg" onClick={()=>setEd(null)}>
          <div className="modal-sh" onClick={e=>e.stopPropagation()}>
            <h3>{ed==='date'?'末次经期':ed==='cycle'?'平均周期长度':'经期持续时长'}</h3>
            {ed==='date'?(
              <input type="date" value={cycleData?.lastPeriodDate??''} max={new Date().toISOString().slice(0,10)}
                onChange={e=>saveCycleData({...cycleData!,lastPeriodDate:e.target.value})}/>
            ):(
              <div>
                <div className="big-num">{ed==='cycle'?(cycleData?.cycleLength??28):(cycleData?.periodLength??5)}</div>
                <input type="range" min={ed==='cycle'?21:2} max={ed==='cycle'?45:10}
                  value={ed==='cycle'?(cycleData?.cycleLength??28):(cycleData?.periodLength??5)}
                  onChange={e=>{const v=Number(e.target.value);ed==='cycle'?saveCycleData({...cycleData!,cycleLength:v}):saveCycleData({...cycleData!,periodLength:v});}}/>
              </div>
            )}
            <button className="btn" onClick={()=>setEd(null)} style={{marginTop:16}}>完成</button>
          </div>
        </div>
      )}
    </>
  );
}
