import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import Link from '../components/Link';
import { supabase } from '../lib/supabase';
import { colors, size } from '../theme';

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
        <View style={{ flex: 1, justifyContent: 'flex-start', gap: size.lg, backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='Welcome back' mainline='To POWERTROFY' />
            <Input label='Enter email to log in' value={email} setValue={setEmail} type='email' />
            <Link label='Has no account? Sign up' onPress={() => navigation.navigate('Signup')} />
            <PrimaryButton label='Send Me the Code' onPress={handleLogin} />
        </View>
    );
}