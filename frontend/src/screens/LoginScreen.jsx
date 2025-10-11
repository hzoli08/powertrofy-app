import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({ 
            email,
            options: { shouldCreateUser: true }
        });
        if (error) alert(error.message);
        else navigation.navigate('Verify', { email });
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter your email to login</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            />
            <Button title='Send Code' onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Signup')} style={{ marginTop: 10, color: 'blue' }}>
                Don't have an account? Sign up
            </Text>
        </View>
    );
}