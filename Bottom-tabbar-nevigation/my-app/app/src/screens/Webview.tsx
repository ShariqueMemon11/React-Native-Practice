import { View, Text, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState , useContext  } from 'react'
import{collection , addDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../../../firebaseConfig'
import { ThemeContext } from '@/app/src/context/ThemeContext';

const Webview: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigation = useNavigation<any>()
  const { currentTheme } = useContext(ThemeContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
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
        status: 'new'
      })
      Alert.alert('Success', 'Message Submitted Successfully') 
      setFullName('')
      setEmail('')
      setMessage('')
      navigation.navigate('(Home)')
    } catch (error: any) {
      Alert.alert('Error', `Failed to submit: ${error.message}`)
    }
  }
  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'transparent'}} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    keyboardVerticalOffset={0}>
    <ScrollView style={{backgroundColor:currentTheme === 'dark' ? '#212121' : '#ffffff'}} contentContainerStyle={{paddingBottom:24}} keyboardShouldPersistTaps={'handled'}>
    <View style={[styles.mainContainer,{backgroundColor:currentTheme === 'dark' ?  '#212121' : '#ffffff'}]}>
      <Image source={require('../images/logo2.png')} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.mainHader,{color:currentTheme === 'dark' ?  'white' : 'black'}]}>Delivering innovative and robust software solutions tailored to your business needs</Text>
      
      <View style={{
          backgroundColor:currentTheme === 'dark' ?  '#212121' : '#f5faff',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderColor: currentTheme === 'dark' ?  '#212121' : '#f5faff'}}>
      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color:currentTheme === 'dark' ?  'white' : '#7d7d7d'}]}>Name</Text>
        <TextInput
          style={[styles.inputStyle,{borderColor: currentTheme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.3)',color:currentTheme === 'dark' ?  'white' : '#111'}]} placeholder='Your Name' placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'}
            value={fullName}
            onChangeText={(username)=> setFullName(username)}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color:currentTheme === 'dark' ?  'white' : '#7d7d7d'}]}>Email</Text>
        <TextInput
          style={[styles.inputStyle,{borderColor: currentTheme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.3)',color:currentTheme === 'dark' ?  'white' : '#111'}]} placeholder={'example@gmail.com'} placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'}
            value={email}
            onChangeText={(useremail) => setEmail(useremail)}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.labels,{color:currentTheme === 'dark' ?  'white' : '#7d7d7d'}]}>How we can help you?</Text>
        <TextInput
          style={[styles.inputStyle,styles.multilineStyle,{borderColor: currentTheme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.3)',color:currentTheme === 'dark' ?  'white' : '#111'}]} placeholder={'Your Consern'} placeholderTextColor={currentTheme === 'dark' ?  'white' : '#9CA3AF'} multiline
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
    paddingHorizontal:30,
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
  }
})