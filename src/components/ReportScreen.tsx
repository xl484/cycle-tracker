import { useCycleContext } from '../context/CycleContext';

const LUT=14;

export default function ReportScreen(){
  const{cycleData}=useCycleContext();
  const cl=cycleData?.cycleLength??28;
  const pl=cycleData?.periodLength??5;
  const fl=cl-LUT;
  const hist=[26,28,29,28,27,cl];const mx=Math.max(...hist,30);
  const segs=[{l:'经期',f:pl,c:'#e87ca0'},{l:'卵泡期',f:fl-pl,c:'#9b7fd4'},{l:'排卵期',f:1,c:'#d4a020'},{l:'黄体期',f:LUT,c:'#4db89a'}];
  const tags=[{i:'😫',l:'经痛',ph:'menstrual'},{i:'😴',l:'疲劳',ph:'luteal'},{i:'🌊',l:'水肿',ph:'luteal'},{i:'😤',l:'情绪波动',ph:'menstrual'},{i:'🤕',l:'头痛',ph:'menstrual'},{i:'💪',l:'活力充沛',ph:'follicular'}];

  return(
    <>
      <div className="hd" style={{paddingTop:4}}>
        <div className="hd-row">
          <h1 className="hd-title" style={{margin:0}}>数据报告</h1>
          <span style={{color:'rgba(255,255,255,.5)',fontSize:11}}>近6个周期</span>
        </div>
      </div>

      <div className="stat3">
        <div className="scard card"><span className="scard-i">📅</span><div><span className="scard-n">{cl}</span><span className="scard-u">天</span></div><span className="scard-l">平均周期</span></div>
        <div className="scard card"><span className="scard-i">🩸</span><div><span className="scard-n">{pl}</span><span className="scard-u">天</span></div><span className="scard-l">经期时长</span></div>
        <div className="scard card"><span className="scard-i">⭐</span><div><span className="scard-n">95</span><span className="scard-u">%</span></div><span className="scard-l">规律性</span></div>
      </div>

      <div className="card" style={{margin:'8px 12px',padding:12}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
          <span style={{color:'#fff',fontWeight:600,fontSize:12}}>周期长度趋势</span>
          <span style={{color:'rgba(255,255,255,.5)',fontSize:10}}>天</span>
        </div>
        <div className="barchart">
          {hist.map((v,i)=>(<div key={i} className="bcol"><span className="bcol-v">{v}</span><div className={`bcol-bar${i===hist.length-1?' hi':''}`} style={{height:`${(v/mx)*100}%`}}/><span className="bcol-lbl">{i+1}月</span></div>))}
        </div>
      </div>

      <div className="card" style={{margin:'8px 12px',padding:12}}>
        <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:10}}>本周期阶段分布（{cl}天）</div>
        <div className="segbar">{segs.map(s=><div key={s.l} style={{flex:s.f,background:s.c}}/>)}</div>
        <div className="segleg">{segs.map(s=><span key={s.l}>{s.l} {s.f}d</span>)}</div>
      </div>

      <div className="card" style={{margin:'8px 12px',padding:12}}>
        <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:8}}>常见症状记录</div>
        <div className="tagw">
          {tags.map(t=>(<span key={t.l} className="tag" style={{background:`var(--clr-${t.ph},rgba(255,255,255,.1))`,opacity:.8}}>{t.i} {t.l}</span>))}
        </div>
      </div>
    </>
  );
}
