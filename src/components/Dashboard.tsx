import { useState } from 'react';
import HomeScreen from './HomeScreen';
import TipsScreen from './TipsScreen';
import InsightsScreen from './InsightsScreen';
import ProfileScreen from './ProfileScreen';

export type Tab = 'home'|'tips'|'insights'|'profile';

const TABS:{id:Tab;l:string;icon:string}[]=[
  {id:'home',l:'首页',icon:'M12 4L4 11v9h5v-5h6v5h5v-9z'},
  {id:'tips',l:'计划建议',icon:'M5 4h14v15H5z M9 9h6 M9 13h4'},
  {id:'insights',l:'日历数据',icon:'M3 4h18v18H3z M3 10h18 M8 2v4 M16 2v4'},
  {id:'profile',l:'我的',icon:'M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20c0-4 4-6 8-6s8 2 8 6'},
];

export default function Dashboard(){
  const [t,setT]=useState<Tab>('home');
  const [tipCat,setTipCat]=useState<string>('exercise');

  const goTips = (cat?: string) => { setTipCat(cat??'exercise'); setT('tips'); };

  return(
    <div className="app">
      {t==='home'&&<HomeScreen onNav={setT} goTips={goTips}/>}
      {t==='tips'&&<TipsScreen initialCat={tipCat} onBack={()=>setT('home')}/>}
      {t==='insights'&&<InsightsScreen onBack={()=>setT('home')}/>}
      {t==='profile'&&<ProfileScreen onBack={()=>setT('home')}/>}
      <nav className="nav">
        {TABS.map(x=>(
          <button key={x.id} className={`nav-btn${t===x.id?' active':''}`} onClick={()=>setT(x.id)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill={t===x.id?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={x.icon}/></svg>
            <span>{x.l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
