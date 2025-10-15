import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import Link from '../components/Link';
import { supabase } from '../lib/supabase';
import { colors, size, box } from '../theme';

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
        <View style={{ flex: 1, justifyContent: 'flex-start', gap: size.lg, backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='Track your progress...' mainline='Like a powerbuilder' />
            <View style={{ gap: size.xs }}>
                <Input label='Enter your name' value={name} setValue={setName} type='text' />
                <Input label='Enter your email' value={email} setValue={setEmail} type='email' />
            </View>
            <Link label='Already have an account? Log in' onPress={() => navigation.navigate('Login')} />
            <PrimaryButton label='Send Me the Code' onPress={handleSignup} />
        </View>
    );
}