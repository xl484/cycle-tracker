import { useLaunch } from '@tarojs/taro';
import { CycleProvider } from './context/CycleContext';
import './app.css';

export default function App({ children }) {
  useLaunch(() => {});
  return <CycleProvider>{children}</CycleProvider>;
}
