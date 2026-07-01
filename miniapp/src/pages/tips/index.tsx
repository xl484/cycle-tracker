import { View, Text } from '@tarojs/components';
import { useCycleContext } from '../../context/CycleContext';
import { getGuidance } from '../../utils/guidanceContent';

export default function TipsPage(){
  const { phaseInfo } = useCycleContext();
  const items = getGuidance(phaseInfo.phase);

  return (
    <View style={{padding:'40px 16px 20px'}}>
      <Text style={{fontSize:18,fontWeight:'700',color:'#5a5a75'}}>阶段指引</Text>
      {items.map((g,i)=>(
        <View key={g.id} style={{marginTop:12,padding:14,borderRadius:16,
          background:'rgba(255,255,255,.4)',border:'1px solid rgba(255,255,255,.5)'}}>
          <Text style={{fontSize:14,fontWeight:'700',color:'#5a5a75'}}>{g.icon} {g.title}</Text>
          <Text style={{fontSize:12,color:'#5a5a75',lineHeight:1.6,marginTop:6}}>{g.content}</Text>
        </View>
      ))}
    </View>
  );
}
