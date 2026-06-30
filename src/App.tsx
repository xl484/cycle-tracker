import { useEffect } from 'react';
import { CycleProvider, useCycleContext } from './context/CycleContext';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { phaseInfo } = useCycleContext();
  useEffect(() => { document.body.setAttribute('data-phase', phaseInfo.phase); }, [phaseInfo.phase]);
  return <Dashboard />;
}

export default function App() {
  return <CycleProvider><AppContent /></CycleProvider>;
}
