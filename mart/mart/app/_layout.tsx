import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useState } from 'react';
import SplashScreen from './src/screens/splashscreen';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const [showSplashscreen, setSplashscreen] = useState(true)
  
  return showSplashscreen ? (
    <SplashScreen Oncomplete={() => setSplashscreen(false)} />
  ) : (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
