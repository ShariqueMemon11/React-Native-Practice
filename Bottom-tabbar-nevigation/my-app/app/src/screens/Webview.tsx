import { View, Text, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'

const Webview: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigation = useNavigation<any>()
  const submit = () => {
    if (!fullName || !email || !message) {
      Alert.alert('Fill all the fields to submit')
      return
    }
    Alert.alert('Message Submitted Successfully')
    navigation.navigate('(Home)')
  }
  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'#eaf4ff'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
    <ScrollView style={{backgroundColor:'#eaf4ff'}} contentContainerStyle={{paddingBottom:24}} keyboardShouldPersistTaps={'handled'}>
    <View style={styles.mainContainer}>
      <Image source={require('../images/logo2.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.mainHader}>Delivering innovative and robust software solutions tailored to your business needs</Text>

      <View style={{backgroundColor:'#f5faff' , padding:10,borderRadius:20}}>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Name</Text>
        <TextInput
          style={styles.inputStyle} placeholder='Your Name' placeholderTextColor={'#9CA3AF'}
            value={fullName}
            onChangeText={(username)=> setFullName(username)}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={styles.inputStyle} placeholder={'example@gmail.com'} placeholderTextColor={'#9CA3AF'}
            value={email}
            onChangeText={(useremail) => setEmail(useremail)}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>How we can help you?</Text>
        <TextInput
          style={[styles.inputStyle,styles.multilineStyle]} placeholder={'Your Consern'} placeholderTextColor={'#9CA3AF'} multiline
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
    color: "#7d7d7d",
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
    color: '#111',
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