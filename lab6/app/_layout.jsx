import { Stack } from 'expo-router';
import AuthProvider from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}