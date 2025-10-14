import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({ 
            email,
            options: { shouldCreateUser: true, emailRedirectTo: undefined }
        });
        if (error) alert(error.message);
        else navigation.navigate('Verify', { email });
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter your email to sign up</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            />
            <Button title='Send Code' onPress={handleSignup} />
            <Text onPress={() => navigation.navigate('Login')} style={{ marginTop: 10, color: 'blue' }}>
                Already have an account? Log in
            </Text>
        </View>
    );
}