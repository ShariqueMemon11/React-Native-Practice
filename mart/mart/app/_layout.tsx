import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useState } from 'react';
import SplashScreen from './src/screens/splashscreen';
import MainScreen from './src/screens/main';


export default function RootLayout() {

  const [showSplashscreen, setSplashscreen] = useState(true)
  const [showMainscreen, setMainScreen] = useState(true)

  return showSplashscreen ? (
    <SplashScreen Oncomplete={() => setSplashscreen(false)} />
  ) : showMainscreen ? (
    <MainScreen Oncomplete={()=>setMainScreen(false)}/>
  ) : 
  (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
