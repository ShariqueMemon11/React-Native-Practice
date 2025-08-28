// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { Drawer } from 'expo-router/drawer';
// import {router , usePathname } from 'expo-router'
// import {Feather,MaterialCommunityIcons} from '@expo/vector-icons';
// import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
// import { Image, StyleSheet, View , Text, KeyboardAvoidingView } from 'react-native';
// import { useContext , useState} from 'react';
// import { ThemeContext } from '@/app/src/context/ThemeContext';
// import { signOut } from "firebase/auth";
// import { auth } from '@/firebaseConfig';
// import { Alert, TouchableOpacity } from 'react-native';
// import NotificationHistoryModal from '../src/modal/notifiation'
// import { collection, query, where, onSnapshot , getDocs , updateDoc , doc } from 'firebase/firestore';
// import { db } from '@/firebaseConfig'; 
// import { useEffect } from 'react';

// const CustomeDrawerContent=(props)=>{
//   const pathname = usePathname();
//   const {currentTheme} = useContext(ThemeContext)
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/src/screens/loginscreen');
//     } catch {
//       Alert.alert('Error while logging out');
//     }
//   };
//   return(
//     <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: currentTheme === 'dark' ? '#212121':'white'}}>
//       <View style={styles.userinfowrapper}>
//         <Image source={require('../../src/images/profile.png')} 
//         style={styles.userimg}
//         resizeMode="cover"/>
//         <View style={styles.userinfo}>
//         <Text style={{fontSize:17 , fontWeight:'bold' , color: currentTheme === 'dark' ? 'white':''}}>Shariq Memon</Text>
//         <Text style={{color: currentTheme === 'dark' ? 'white':''}}>memonshariq10@gmail.com</Text>
//         <View style={{flex:1,marginRight:-48,marginLeft:48}}>
//           <TouchableOpacity style={styles.btnStyles} onPress={handleLogout}>
//             <Text style={styles.btntext}>LogOut</Text>
//           </TouchableOpacity>
//         </View>
//         </View>
//       </View>
     
      
//       <DrawerItem
//         icon={() => (
//           <Feather name="home" size={30} color= {(pathname === '/' || pathname === '/index' || pathname === '/(tabs)/(Home)') ? '#fff' : '#000'} />
//         )}
//         label={'Home'}
//         labelStyle={[styles.navitemlable,{color: (pathname === '/(tabs)/(Home)' || pathname === '/' ) ? '#fff' : '#000'}]}
//         style={{backgroundColor:(pathname === '/' || pathname === '/(tabs)/(Home)' ) ? '#333' : '#fff', marginBottom:5}}
//         onPress={()=>{
//           router.push('/(tabs)/(Home)');
//         }}/>
//         <DrawerItem
//         icon={() => (
//           <MaterialCommunityIcons name="plus" size={30} color= {pathname === '/(tabs)/(Add)' ? '#fff' : '#000'} />
//         )}
//         label={'Add'}
//         labelStyle={[styles.navitemlable,{color: pathname === '/(tabs)/(Add)' ? '#fff' : '#000'}]}
//         style={{backgroundColor:pathname === '/(tabs)/(Add)' ? '#333' : '#fff', marginBottom:5}}
//         onPress={()=>{
//           router.push('/(tabs)/(Add)');
//           console.log(pathname);
//         }}/>

//       <DrawerItem
//         icon={() => (
//           <Feather name="user" size={24} color= {(pathname === '/(tabs)/(Profile)' ) ? '#fff' : '#000'} />
//         )}
//         label={'Profile'}
//         labelStyle={[styles.navitemlable,{color: (pathname === '/(tabs)/(Profile)' ) ? '#fff' : '#000'}]}
//         style={{backgroundColor:(pathname === '/(tabs)/(Profile)' || pathname === '/(tabs)/Profile') ? '#333' : '#fff', marginBottom:5}}
//         onPress={()=>{
//           router.push('/Profile');
//         }}/>
//       <DrawerItem
//         icon={() => (
//           <SimpleLineIcons name="globe" size={24} color= {(pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#fff' : '#000'} />
//         )}
//         label={'Webview'}
//         labelStyle={[styles.navitemlable,{color: (pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#fff' : '#000'}]}
//         style={{backgroundColor:(pathname === '/Webview' || pathname === '/(tabs)/Webview') ? '#333' : '#fff'}}
//         onPress={()=>{
//           router.push('/Webview');
//         }}/>
      
//       <DrawerItem
//         icon={() => (
//          <Feather name='settings' size={24} color= {(pathname === '/Settings') ? '#fff' : '#000'} />
//         )}
//         label={'Settings'}
//         labelStyle={[styles.submenuLabel,{color: (pathname === '/Settings' ) ? '#fff' : '#000'}]}
//         style={[styles.submenuItem, {backgroundColor:(pathname === '/Settings' ) ? '#333' : '#fff'}]}
//         onPress={()=>{
//           router.push('/Settings');
//         }}/>
//     </DrawerContentScrollView>
//   )
// }
// export default function DrawerLayout() {
  
