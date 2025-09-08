import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React , { useEffect } from 'react';

const webClientId = '534634868331-7irbmsiqsr3j0123df4f2vsfnsq4gaa9.apps.googleusercontent.com';
const androidClientId = '534634868331-dqmuh3igs41kmnjs25piviticf9mfkue.apps.googleusercontent.com';
const iosClientId = '534634868331-hp9olqpp3gkbtl1j33m7kmim0d7kjo0h.apps.googleusercontent.com';


WebBrowser.maybeCompleteAuthSession();




const GoogleLoginButton = ({ onSuccess }) => {
  const config = {
    webClientId: webClientId,
    androidClientId: androidClientId,
    iosClientId: iosClientId,
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
  // Hardcode Expo Auth proxy URL to avoid accidental exp:// redirects
  // const proxyRedirectUri = 'https://auth.expo.dev/@shariq1122/my-app';
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: '207363485397-pr09p2gmc65ou08hjsia0gbocev5i6vf.apps.googleusercontent.com',
  //   androidClientId: '207363485397-cneme1e2cb8h7h51esop7qhg3kop14nr.apps.googleusercontent.com',
  //   iosClientId: '207363485397-95q2n72oq6qsoblnidqjln9loo4b15b3.apps.googleusercontent.com',
  //   responseType: 'id_token',
  //   scopes: ['openid', 'email', 'profile'],
  //   redirectUri: proxyRedirectUri,
  // });

  // useEffect(() => {
  //   // Debug log to inspect Google response and any error details
  //   console.log('redirectUri', proxyRedirectUri);
  //   if (response) {
  //     try {
  //       console.log('Google response', JSON.stringify(response));
  //       if (response.type === 'error') {
  //         console.log('Google auth error:', response.error, response.params?.error, response.params?.error_description);
  //       }
  //     } catch (_) {}
  //   }

  //   const doLogin = async () => {
  //     if (response?.type === 'success') {
  //       const idToken = response.authentication?.idToken;
  //       if (!idToken) return;
  //       const credential = GoogleAuthProvider.credential(idToken);
  //       try {
  //         await signInWithCredential(auth, credential);
  //       } catch (e) {
  //         console.log('firebase signIn error', e);
  //       }
  //       onSuccess?.()
  //     }
  //   };
  //   doLogin();
  // }, [response]);

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
