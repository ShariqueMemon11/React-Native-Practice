import { Tabs } from 'expo-router';
import { ThemeContext } from '@/app/src/context/ThemeContext';
import React, { useContext } from 'react'
import { useTabBar } from '@/app/src/context/TabBarContext';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabBarLayout1 } from '../src/component/TabBarlayout1';
import TabBarLayout2 from '../src/component/TabBarlayout2';

// custom tab bars (simple styled variants)
const Layout1TabBar: React.FC<BottomTabBarProps> = (props) => (
	<TabBarLayout1 {...props} />
);
const Layout2TabBar: React.FC<BottomTabBarProps> = (props) => (
	<TabBarLayout2 {...props} />
);
export default function TabsLayout() {
	
	const {currentTheme} = useContext(ThemeContext)
	const { variant } = useTabBar();
	const tabBar =
		variant === 'layout1'
			? (props: BottomTabBarProps) => <Layout1TabBar {...props} />
			: variant === 'layout2'
			? (props: BottomTabBarProps) => <Layout2TabBar {...props} />
			: undefined;
	return (
		<Tabs screenOptions={{
			headerStyle: { backgroundColor: currentTheme === 'dark' ? '#333':'white' },
			headerTintColor: currentTheme === 'dark' ? 'white': '#333',
		}}
		tabBar={tabBar}
		>
			<Tabs.Screen name='(Home)' options={{ title: 'Home', headerShown: false}} />
			<Tabs.Screen name="Webview" options={{ title: 'WebView' , headerShown: false}} />
			<Tabs.Screen name="(Add)" options={{ title: 'Add', headerShown: false }} />
			<Tabs.Screen name="Profile" options={{ title: 'Profile' , headerShown: false}} />
			<Tabs.Screen name="Settings" options={{ title: 'Settings', headerShown: false }} />
		</Tabs>
	);
}

