import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React , {useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig';

const Loginscreen = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const submit = async () => {
    if (!email || !password) {
      Alert.alert('enter email and password to login')
      return
    }
    try{
      await signInWithEmailAndPassword(auth,email,password)
      onComplete()
    }
    catch{
      Alert.alert('login failed invalid email or password')
      setpassword('')
    }

  }
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView style={{backgroundColor:'#eaf4ff'}} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.mainContainer}>
          <Image source={require('../images/logo2.png')} style={styles.logo} resizeMode="contain" />
          
          <Text style={styles.subtitle}>
            Delivering Innovative And Robust Software Solutions Tailored To Your Business Needs
          </Text>
          <View style={styles.formContainer}>
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
              <Text style={styles.btntext}>LogIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyles}
              onPress={() => Alert.alert('Comming Soon')}
            >
              <Text style={styles.btntext}>SignIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Loginscreen

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
    marginTop:-180,
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
    maxWidth: 250,
    marginTop: 10,
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
})