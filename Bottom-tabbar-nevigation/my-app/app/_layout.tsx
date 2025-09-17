import { Stack } from 'expo-router';
import ThemeProvider, { ThemeContext } from '@/app/src/context/ThemeContext';
import { TabBarProvider } from '@/app/src/context/TabBarContext';
import { StatusBar, View } from 'react-native';
import React, {useContext , useState} from 'react';
import Onboard from '@/app/src/component/onboard'
import Membersship from '@/app/src/component/membership'
import SplashScreen from '@/app/src/screens/SplashScreen';
import Loginscreen from '@/app/src/screens/loginscreen';

function ThemedStatusBar() {
  const { currentTheme } = useContext(ThemeContext);
  const barStyle = currentTheme === 'dark' ? 'light-content' : 'dark-content';
  return <StatusBar barStyle={barStyle} />;
}

export default function RootLayout() {
  const [showSplashscreen, setSplashscreen] = useState(true)
  const [showLogin, setLogin] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false); 
  const [showmembership, setshowmembership] = useState(true)

  return (

    <ThemeProvider>
      <TabBarProvider>
        <ThemedStatusBar />
        {/* {showSplashscreen ? (
          <SplashScreen Oncomplete={() => setSplashscreen(false)} />
        ) : showLogin ?
        (
          <Loginscreen onComplete={() => setLogin(false)}/>
        ): */}
        {showOnboarding ? (
          <Onboard onComplete={() => setShowOnboarding(false)} />
        ) : showmembership ? (
          <Membersship onComplete={() => setshowmembership(false)} />
        ) :
        (
          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="Webview" />
          </Stack>
        )
        }
      </TabBarProvider>
    </ThemeProvider>
  );
}


