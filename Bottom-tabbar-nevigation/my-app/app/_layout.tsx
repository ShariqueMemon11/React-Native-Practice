import { Stack } from 'expo-router';
import ThemeProvider from './src/context/ThemeContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import React, {useContext , useState} from 'react';
import Onboard from '../app/src/component/onboard'
import SplashScreen from './src/screens/SplashScreen';
import Loginscreen from './src/screens/loginscreen';

function ThemedStatusBar() {
  const { currentTheme } = useContext(ThemeContext);
  const barStyle = currentTheme === 'dark' ? 'light-content' : 'dark-content';
  return <StatusBar barStyle={barStyle} />;
}

export default function RootLayout() {
  const [showSplashscreen, setSplashscreen] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true); 

  return (

    <ThemeProvider>
      <TabBarProvider>
        <ThemedStatusBar />
        {showSplashscreen ? (
          <SplashScreen Oncomplete={() => setSplashscreen(false)} />
         ) :
        // (
        //   <Loginscreen/>
        //  ) 
         showOnboarding ? (
          <Onboard onComplete={() => setShowOnboarding(false)} />
        ) : (
          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        )
        }
      </TabBarProvider>
    </ThemeProvider>
  );
}


