import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({ 
            email,
            options: { shouldCreateUser: false, emailRedirectTo: undefined }
        });
        if (error) alert(error.message);
        else navigation.navigate('Verify', { email });
    };

    return (
        <View style={{ backgroundColor: '#232323', height: '100%' }}>
            <Title highline='Welcome back' mainline='Among hard lifters' />
            <Text>Enter your email to login</Text>
            <Input placeholder='Email' value={email} setValue={setEmail} type='email' />
            <PrimaryButton title='Send Code' onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Signup')} style={{ marginTop: 10, color: 'blue' }}>
                Don't have an account? Sign up
            </Text>
        </View>
    );
}