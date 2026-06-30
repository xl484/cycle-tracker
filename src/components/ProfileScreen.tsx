import { useState } from 'react';
import { useCycleContext } from '../context/CycleContext';

const PL:Record<string,string>={menstrual:'🌸 当前 · 经期',follicular:'☀️ 当前 · 卵泡期',ovulation:'🌼 当前 · 排卵期',luteal:'🍃 当前 · 黄体期',unknown:'🌸 当前'};

export default function ProfileScreen(){
  const{cycleData,phaseInfo,saveCycleData}=useCycleContext();
  const[ed,setEd]=useState<'date'|'cycle'|'period'|null>(null);
  const[nOn,setNOn]=useState(true);
  const[lOn,setLOn]=useState(true);

  const handleExport=()=>{
    if(!cycleData)return;
    const b=new Blob([JSON.stringify(cycleData,null,2)],{type:'application/json'});
    const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`cycle-data-${cycleData.lastPeriodDate}.json`;a.click();URL.revokeObjectURL(u);
  };

  return(
    <>
      <div className="hd" style={{paddingTop:4}}><h1 className="hd-title" style={{margin:0}}>我的</h1></div>
      <div className="avt">知</div>
      <div className="avt-name">知己用户</div>
      <div style={{textAlign:'center',marginTop:4}}><span className="pcard-badge">{PL[phaseInfo.phase]??PL.unknown}</span></div>

      <div className="card" style={{margin:'12px',padding:12}}>
        <div style={{color:'rgba(255,255,255,.7)',fontSize:11,fontWeight:600,marginBottom:8}}>周期设置</div>
        {[{k:'date',i:'🩸',l:'末次经期',v:cycleData?.lastPeriodDate?new Date(cycleData.lastPeriodDate+'T00:00:00').toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'}):'未设置'},{k:'cycle',i:'📅',l:'平均周期长度',v:`${cycleData?.cycleLength??28} 天`},{k:'period',i:'⏱',l:'经期持续时长',v:`${cycleData?.periodLength??5} 天`}].map(r=>(
          <div key={r.k} className="srow" onClick={()=>setEd(r.k as any)} style={{cursor:'pointer'}}>
            <div className="srow-l"><span style={{fontSize:14}}>{r.i}</span><span>{r.l}</span></div>
            <div className="srow-v">{r.v}<span className="srow-arr">›</span></div>
          </div>
        ))}
      </div>

      <div className="card" style={{margin:'0 12px 12px',padding:12}}>
        <div style={{color:'rgba(255,255,255,.7)',fontSize:11,fontWeight:600,marginBottom:8}}>隐私与数据</div>
        <div className="srow">
          <div className="srow-l">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e87ca0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
            <span>推送提醒</span>
          </div>
          <button className={`tgl${nOn?' on':''}`} onClick={()=>setNOn(!nOn)}><div className="knob"/></button>
        </div>
        <div className="srow">
          <div className="srow-l">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9b7fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
            <span>本地优先存储</span>
          </div>
          <button className={`tgl${lOn?' on':''}`} onClick={()=>setLOn(!lOn)}><div className="knob"/></button>
        </div>
      </div>

      <div className="card" style={{margin:'0 12px 12px',padding:12}}>
        {[{i:'📊',l:'历史周期',s:'查看完整记录'},{i:'🔔',l:'提醒设置',s:'排卵期·经前期·打卡'},{i:'🔒',l:'数据隐私',s:'本地加密 · 不共享'},{i:'📤',l:'导出数据',s:'',onClick:handleExport}].map(x=>(
          <div key={x.l} className="mrow" onClick={x.onClick}>
            <span style={{fontSize:14}}>{x.i}</span>
            <div style={{flex:1}}><div style={{color:'#fff',fontWeight:500}}>{x.l}</div><div className="mrow-sub">{x.s}</div></div>
            <span className="mrow-arr">›</span>
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
            <button className="cat-tab on" onClick={()=>setEd(null)} style={{width:'100%',marginTop:14,padding:10,fontSize:13}}>完成</button>
          </div>
        </div>
      )}
    </>
  );
}