//   const [unreadCount, setUnreadCount] = useState(0);
//   useEffect(() => {
//     const q = query(collection(db, 'notifications'), where('read', '==', false));
//     const unsub = onSnapshot(q, (snap) => setUnreadCount(snap.size));
//     return unsub;
//   }, []);
//   const markAllRead = async () => {
//     const q = query(collection(db, 'notifications'), where('read', '==', false));
//     const snap = await getDocs(q);
//     await Promise.all(snap.docs.map(d => updateDoc(doc(db, 'notifications', d.id), { read: true })));
//   };
//   const {currentTheme} = useContext(ThemeContext)
//   const [historyVisible, setHistoryVisible] = useState(false)
//   return (
//     <>
//     <Drawer
//       screenOptions={{
//         drawerStyle: { backgroundColor: currentTheme === 'dark' ? '#212121':'white', paddingRight:-20 , width:290},
//         headerStyle: { backgroundColor: currentTheme === 'dark' ? '#333':'white' },
//         headerTintColor: currentTheme === 'dark' ? 'white': '#333',
//         sceneContainerStyle: { backgroundColor: currentTheme === 'dark' ? '#212121' : '#fff' },
//         tabBarStyle: { backgroundColor: currentTheme === 'dark' ? '#212121' : '#fff' }
//       }}
//       drawerContent={(props)=> <CustomeDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="index" options={{ title: 'ContactUs' , headerRight:()=>(
//         <TouchableOpacity
//          onPress={() => setHistoryVisible(true)}
//          style={{ paddingHorizontal: 17 }}
//          >
//           <Feather name="bell" size={22} color={currentTheme === 'dark' ? 'white' : '#333'} />
//           {unreadCount > 0 && (
//         <View
//           style={{
//             position: 'absolute',
//             top: -4,
//             right: -6,
//             minWidth: 16,
//             height: 16,
//             borderRadius: 8,
//             backgroundColor: '#e53935',
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingHorizontal: 3,
//             marginRight:10
//           }}
//         >
//           <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>
//             {unreadCount > 9 ? '9+' : unreadCount}
//           </Text>
//         </View>
//       )}
//         </TouchableOpacity>
//       ) ,headerLeft: () => (
//         <TouchableOpacity
//          onPress={() => router.back()}
//          style={{ paddingHorizontal: 17 }}
//          >
//           <Feather name="arrow-left" size={25} color={currentTheme === 'dark' ? 'white' : '#333'} />
//           </TouchableOpacity>
//       )}} />
//     </Drawer>
//     <KeyboardAvoidingView>
//     <NotificationHistoryModal visible={historyVisible} onClose={() => {setHistoryVisible(false);  markAllRead()}}/>
     
//     </KeyboardAvoidingView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   navitemlable:{
//     marginLeft:-4, 
//   },
//   userinfowrapper:{
//     flexDirection:'row',
//     borderBottomColor:'#ccc',
//     borderBottomWidth:2,
//     marginBottom:7,
//   },
//   userinfo:{
//     marginTop:47,
//     marginLeft:8,
//     gap:3
//   },
//   userimg:{
//     width: 80,
//     height: 89,
//     borderRadius:40, 
//     marginBottom:15
//   },
//   btnStyles: {
//     flex: 1,
//     borderRadius: 40,
//     paddingVertical: 7,
//     marginHorizontal: 50,
//     backgroundColor: '#2f7acf',
//     alignItems: 'center',
//     marginRight: 45,
//     marginBottom: 5,
//     marginTop: 4,
//   },
//   btntext: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 13,
//   },
//   submenuLabel:{
//     marginLeft:-4, 
//   },
//   submenuItem:{
//     marginLeft:-4, 
//   }

// })
import { Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import NotificationHistoryModal from '../src/modal/notifiation';
import { router } from 'expo-router';
import { collection, query, where, onSnapshot, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function Layout() {
  const { currentTheme } = useContext(ThemeContext);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), where('read', '==', false));
    const unsub = onSnapshot(q, (snap) => setUnreadCount(snap.size));
    return unsub;
  }, []);

  const markAllRead = async () => {
    const q = query(collection(db, 'notifications'), where('read', '==', false));
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map(d => updateDoc(doc(db, 'notifications', d.id), { read: true })));
  };

  return (
    <>
    <StatusBar barStyle={'light-content'}/>
      <Stack screenOptions={{
         headerTintColor: currentTheme === 'dark' ? 'white' : '#333',
      }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'ContactUs',
            headerStyle: { backgroundColor: 'transparent'},
            headerBackground:()=>(<View
              style={{
                flex: 1,
                backgroundColor: '#2f7acf',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                overflow: 'hidden',
              }}
            />),
            headerTintColor:'white',
            headerRight: () => (
              <TouchableOpacity onPress={() => setHistoryVisible(true)} style={{ paddingHorizontal: 17 }}>
                <View>
                  <Feather name="bell" size={22} color={'white'} />
                  {unreadCount > 0 && (
                    <View style={{ position:'absolute', top:-4, right:-6, minWidth:16, height:16, borderRadius:8, backgroundColor:'#e53935', alignItems:'center', justifyContent:'center', paddingHorizontal:3 }}>
                      <Text style={{ color:'white', fontSize:10, fontWeight:'700' }}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 17 }}>
                <Feather name="arrow-left" size={25} color={'white'} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>

      <NotificationHistoryModal
        visible={historyVisible}
        onClose={() => { setHistoryVisible(false); markAllRead(); }}
      />
     </>
  );
}
