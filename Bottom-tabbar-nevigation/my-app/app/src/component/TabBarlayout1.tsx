import { View, StyleSheet, LayoutChangeEvent} from 'react-native';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarBtn from './TabBarBtn';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ThemeContext } from '@/app/src/context/ThemeContext';



export function TabBarLayout1({ state, descriptors, navigation }: BottomTabBarProps) {
  const {currentTheme} = useContext(ThemeContext);

  const [dementions,setdimentions] = useState({height:20 , width:100});

  const buttonwidth = dementions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent)=>{
    setdimentions({
      height: e.nativeEvent.layout.height,
      width : e.nativeEvent.layout.width
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedstyle = useAnimatedStyle(() =>{
    return{
      transform :[{
        translateX: tabPositionX.value
      }],
    }
  })

  // Keep the indicator aligned with the active tab on mount, layout, and when the active tab changes
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    const nextX = buttonwidth * state.index;
    if (buttonwidth > 0) {
      if (!hasInitializedRef.current) {
        tabPositionX.value = nextX; // set synchronously to avoid initial jump
        hasInitializedRef.current = true;
      } else {
        tabPositionX.value = withSpring(nextX, { damping: 15, stiffness: 180 });
      }
    }
  }, [buttonwidth, state.index]);
  return (
    <View onLayout={onTabbarLayout} style={[styles.tabbar,{backgroundColor: currentTheme==='dark'?'#2C2C2C':'#fff'}]}>
      <Animated.View style={[animatedstyle,{
        position:"absolute",
        backgroundColor:"#723FEB",
        borderRadius:50,
        marginHorizontal:12,
        height: dementions.height -10,
        width:buttonwidth -25
      }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const labelText =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonwidth * index, { damping: 15, stiffness: 180 })
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarBtn
           key={route.name}
           onPress={onPress}
           onLongPress={onLongPress}
           isFocused={isFocused}
           routeName={route.name}
           color={isFocused ? '#fff' : '#222'}
           labelText={labelText}

          />
            //<PlatformPressable
              //key={route.name}
              //href={buildHref(route.name, route.params)}
              //accessibilityState={isFocused ? { selected: true } : {}}
              //accessibilityLabel={options.tabBarAccessibilityLabel}
              //testID={options.tabBarButtonTestID}
              //onPress={onPress}
              //onLongPress={onLongPress}
              //style={styles.tabbarItem}
            //>
            //{(() => {
              //const Icon = iconMap[route.name] ?? ((p: { color: string }) => <Feather name='circle' size={24} {...p} />);
              //return <Icon color={isFocused ? '#673ab7' : '#222'} />;
            //})()}
            //<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              //{labelText}
            //</Text>
          //</PlatformPressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabbar:{
    position:'absolute',
    bottom:35,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:"center",
    backgroundColor:"#fff",
    marginHorizontal:25,
    paddingVertical:5,
    borderRadius:35,
    shadowColor:"#000",
    shadowOffset:{width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.1
  },
  

})