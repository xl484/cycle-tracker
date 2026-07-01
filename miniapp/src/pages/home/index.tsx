import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useCycleContext } from '../../context/CycleContext';

const PH:{[k:string]:{e:string;l:string;v:number}}={
  menstrual:{e:'●',l:'经期',v:40},follicular:{e:'◉',l:'卵泡期',v:75},
  ovulation:{e:'◎',l:'排卵期',v:95},luteal:{e:'○',l:'黄体期',v:55},unknown:{e:'●',l:'周期',v:0},
};
const TIPS:{[k:string]:{icon:string;txt:string}}={
  menstrual:{icon:'●',txt:'今天多喝温水，给自己一个安静的午后。'},
  follicular:{icon:'◉',txt:'精力在回升，适合开启那件想了很久的事。'},
  ovulation:{icon:'◎',txt:'状态正好，大胆推进，今天是属于你的。'},
  luteal:{icon:'○',txt:'放慢一点没关系，整理和复盘也是前进。'},
};

export default function HomePage(){
  const { phaseInfo, cycleData } = useCycleContext();
  const p = phaseInfo.phase; const ph = PH[p]??PH.unknown; const tip = TIPS[p]??TIPS.unknown;
  const cl = cycleData?.cycleLength??28;

  return (
    <View style={{minHeight:'100vh',paddingBottom:20,display:'flex',flexDirection:'column',alignItems:'center'}}>
      {/* 状态栏占位 */}
      <View style={{height:44}}/>
      <Text style={{fontSize:14,color:'rgba(255,255,255,.85)',alignSelf:'flex-start',marginLeft:24}}>Hi, Luna</Text>
      <Text style={{fontSize:22,fontWeight:'500',color:'#fff',alignSelf:'flex-start',marginLeft:24,lineHeight:1.3}}>了解周期，{'\n'}更好地照顾自己</Text>

      {/* 泡泡 */}
      <View style={{width:220,height:220,borderRadius:'50%',marginTop:20,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        background:'radial-gradient(circle at 35% 35%,rgba(255,255,255,.88),rgba(235,205,255,.55),rgba(195,215,255,.45),rgba(254,215,225,.6),rgba(255,255,255,.25))',
        boxShadow:'0 16px 44px rgba(186,197,244,.35)'}}>
        <Text style={{fontSize:32,fontWeight:'700',color:'#fff'}}>{ph.l}</Text>
        <Text style={{fontSize:13,color:'rgba(255,255,255,.85)',marginTop:4}}>第 {phaseInfo.dayInCycle||'-'} 天 / 共 {cl} 天</Text>
        <View onClick={()=>Taro.switchTab({url:'/pages/tips/index'})} style={{marginTop:8,padding:'4px 14px',borderRadius:20,background:'rgba(255,255,255,.25)',border:'1px solid rgba(255,255,255,.45)'}}>
          <Text style={{fontSize:11,color:'#fff'}}>查看阶段详情 ›</Text>
        </View>
      </View>

      {/* 今日状态概览 */}
      <View style={{width:'88%',marginTop:20,padding:16,borderRadius:22,background:'rgba(255,255,255,.35)',border:'1px solid rgba(255,255,255,.55)'}}>
        <Text style={{fontSize:11,color:'rgba(255,255,255,.75)',marginBottom:10}}>今日状态概览</Text>
        <View style={{display:'flex',justifyContent:'space-between'}}>
          {[
            {label:'精力',val:p==='ovulation'?'高峰':p==='follicular'?'回升':p==='luteal'?'下降':'低谷',nav:'exercise'},
            {label:'身体',val:p==='ovulation'?'轻盈':p==='follicular'?'有力':p==='luteal'?'略肿':'疲惫',nav:'diet'},
            {label:'睡眠',val:p==='ovulation'?'好':p==='follicular'?'规律':p==='luteal'?'欠佳':'多休',nav:'sleep'},
            {label:'情绪',val:p==='ovulation'?'自信':p==='follicular'?'积极':p==='luteal'?'内敛':'内省',nav:'mood'},
          ].map(s=>(
            <View key={s.label} onClick={()=>Taro.navigateTo({url:`/pages/tips/index?cat=${s.nav}`})}
              style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
              <Text style={{fontSize:10,color:'#7a7a9a'}}>{s.label}</Text>
              <Text style={{fontSize:12,fontWeight:'600',color:'#5a5a75'}}>{s.val}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 能量条 */}
      <View style={{width:'88%',marginTop:16,padding:16,borderRadius:22,background:'rgba(255,255,255,.35)',border:'1px solid rgba(255,255,255,.55)'}}>
        <View style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
          <Text style={{fontSize:11,color:'#5a5a75'}}>今日能量 · 阶段预期</Text>
          <Text style={{fontSize:11,fontWeight:'600',color:'#F498B7'}}>{ph.v}%</Text>
        </View>
        <View style={{height:6,borderRadius:3,background:'rgba(255,255,255,.5)',overflow:'hidden'}}>
          <View style={{height:'100%',width:`${ph.v}%`,borderRadius:3,background:'linear-gradient(90deg,#F498B7,#8BA8E0)'}}/>
        </View>
        <View style={{display:'flex',gap:8,marginTop:10}}>
          {[{n:phaseInfo.dayInCycle||'-',l:'周期第几天'},{n:phaseInfo.daysUntilNextPhase||'-',l:'距下次经期'},{n:cl,l:'平均周期'}].map(s=>(
            <View key={s.l} style={{flex:1,textAlign:'center',padding:8,borderRadius:12,background:'rgba(255,255,255,.3)'}}>
              <Text style={{fontSize:14,fontWeight:'700',color:'#5a5a75'}}>{s.n}</Text>
              <Text style={{fontSize:9,color:'#a0a0b8'}}>{s.l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 今日提示 */}
      <View style={{width:'88%',marginTop:16,display:'flex',alignItems:'flex-start',gap:10}}>
        <Text style={{fontSize:16,opacity:.6}}>{tip.icon}</Text>
        <Text style={{fontSize:11,color:'#7a7a9a',lineHeight:1.5}}>{tip.txt}</Text>
      </View>

      {/* 阶段总览 */}
      <View onClick={()=>Taro.switchTab({url:'/pages/insights/index'})}
        style={{width:'88%',marginTop:20,padding:'16px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:11,color:'rgba(255,255,255,.75)'}}>周期阶段总览 ›</Text>
      </View>
      <View style={{width:'88%',display:'flex',justifyContent:'space-between',position:'relative'}}>
        <View style={{position:'absolute',top:16,left:12,right:12,height:1,background:'rgba(255,255,255,.35)',zIndex:0}}/>
        {[
          {label:'经期',range:'1-5天',c:'#ffa7c4'},{label:'卵泡期',range:'6-13天',c:'#c6b4f9'},
          {label:'排卵期',range:'14-16天',c:'#af90e8'},{label:'黄体期',range:'17-28天',c:'#f5d09b'},
        ].map(t=>{
          const active=p===({经期:'menstrual',卵泡期:'follicular',排卵期:'ovulation',黄体期:'luteal'} as any)[t.label];
          return(
            <View key={t.label} style={{display:'flex',flexDirection:'column',alignItems:'center',zIndex:1,gap:4}}>
              <View style={{width:active?30:24,height:active?30:24,borderRadius:'50%',background:active?'#fff':`${t.c}88`,border:active?'2px solid #fff':`1px solid ${t.c}`,transition:'all .3s'}}/>
              <Text style={{fontSize:10,color:active?'#5a5a75':'#8a8aa8',fontWeight:active?'500':'400'}}>{t.label}</Text>
              <Text style={{fontSize:8,color:'#a0a0b8'}}>{t.range}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
