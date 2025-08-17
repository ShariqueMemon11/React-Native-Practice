import { Stack } from 'expo-router';
import ThemeProvider from './src/context/ThemeContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { StatusBar } from 'react-native';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import React, {useContext , useState} from 'react';
import Onboard from '../app/src/component/onboard'

function ThemedStatusBar() {
  const { currentTheme } = useContext(ThemeContext);
  const barStyle = currentTheme === 'dark' ? 'light-content' : 'dark-content';
  return <StatusBar barStyle={barStyle} />;
}

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState(true); // Control onboarding visibility

  return (
    <ThemeProvider>
      <TabBarProvider>
        <ThemedStatusBar />
        {showOnboarding ? (
          <Onboard onComplete={() => setShowOnboarding(false)} />
        ) : (
          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        )}
      </TabBarProvider>
    </ThemeProvider>
  );
}


