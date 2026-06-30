import { useState } from 'react';
import HomeScreen from './HomeScreen';
import TipsScreen from './TipsScreen';
import CalendarScreen from './CalendarScreen';
import ReportScreen from './ReportScreen';
import ProfileScreen from './ProfileScreen';

type Tab = 'home'|'tips'|'calendar'|'report'|'profile';

const TABS:{id:Tab;l:string;d:string}[]=[
  {id:'home',l:'首页',d:'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8 M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'},
  {id:'tips',l:'建议',d:'M12 7v14 M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'},
  {id:'calendar',l:'日历',d:'M8 2v4 M16 2v4 M3 10h18 M3 4h18v18H3z'},
  {id:'report',l:'数据',d:'M18 20V10 M12 20V4 M6 20v-6'},
  {id:'profile',l:'我的',d:'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'},
];

export default function Dashboard(){
  const [t,setT]=useState<Tab>('home');
  return(
    <>
      <div className="sroll">
        {t==='home'&&<HomeScreen/>}
        {t==='tips'&&<TipsScreen/>}
        {t==='calendar'&&<CalendarScreen/>}
        {t==='report'&&<ReportScreen/>}
        {t==='profile'&&<ProfileScreen/>}
      </div>
      <nav className="tbar">
        {TABS.map(x=>{
          const active=t===x.id;
          return(
            <button key={x.id} className="tbtn" onClick={()=>setT(x.id)}
              style={{color:active?'#fff':'rgba(255,255,255,.45)'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={active?2.5:1.8}
                strokeLinecap="round" strokeLinejoin="round">
                <path d={x.d}/>
              </svg>
              <span>{x.l}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
