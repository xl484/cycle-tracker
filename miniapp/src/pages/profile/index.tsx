import { View, Text } from '@tarojs/components';
import { useCycleContext } from '../../context/CycleContext';

export default function ProfilePage(){
  const { cycleData, phaseInfo } = useCycleContext();
  return (
    <View style={{padding:'40px 16px 20px'}}>
      <Text style={{fontSize:18,fontWeight:'700',color:'#5a5a75'}}>我的</Text>
      <View style={{marginTop:12,padding:14,borderRadius:16,background:'rgba(255,255,255,.4)'}}>
        <Text style={{fontSize:14,color:'#5a5a75'}}>月经开始日期</Text>
        <Text style={{fontSize:13,fontWeight:'600',color:'#5a5a75',marginTop:4}}>
          {cycleData?.lastPeriodDate||'未设置'}
        </Text>
      </View>
      <View style={{marginTop:12,padding:14,borderRadius:16,background:'rgba(255,255,255,.4)'}}>
        <Text style={{fontSize:14,color:'#5a5a75'}}>平均周期长度</Text>
        <Text style={{fontSize:13,fontWeight:'600',color:'#5a5a75',marginTop:4}}>{cycleData?.cycleLength??28} 天</Text>
      </View>
      <View style={{marginTop:12,padding:14,borderRadius:16,background:'rgba(255,255,255,.4)'}}>
        <Text style={{fontSize:14,color:'#5a5a75'}}>经期持续时长</Text>
        <Text style={{fontSize:13,fontWeight:'600',color:'#5a5a75',marginTop:4}}>{cycleData?.periodLength??5} 天</Text>
      </View>
    </View>
  );
}
