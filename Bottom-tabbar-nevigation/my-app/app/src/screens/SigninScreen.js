import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React , {useState} from 'react'
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { doc ,setDoc } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';
import { router , useLocalSearchParams} from 'expo-router';
import { db } from '@/firebaseConfig';
import GoogleLoginButton from '../component/googlesignup';
import { AntDesign, Feather } from '@expo/vector-icons';

const SigninScreen = ({ onComplete }) => {
  const { plan,membership, price } = useLocalSearchParams();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[A-Z]).{8,}$/
  const submit = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('enter name email and password to signup')
      return
    }
    if (!emailRegex.test(email)){
      Alert.alert('Enter valid email')
      return
    }
    if(!passRegex.test(password)){
      Alert.alert("least 8 chars, with at least one uppercase:")
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword (auth,email,password)
      await updateProfile(userCredential.user , {displayName : fullName })
      await setDoc(doc(db , 'users', userCredential.user.uid),
      {fullName , email , createdAt: new Date()})
     onComplete()
     router.push("/src/screens/loginscreen")
    }
    catch(error){
      Alert.alert('SignUp failed try again', error.message)
      setpassword('')
      setEmail('')
      setFullName('')
    }
  }
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView style={{backgroundColor:'#eaf4ff'}} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.mainContainer}>
          <Image source={require('../images/logo2.png')} style={styles.logo} resizeMode="contain" />
          <View style={[styles.membership,{backgroundColor: plan === 'silver' ? '#B2B0B3' : plan ==='gold'? '#ECC14E' : '#E1E1E1',}]}>          
           <AntDesign name='crown' color={'white'} size={30} />
           <View>
            <Text style={{marginBottom:5, color:'white'}}>{membership}</Text>
            <Text style={{fontSize:18, color:'white'}}>{price}</Text>
           </View>
          </View>
          <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
              <Text style={styles.labels}>Full Name</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Your Name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="example@gmail.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Password</Text>
              <TextInput
                style={styles.inputStyle} placeholder={'Enter Password'} 
                placeholderTextColor={'#9CA3AF'} secureTextEntry
                value={password}
                onChangeText={(password)=>setpassword(password)}
                />
                
            </View>
            {/* Optionally add a Forgot Password link here */}
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.btnStyles}
              onPress={submit}
            >
              <Text style={styles.btntext}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>Or</Text>
          <View style={styles.socialContainer}>
            <GoogleLoginButton onSuccess={() => router.push('/src/component/onboard')} />
          </View>
          <Text style={styles.AllText}>Already have an account? <Text style={{color:'blue'}} onPress={() => [router.push('/src/screens/loginscreen'), onComplete(false)]}>log In</Text></Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: '#eaf4ff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#eaf4ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: -40,
    alignSelf: 'center',
    marginTop:-100,
    marginLeft:-15
  },
 
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  labels: {
    fontWeight: "bold",
    color: "#7d7d7d",
    paddingBottom: 5,
    fontFamily: "JosefinSans_300Light",
    lineHeight: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafd',
    color: '#111',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 280,
    marginTop: 5,
  },
  btnStyles: {
    flex: 1,
    borderRadius: 40,
    paddingVertical: 14,
    marginHorizontal: 8,
    backgroundColor: '#2f7acf',
    alignItems: 'center',
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orText: {
    marginTop:27,
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    fontFamily:'JosefinSans_300Light',
    textAlign:'center',
    marginBottom:20
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: -5,
  },
  AllText: {
    marginTop:20,
    fontSize:16,
    color:'black',
    fontFamily:'JosefinSans_300Light',
    textAlign:'center',
  },
  membership:{
      flexDirection:'row',
      gap:20 , 
      marginTop:-20,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderRadius: 10,   
      backgroundColor:"#A20000",
      paddingRight:70,
      borderColor:'transparent'
    }
  
  
  
})    