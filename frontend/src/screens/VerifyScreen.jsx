import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import { colors, size, fonts, box } from '../theme';
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
        <View style={{ flex: 1, justifyContent: 'flex-start', gap: size.lg, backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='Enter the code' mainline='We sent in Email' />
            <Input label='Enter code' value={code} setValue={setCode} type='code' />
            <PrimaryButton label='Verify Me' onPress={handleVerify} />
        </View>
    );
}