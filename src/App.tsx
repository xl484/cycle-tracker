import { useEffect } from 'react';
import { CycleProvider, useCycleContext } from './context/CycleContext';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { phaseInfo } = useCycleContext();
  useEffect(() => { document.body.setAttribute('data-phase', phaseInfo.phase); }, [phaseInfo.phase]);

  return (
    <div className="phone">
      <div className="phone-rbtn" />
      <div className="scr">
        <div className="scr-bg" />
        <div className="scr-g1" /><div className="scr-g2" /><div className="scr-g3" />
        <div className="sbar">
          <span className="sbar-t">9:41</span>
          <div className="sbar-n" />
          <div className="sbar-i">
            <div className="sig-bar">
              <div style={{height:2,opacity:1}} />
              <div style={{height:4,opacity:1}} />
              <div style={{height:6,opacity:1}} />
              <div style={{height:8,opacity:.4}} />
            </div>
            <div className="sbat"><div className="sbat-f" /></div>
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default function App() {
  return <CycleProvider><AppContent /></CycleProvider>;
}
