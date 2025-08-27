import { View, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import TabBarBtn from './TabBarBtn2'
import {  Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import React, { useContext } from 'react'


const iconsL2: Record<string, (p:{color:string; focused:boolean})=>React.ReactElement> = {
  '(Home)':  ({ color,focused}) => (<View style={{
    height:40,
    width:40,
    alignItems : "center",
    justifyContent:"center", 
    backgroundColor: focused ? '#3D59AB' : '',
    borderRadius:99999
    }}>
      <Feather name= 'home'  
       size={22} color={color} />
    </View>),
  Webview:  ({color,focused}) => (<View style={{
    height:40,
    width:40,
    alignItems : "center",
    justifyContent:"center", 
    backgroundColor: focused ? '#3D59AB' : '',
    borderRadius:99999
    }}><MaterialCommunityIcons name="card-account-phone-outline" size={24} color={color}/>
    </View>),
  '(Add)':   ({focused}) => (<View style={{
    height:60,
    width:60, 
    alignItems : "center",
    justifyContent:"center",
    borderRadius: 99999,
    backgroundColor:'#3D59AB',
    marginBottom:focused ? 35 : 20 
    }}>
      <Feather name="plus"  
        size={38} color={'white'} />
    </View>),
  Profile: ({color,focused}) => (<View style={{
    height:40,
    width:40,
    alignItems : "center",
    justifyContent:"center", 
    backgroundColor: focused ? '#3D59AB' : '',
    borderRadius:99999
    }}><Feather name="user" size={22} color={color}/>
    </View>),
  Settings: ({color,focused}) => (<View style={{
    height:40,
    width:40,
    alignItems : "center",
    justifyContent:"center", 
    backgroundColor: focused ? '#3D59AB' : '',
    borderRadius:99999
    }}><Feather name="settings" size={24} color={color}/> 
    </View>)
    
};

const TabBarlayout2: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { currentTheme } = useContext(ThemeContext)
  return (
    <View style={[styles.container, { backgroundColor: currentTheme === 'dark' ? '#2C2C2C' : '#fff' }]}>
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
            color={isFocused ? 'white' : currentTheme === 'dark' ? 'gray' : 'black'}
            labelText={labelText as string}
            renderIcon={iconsL2[(route.name.split('/').pop() as string)]}
          />
        );
      })}
    </View>
  );
}

export default TabBarlayout2

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 27,
    left: 16,
    right: 16,
    height: 60,
    elevation: 0,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowOffset:{width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.17,
    shadowColor:"#000",
  },
})