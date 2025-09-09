import {
    StyleSheet,Text,View,Image,TextInput,TouchableOpacity,ScrollView,Alert,
} from "react-native";
  import * as Notifications from 'expo-notifications';
  import React, { useState } from "react";
  import { auth } from "../../../firebaseConfig";
  import { Feather } from "@expo/vector-icons";
  import { sendPasswordResetEmail } from "firebase/auth";
import { router } from "expo-router";
  
  export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("");

    const handlePassword = async () => {
      if (!email) {
        Alert.alert('Please enter your email');
        return;
      }
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        await sendPasswordResetEmail(auth, email);
        if (status === 'granted') {
          await Notifications.scheduleNotificationAsync({
            content: { body: 'Password reset link has been sent to your email' },
            trigger: null,
          });
        }
        Alert.alert('Check your inbox', 'If an account exists, a reset link was sent.');
        setEmail('');
      } catch (e: any) {
        const message = e?.message || 'Could not send reset email. Please try again.';
        Alert.alert('Error', message);
      }
    };
    return (
       <View style={styles.container}>
          <TouchableOpacity onPress={() => router.push('/src/screens/loginscreen')} style={{ paddingVertical: 8 , marginTop: 12 , marginBottom:-10}}>
           <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/forgot.png")}
            style={{ width: 300, height: 220 }}
          />
        </View>
  
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={{ paddingVertical: 16, alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.text}>Forgot your password?</Text>
          </View>
          <View style={styles.emailContainer}>
            <Feather
              name="mail"
              size={20}
              color="gray"
              style={{ marginLeft: 15 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email address here"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePassword}
          >
            <View>
              <Text style={styles.send}>Send password reset link</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.spam}>
            <Text style={{ fontSize: 12, color: "#000", fontWeight: "400" }}>
              Check your email spam folder to find password reset link
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: "stretch",
      paddingHorizontal: 15,
      paddingTop: "8%",
    },
    imageContainer: {
      marginTop: 55,
      marginBottom: 20,
      alignItems: 'center',
    },
    emailContainer: {
      marginTop: 15,
      width: "100%",
      height: 50,
      backgroundColor: "#FFFF",
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      flex: 1,
      color: "#000",
      fontSize: 16,
      paddingHorizontal: 7,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: "5%",
      width: "100%",
      height: 50,
      backgroundColor: "#2F3080",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginBottom: 10,
    },
    button: {
      color: "#FFFF",
      fontSize: 18,
    },
    send: {
      color: "#FFFF",
      fontSize: 18,
    },
    spam: {
      marginTop: 3,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    text: {
      fontSize: 17,
      fontWeight: "bold",
    },
    formContainer: {
      width: "100%",
      flexGrow: 1,
    },
  });
  
   