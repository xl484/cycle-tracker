import { View, Text } from '@tarojs/components';
import { useCycleContext } from '../../context/CycleContext';

export default function InsightsPage(){
  const { cycleData, phaseInfo } = useCycleContext();
  return (
    <View style={{padding:'40px 16px 20px'}}>
      <Text style={{fontSize:18,fontWeight:'700',color:'#5a5a75'}}>日历与数据</Text>
      <View style={{marginTop:12,padding:14,borderRadius:16,background:'rgba(255,255,255,.4)'}}>
        <Text style={{fontSize:13,color:'#5a5a75'}}>周期第 {phaseInfo.dayInCycle} 天</Text>
        <Text style={{fontSize:12,color:'#7a7a9a',marginTop:4}}>平均周期 {cycleData?.cycleLength??28} 天</Text>
      </View>
    </View>
  );
}
