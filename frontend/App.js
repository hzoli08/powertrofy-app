import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Oswald_400Regular, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import { Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_600SemiBold,
    Roboto_300Light,
    Roboto_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return <AppNavigator />;
}