import { Pressable, StyleSheet, Text } from 'react-native'
import { iconMap } from '../constaints/icons';
import { Feather } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AnimatedText } from 'react-native-reanimated/src/component/Text';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import React, { useEffect, useContext} from 'react';


const TabBarBtn = ({onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  labelText
}: 
{onPress:Function,
  onLongPress:Function,
  isFocused:boolean,
  routeName:string,
  color:string,
  labelText:string
}) => {
  const scale = useSharedValue(0);
  const {currentTheme} = useContext(ThemeContext);
  useEffect(()=>{
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 :0): isFocused, {duration:350})
  },[scale,isFocused])

  const animatedTextStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(scale.value,[0,1],[1,0])
    return{
      opacity
    }
  }) 

  const animatediconStyle = useAnimatedStyle(()=>{
    const ScaleValue = interpolate(scale.value,[0,1],[1,1.2])
    const top = interpolate(scale.value,[0,1],[1,9])
    return{
      transform :[{
        scale: ScaleValue
        
      }],
      top
    }
  })
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
    <Animated.View style={animatediconStyle}>
    {(() => {
      const Icon = iconMap[routeName] ?? ((p: { color: string }) => <Feather name='circle' size={24} {...p} />);
      return <Icon color={isFocused ? '#fff' : currentTheme === 'dark'? '#BDBDBD' : '#222'} />;
    })()}
    </Animated.View>
    <AnimatedText style={[{ color: isFocused ? '#673ab7' : currentTheme === 'dark'? '#BDBDBD' : 'black' , fontSize:12},animatedTextStyle]}>{labelText}</AnimatedText>
    </Pressable>
  );
};

export default TabBarBtn

const styles = StyleSheet.create({
  tabbarItem:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    gap:5,
  }
})