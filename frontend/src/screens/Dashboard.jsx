import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View } from 'react-native';
import Title from '../components/Title';
import { colors, size } from '../theme';

export default function Dashboard() {
    const [username, setUsername] = useState('Gymbro');
    
    const date = new Date();
    const hour = date.getHours();
    let greeting = '';
    if (4 < hour && hour < 12) greeting = 'Time to get moving,';
    else if (hour >= 12 && hour < 18) greeting = 'Keep momentum going,';
    else if (hour >= 18 && hour < 22) greeting = 'Slow down, but stay active,';
    else if (hour >= 22 || hour < 5) greeting = 'Finish strong, rest well,';
    else greeting = 'Error, no way this happens,';
    
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.display_name) {
                setUsername(user.user_metadata.display_name);
            }
        };
        getUser();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline={greeting} mainline={'Hello, ' + username} />
        </View>
    );
}