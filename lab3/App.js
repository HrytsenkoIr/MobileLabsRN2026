import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider, AppContext } from './src/context/AppContext';

import ClickerScreen from './src/screens/ClickerScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const { theme } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e' },
        headerTitleStyle: { color: theme === 'light' ? '#000' : '#fff' },
        tabBarStyle: { backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e' }
      }}>
        <Tab.Screen name="Gesture Clicker" component={ClickerScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <StatusBar hidden={true} />
        <MainNavigator />
      </AppProvider>
    </GestureHandlerRootView>
  );
}