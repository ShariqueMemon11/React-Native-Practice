import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import {router , usePathname } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image, StyleSheet, View , Text} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@/app/src/context/ThemeContext';

const CustomeDrawerContent=(props)=>{
  const pathname = usePathname();
  const {currentTheme} = useContext(ThemeContext)
  return(
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: currentTheme === 'dark' ? '#212121':'white'}}>
      <View style={styles.userinfowrapper}>
        <Image source={require('../../src/images/profile.png')} 
        style={styles.userimg}
        resizeMode="cover"/>
        <View style={styles.userinfo}>
        <Text style={{fontSize:17 , fontWeight:'bold' , color: currentTheme === 'dark' ? 'white':''}}>Shariq Memon</Text>
        <Text style={{color: currentTheme === 'dark' ? 'white':''}}>memonshariq10@gmail.com</Text>
        </View>
      </View>
      <DrawerItem
      icon={() => (
        <MaterialCommunityIcons name="theme-light-dark" size={24} color= {pathname == '/Settings' ? '#fff' : '#000'} />
      )}
      label={"Theme"}
      labelStyle={[styles.navitemlable,{color: pathname == '/Settings' ? '#fff' : '#000'}]}
      style={{backgroundColor:pathname == '/Settings' ? '#333' : '#fff', marginBottom:5}}
      onPress={()=>{
        router.push('/Settings');
      }}/>
      <DrawerItem
      icon={() => (
        <SimpleLineIcons name="options" size={24} color= {pathname == '/Settings/TabBar-Layout-1' ? '#fff' : '#000'} />
      )}
      label={"TabBar Layout 1"}
      labelStyle={[styles.navitemlable,{color: pathname == '/Settings/TabBar-Layout-1' ? '#fff' : '#000'}]}
      style={{backgroundColor:pathname == '/Settings/TabBar-Layout-1' ? '#333' : '#fff', marginBottom:5}}
      onPress={()=>{
        router.push('/Settings/TabBar-Layout-1');
      }}/>
      <DrawerItem
      icon={() => (
        <SimpleLineIcons name="options" size={24} color= {pathname == '/Settings/TabBar-Layout-2' ? '#fff' : '#000'} />
      )}
      label={"TabBar Layout 2"}
      labelStyle={[styles.navitemlable,{color: pathname == '/Settings/TabBar-Layout-2' ? '#fff' : '#000'}]}
      style={{backgroundColor:pathname == '/Settings/TabBar-Layout-2' ? '#333' : '#fff', marginBottom:5}}
      onPress={()=>{
        router.push('/Settings/TabBar-Layout-2');
      }}/>
    </DrawerContentScrollView>
)
}
export default function DrawerLayout() {
  const {currentTheme} = useContext(ThemeContext)
  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: currentTheme === 'dark' ? '#212121':'white', paddingRight:-20 , width:290},
        headerStyle: { backgroundColor: currentTheme === 'dark' ? '#333':'white' },
        headerTintColor: currentTheme === 'dark' ? 'white': '#333',
        sceneContainerStyle: { backgroundColor: currentTheme === 'dark' ? '#212121' : '#fff' },
        tabBarStyle: { backgroundColor: currentTheme === 'dark' ? '#212121' : '#fff' }  // add this
      }}
      drawerContent={(props)=> <CustomeDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: 'Theme' }} />
      <Drawer.Screen name="TabBar-Layout-1" options={{ title: 'TabBar Layout 1' }} />
      <Drawer.Screen name="TabBar-Layout-2" options={{ title: 'TabBar Layout 2' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navitemlable:{
    marginLeft:-4, 
  },
  userinfowrapper:{
    flexDirection:'row',
    borderBottomColor:'#ccc',
    borderBottomWidth:2,
    marginBottom:7,
  },
  userinfo:{
    marginTop:47,
    marginLeft:8,
    gap:3
  },
  userimg:{
    width: 80,
    height: 89,
    borderRadius:40, 
    marginBottom:15
  }

})
