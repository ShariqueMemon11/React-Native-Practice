import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import React , { useEffect } from 'react';

const webClientId = '534634868331-7irbmsiqsr3j0123df4f2vsfnsq4gaa9.apps.googleusercontent.com';
const androidClientId = '534634868331-dqmuh3igs41kmnjs25piviticf9mfkue.apps.googleusercontent.com';
const iosClientId = '534634868331-hp9olqpp3gkbtl1j33m7kmim0d7kjo0h.apps.googleusercontent.com';


const GoogleLoginButton = ({ onSuccess }) => {
  const config = {
    expoClientId: webClientId,
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    responseType: 'id_token',
    scopes: ['openid', 'email', 'profile'],
    redirectUri: makeRedirectUri({ useProxy:true }),
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () =>{
    if(response?.type === 'success'){
      const {authentication} = response;
      const token = authentication?.accessToken;
      console.log('access token', token);
    }
  }

  useEffect(() => {
    handleToken();
  },[response])
  
  return (
    <TouchableOpacity
      disabled={!request}
      onPress={async () => promptAsync()}>
      <Image source={require('../../../assets/images/googleIcon.png')} style={styles.socialIcon} />
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;

const styles = StyleSheet.create({
    socialIcon: {
        width: 64,
        height: 64,
      },

})
