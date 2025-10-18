import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Title from '../components/Title';
import { colors, size } from '../theme';
import { supabase } from '../lib/supabase';

export default function VerifyScreen({ route, navigation }) {
    const { email, signup, username: passedUsername } = route.params;
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

        let username = passedUsername;

        await new Promise((res) => setTimeout(res, 1000));

        if (signup) {
            const { error: usernameError } = await supabase.auth.updateUser({
                data: { display_name: username },
            });
            if (usernameError) {
                console.error(usernameError);
                alert('Issue saving username');
                return;
            }
        }

        // const { data: refreshedUser, error: refreshError } = await supabase.auth.getUser();
        // if (refreshError) {
        //     console.error(refreshError);
        //     alert('Could not fetch user info');
        //     return;
        // }

        // username = refreshedUser?.user?.user_metadata?.display_name || 'Gymbro';

        // navigation.navigate('MainTabs', { 
        //     screen: 'Dashboard',
        //     params: { username } 
        // });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', gap: size.lg, backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='Enter the code' mainline='We sent in Email' />
            <Input label='Enter code' value={code} setValue={setCode} type='code' />
            <PrimaryButton label='Verify Me' onPress={handleVerify} />
        </View>
    );
}