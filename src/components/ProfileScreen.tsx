import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';

const PL:Record<string,string>={menstrual:'● 当前 · 经期',follicular:'◉ 当前 · 卵泡期',ovulation:'◎ 当前 · 排卵期',luteal:'○ 当前 · 黄体期',unknown:'● 当前'};

export default function ProfileScreen({onBack}:{onBack:()=>void}){
  const{cycleData,phaseInfo,saveCycleData}=useCycleContext();
  const[ed,setEd]=useState<'date'|'cycle'|'period'|null>(null);

  const handleExport=()=>{
    if(!cycleData)return;
    const b=new Blob([JSON.stringify(cycleData,null,2)],{type:'application/json'});
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
          {k:'date',l:'末次经期',v:cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00').toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'}):'未设置',d:'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'},
          {k:'cycle',l:'平均周期长度',v:`${cycleData?.cycleLength??28} 天`,d:'M3 4h18v18H3z M3 10h18 M8 2v4 M16 2v4'},
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
          <span style={{display:'flex',alignItems:'center',gap:8}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
            推送提醒</span>
          <button className="tgl-sw on"><div className="kn" style={{left:20}}/></button>
        </div>
        <div className="setting-row">
          <span style={{display:'flex',alignItems:'center',gap:8}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
            本地优先存储</span>
          <button className="tgl-sw on"><div className="kn" style={{left:20}}/></button>
        </div>
      </div>

      <div className="card" style={{margin:'0 24px 16px',padding:12}}>
        {[
          {l:'历史周期',s:'查看完整记录',d:'M4 18l5-7 5 3 6-8'},
          {l:'提醒设置',s:'排卵期·经前期·打卡',d:'M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'},
          {l:'数据隐私',s:'本地加密 · 不共享',d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'},
          {l:'导出数据',s:'',d:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',onClick:handleExport},
        ].map(x=>(
          <div key={x.l} className="menu-row" onClick={x.onClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--txt2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={x.d}/></svg>
            <div style={{flex:1}}><div style={{fontWeight:500,color:'var(--txt1)'}}>{x.l}</div><div style={{fontSize:9,color:'var(--txt3)'}}>{x.s}</div></div>
            <span style={{color:'var(--txt3)',fontSize:14}}>›</span>
          </div>
        ))}
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
