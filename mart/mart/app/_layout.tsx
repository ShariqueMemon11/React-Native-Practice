import 'react-native-reanimated';
import { useState } from 'react';
import SplashScreen from './src/screens/splashscreen';
import MainScreen from './src/screens/main';
import GroceryScreen from './(screens)/grocery';
import MedicineScreen from './(screens)/medicines';


export default function RootLayout() {
  const [showSplashscreen, setSplashscreen] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<'grocery' | 'medicines' | null>(null)

  if (showSplashscreen) {
    return <SplashScreen Oncomplete={() => setSplashscreen(false)} />;
  }

  if (currentScreen === 'grocery') {
    return <GroceryScreen onBack={() => setCurrentScreen(null)} />;
  }

  if (currentScreen === 'medicines') {
    return <MedicineScreen onBack={() => setCurrentScreen(null)} />;
  }

  // Show main screen when currentScreen is null
  return <MainScreen 
    onNavigate={(screen: 'grocery' | 'medicines') => {
      setCurrentScreen(screen);
    }}
  />;
}
