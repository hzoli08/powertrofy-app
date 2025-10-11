import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function VerifyScreen({ route, navigation }) {
    const { email } = route.params;
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: 'email',
        });
        
        if (error) {
            console.error(error);
            alert('Invalid code');
            return;
        }

        console.log('Verified user:', data);
        navigation.navigate('Dashboard');
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter the 6-digit code sent to {email}</Text>
            <TextInput 
                value={code}
                onChangeText={setCode}
                placeholder='Enter code'
                keyboardType='number-pad'
                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            />
            <Button title='Verify' onPress={handleVerify} />
        </View>
    );
}