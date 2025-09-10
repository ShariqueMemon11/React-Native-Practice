import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import {router , usePathname } from 'expo-router'
import {Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image, StyleSheet, View , Text, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import { signOut } from "firebase/auth";
import { auth } from '@/firebaseConfig';

const CustomeDrawerContent=(props)=>{
  const pathname = usePathname();
  const {currentTheme} = useContext(ThemeContext)
  const handlelogin = async () => {
    try{
      await signOut(auth)
      router.push('/src/screens/loginscreen')
    }
    catch{
      Alert.alert('error while loging Out')
    }
  }
  return(
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: currentTheme === 'dark' ? '#212121':'white'}}>
      <View style={styles.userinfowrapper}>
        <Image source={require('../../src/images/profile.png')} 
        style={styles.userimg}
        resizeMode="cover"/>
        <View style={styles.userinfo}>
        <Text style={{fontSize:17 , fontWeight:'bold' , color: currentTheme === 'dark' ? 'white':''}}>Shariq Memon</Text>
        <Text style={{color: currentTheme === 'dark' ? 'white':''}}>memonshariq10@gmail.com</Text>
        <View style={{flex:1,marginRight:-48,marginLeft:48}}>
        <TouchableOpacity style={styles.btnStyles} onPress={handlelogin }>
          <Text style={styles.btntext}>LogOut</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
     
      
      <DrawerItem
        icon={() => (
          <Feather name="home" size={30} color= {(pathname === '/' || pathname === '/index' || pathname === '/(tabs)/(Home)') ? '#fff' : '#000'} />
        )}
        label={'Home'}
        labelStyle={[styles.navitemlable,{color: (pathname === '/(tabs)/(Home)' || pathname === '/' ) ? '#fff' : '#000'}]}
        style={{backgroundColor:(pathname === '/' || pathname === '/(tabs)/(Home)' ) ? '#333' : '#fff', marginBottom:5}}
        onPress={()=>{
          router.push('/(tabs)/(Home)');
        }}/>
        <DrawerItem
        icon={() => (
          <MaterialCommunityIcons name="plus" size={30} color= {pathname === '/(tabs)/(Add)' ? '#fff' : '#000'} />
        )}
        label={'Add'}
        labelStyle={[styles.navitemlable,{color: pathname === '/(tabs)/(Add)' ? '#fff' : '#000'}]}
        style={{backgroundColor:pathname === '/(tabs)/(Add)' ? '#333' : '#fff', marginBottom:5}}
        onPress={()=>{
          router.push('/(tabs)/(Add)');
          console.log(pathname);
        }}/>

      <DrawerItem
        icon={() => (
          <Feather name="user" size={24} color= {(pathname === '/Profile' || pathname === '/(tabs)/Profile') ? '#fff' : '#000'} />
        )}
        label={'Profile'}
        labelStyle={[styles.navitemlable,{color: (pathname === '/Profile' || pathname === '/(tabs)/Profile') ? '#fff' : '#000'}]}
        style={{backgroundColor:(pathname === '/Profile' || pathname === '/(tabs)/Profile') ? '#333' : '#fff', marginBottom:5}}
        onPress={()=>{
          router.push('/Profile');
        }}/>
      <DrawerItem
        icon={() => (
          <Feather name="mail" size={24} color= {(pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#fff' : '#000'} />
        )}
        label={'ContactUs'}
        labelStyle={[styles.navitemlable,{color: (pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#fff' : '#000'}]}
        style={{backgroundColor:(pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#333' : '#fff'}}
        onPress={()=>{
          router.push('/Webview');
        }}/>

<DrawerItem
        icon={() => (
          <MaterialIcons name="support-agent" size={24} color= {pathname === '/(support)'  ? '#fff' : '#000'} />
        )}
        
        label={'Support'}
        labelStyle={[styles.navitemlable,{color: pathname === '/Webview'  ? '#fff' : '#000'}]}
        style={{backgroundColor:(pathname === '/(support)') ? '#333' : '#fff'}}
        onPress={()=>{
          router.push('/support');
        }}/>

<DrawerItem
        icon={() => (
         <Feather name='settings' size={24} color= {(pathname === '/Settings') ? '#fff' : '#000'} />
        )}
        label={'Settings'}
        labelStyle={[styles.submenuLabel,{color: (pathname === '/Settings' ) ? '#fff' : '#000'}]}
        style={[styles.submenuItem, {backgroundColor:(pathname === '/Settings' ) ? '#333' : '#fff'}]}
        onPress={()=>{
          router.push('/Settings');
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
        tabBarStyle: { backgroundColor: currentTheme === 'dark' ? '#212121' : '#fff' }
      }}
      drawerContent={(props)=> <CustomeDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: 'Profile' }} />
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
  },
  btnStyles: {
    flex: 1,
    borderRadius: 40,
    paddingVertical: 7,
    marginHorizontal: 50,
    backgroundColor: '#2f7acf',
    alignItems: 'center',
    marginRight:45,
    marginBottom:5,
    marginTop:4,
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },

})
