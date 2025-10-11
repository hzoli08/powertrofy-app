import React from 'react';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyScreen from '../screens/VerifyScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Verify' component={VerifyScreen} />
        </Stack.Navigator>
    );
}