import { useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import { supabase } from '../lib/supabase';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({ 
            email,
            options: { shouldCreateUser: true, emailRedirectTo: undefined }
        });
        if (error) alert(error.message);
        else navigation.navigate('Verify', { email });
    };

    return (
        <View style={{ backgroundColor: '#232323', height: '100%' }}>
            <Title highline='Track your progress...' mainline='Like a warrior' />
            <Input placeholder='Enter your name' value={name} setValue={setName} type='text' />
            <Input placeholder='Enter your email' value={email} setValue={setEmail} type='email' />
            <PrimaryButton title='Send Code' onPress={handleSignup} />
            <Text onPress={() => navigation.navigate('Login')} style={{ marginTop: 10, color: 'blue' }}>
                Already have an account? Log in
            </Text>
        </View>
    );
}