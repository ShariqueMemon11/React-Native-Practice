import { View, Text, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState , useContext  } from 'react'
import{collection , addDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../../../firebaseConfig'
import { ThemeContext } from '@/app/src/context/ThemeContext';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import saveNotificationToFirestore from '../component/notification';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Webview: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { currentTheme } = useContext(ThemeContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }
      if (status !== 'granted') Alert.alert('Enable notifications in Settings to see alerts.');
    })();
  }, []);
  
  const submit = async() => {
    if (!fullName || !email || !message) {
      Alert.alert('Fill all the fields to submit')
      return
    }
    if (!emailRegex.test(email)){
      Alert.alert('Enter valid email')
      return
    }
    try{
      await addDoc(collection(db, 'Contact_Us_Msgs'), {
        fullName,
        email,
        message,
        timestamp: serverTimestamp(),
      })
      router.push('/(tabs)/(Home)')
      setFullName('')
      setEmail('')
      setMessage('')
    } catch (error: any) {
      Alert.alert('Error', `Failed to submit: ${error.message}`)
    }
    await Notifications.scheduleNotificationAsync({
      content:{
        title:'Thank You! ' + fullName,
        body: 'Your request has been recived'
      },
      trigger : null
    });
    saveNotificationToFirestore({
      title: fullName,
      email: email,
      body: message,
    })
  }
  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'transparent'}} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    keyboardVerticalOffset={0}>
    <ScrollView style={{backgroundColor: '#ffffff'}} contentContainerStyle={{paddingBottom:24}} keyboardShouldPersistTaps={'handled'}>
    <View style={[styles.mainContainer,{backgroundColor: '#ffffff'}]}>
      <View style={{
          marginTop:15,
          backgroundColor: '#f5faff',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderColor:  '#f5faff',
          marginBottom:15}}>
       
       <View style={{flexDirection:'row',alignItems:'center'}}>
        <Feather name='mail' size={28} color={'#2f7acf'}/>
        
        <Text style={{marginLeft:13,fontSize:17 , fontWeight:'500' , color:'#2f7acf'}}>Email:</Text>
        <Text style={{marginLeft:4, fontSize:15 , fontWeight:400}}>memonshariq10@gmail.com</Text>
        
       </View>
       <View style={{flexDirection:'row'}}>
       <Text style={{marginTop:7 , fontSize:17 , fontWeight:'500' , color:'#2f7acf'}}>ResponseTime:</Text>
       <Text style={{marginTop:8.5 , fontSize:14  }}> one working day!</Text>
       </View>      
      </View>

      <View style={{
          
          backgroundColor: '#f5faff',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderColor:  '#f5faff',
          marginBottom:15}}>
       
       <View style={{flexDirection:'row',alignItems:'center'}}>
        <Feather name='globe' size={28} color={'#2f7acf'}/>
        <View>
        <Text style={{marginLeft:13, marginBottom:5,fontSize:17 , fontWeight:'500' , color:'#2f7acf'}}>Website</Text>
        <Text style={{marginLeft:13, fontSize:15}}
        onPress={() => Linking.openURL('https://fidsor.com/')}>https://fidsor.com</Text>
        </View>
       </View>      
      </View>

      <View style={{
          
          backgroundColor: '#f5faff',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderColor:  '#f5faff',
          marginBottom:15}}>
       
       <View style={{flexDirection:'row',alignItems:'center'}}>
        <Feather name='clock' size={28} color={'#2f7acf'}/>
        <Text style={{marginLeft:13,fontSize:17 , fontWeight:'500' , color:'#2f7acf'}}>Availability</Text>
       </View>      
       <Text style={{ marginTop:8, fontSize:16 , fontWeight:'400'}}>From 9:00 Am to 6:00 Am</Text>
       <Text style={{ fontSize:14 , fontWeight:'400'}}>(Monday to Thursday)</Text>
      </View>
      <Text style={{ fontSize:25 , marginLeft:4,fontWeight:'400', marginBottom:8}}>For any Consern</Text>
      <View style={{
          backgroundColor: '#f5faff',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderColor:  '#f5faff'}}>
      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color:'#7d7d7d'}]}>Name</Text>
        <TextInput
          style={[styles.inputStyle,{borderColor: 'rgba(0, 0, 0, 0.3)',color:'#111'}]} placeholder='Your Name' placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'}
            value={fullName}
            onChangeText={(username)=> setFullName(username)}
          />
      </View>

      
      
      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color: '#7d7d7d'}]}>Email</Text>
        <TextInput
          style={[styles.inputStyle,{borderColor: 'rgba(0, 0, 0, 0.3)',color: '#111'}]} placeholder={'example@gmail.com'} placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'}
            value={email}
            onChangeText={(useremail) => setEmail(useremail)}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color: '#7d7d7d'}]}>How we can help you?</Text>
        <TextInput
          style={[styles.inputStyle,styles.multilineStyle,{borderColor: 'rgba(0, 0, 0, 0.3)',color: '#111'}]} placeholder={'Your Consern'} placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'} multiline
           value={message}
           onChangeText={(usermsg) => setMessage(usermsg)}
          />
      </View>
      </View>

      <TouchableOpacity
       style={[styles.btnStyles,
        {backgroundColor: '#2f7acf'},
       ]}
       onPress={submit}
       >
        <Text style={styles.btntext}>Contact Us</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Webview

const styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    paddingHorizontal:20,
    backgroundColor:'#eaf4ff'
  },
  logo:{
    width: '70%',
    height: 120,
    alignSelf: 'flex-start',
    marginTop: -10,
    marginBottom: -25,
  },
  mainHader:{
    fontSize:20,
    color: '#344055',
    fontWeight: '500',
    paddingTop: 20,
    paddingBottom:15,
    fontFamily: 'JosefinSans_500Medium',
    textTransform:'capitalize'
  },
  inputContainer:{
    marginTop: 10,
  },
  labels:{
    fontWeight: "bold",
    // fontSize: 15,
  
    paddingBottom: 5,
    fontFamily: "JosefinSans_300Light",
    lineHeight: 25,
  },
  inputStyle:{
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 3,
    paddingVertical: 7,
    borderRadius: 6,
    width: '100%',
  },
  multilineStyle:{
    paddingVertical: 3,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  btnStyles:{
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginVertical: 20,
    marginRight:210,
    marginLeft:10
  },
  btntext:{
    color:'white',
    flex:1,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginRight:6
  },
  modalbtn:{
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginVertical: 20,
    marginRight:210,
    marginLeft:38,
  },
  modalbtntext:{
    color:'white',
    flex:1,
    fontSize:10,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginRight:6,
    textAlign:'center'
  },
})