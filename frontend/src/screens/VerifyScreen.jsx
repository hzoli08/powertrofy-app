import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import { colors, size } from '../theme';
import { supabase } from '../lib/supabase';

export default function VerifyScreen({ route, navigation }) {
    const { email, signup, username } = route.params;
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        const { data: codeData, error: codeError } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: 'email',
        });
        
        if (codeError) {
            console.error(codeError);
            alert('Invalid code');
            return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
            if (signup) {
                const { error: usernameError } = await supabase.auth.updateUser({
                    data: { display_name: username }
                });

                if (usernameError) {
                    console.error(usernameError);
                    alert('Issue with saving username');
                    return;
                }
            }
        } else {
            console.warn('No session found yet, retry update later');
        }

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