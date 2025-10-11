import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ navigation }) {
    const [email, setEmail] = React.useState('');

    async function sendCode() {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            alert(error.message);
            return;
        }
        alert('Check email for code');
        navigation.replace('Dashboard');
    }

    return (
        <View className='mt-10 flex-1 items-center justify-center bg-gray-900 p-4'>
            <Text className='text-white text-xl mb-4'>Sign In</Text>
            <TextInput 
                placeholder='email'
                value={email}
                onChangeText={setEmail}
                className='w-full bg-gray-800 text-white px-3 py-2 rounded-md mb-3'
            />
            <Button title='Send code' onPress={sendCode} />
        </View>
    );
}