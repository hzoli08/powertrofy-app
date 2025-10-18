import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View } from 'react-native';
import Title from '../components/Title';
import DashboardCard from '../components/DashboardCard';
import Dropdown from '../components/Dropdown';
import PrimaryButton from '../components/PrimaryButton';
import { colors, size, box } from '../theme';
import Input from '../components/Input';
import { logWeight, getWeights } from '../lib/bodyweight';

export default function Dashboard() {
    const [bodyweight, setBodyweight] = useState(0);
    const [weights, setWeights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(30);
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
        const fetchWeights = async () => {
            try {
                const data = await getWeights(30);
                setWeights(data);
            } catch (err) { console.error('Error fetching weights:', err.message); }
            finally { setLoading(false); }
        }
        fetchWeights();
    }, []);

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
            <DashboardCard title='Track your bodyweight' type='bodyweight'>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
                    <Input label='Bodyweight' type='number' value={bodyweight} setValue={setBodyweight} />
                    <Dropdown options={[ 'kg', 'lbs' ]} original='kg' position={{ right: 0, top: 2 - size.xl }} />
                </View>
                <View style={{ width: box.full, flexDirection: 'row', justifyContent: 'space-between', marginTop: size.md }}>
                    <Dropdown options={[ 14, 30, 90, 180 ]} original={30} />
                    <PrimaryButton label='Log Bodyweight' onPress={
                        async () => {
                            try {
                                await logWeight(inputWeight);
                                const updated = await getWeights(30);
                                setWeights(updated);
                            } catch (err) { alert('Error logging weight: ' + err.message) }
                        }
                    } style={{ width: '65%' }} />
                </View>
            </DashboardCard>
        </View>
    );
}