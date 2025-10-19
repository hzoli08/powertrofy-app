import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View, Text } from 'react-native';
import Title from '../components/Title';
import DashboardCard from '../components/DashboardCard';
import Dropdown from '../components/Dropdown';
import PrimaryButton from '../components/PrimaryButton';
import { colors, size, fonts, box } from '../theme';
import Input from '../components/Input';
import { logWeight, getWeights } from '../lib/bodyweight';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const data = await getWeights(user.id, time);
                setWeights(data);
            } catch (err) { console.error('Error fetching weights:', err.message); }
            finally { setLoading(false); }
        }
        fetchWeights();
    }, [time]);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.display_name) {
                setUsername(user.user_metadata.display_name);
            }
        };
        getUser();
    }, []);
    
    const weightsData = weights.map(w => w.weight);
    const buffer = 1;
    const minY = Math.min(...weightsData) - buffer;
    const maxY = Math.max(...weightsData) + buffer;

    const labelStep = Math.ceil(weights.length / 5);
    const filteredLabels = weights
        .map((w, i) =>
            i % labelStep === 0
                ? new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : ''
    );

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline={greeting} mainline={'Hello, ' + username} />
            <DashboardCard title='Track your bodyweight' type='bodyweight'>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
                    <Input label='Bodyweight' type='number' value={bodyweight} setValue={setBodyweight} />
                    <Dropdown options={[ 'kg', 'lbs' ]} original='kg' position={{ right: 0, top: 2 - size.xl }} />
                </View>
                {weights.length > 0 ? (
                <LineChart
                    data={{
                        labels: filteredLabels,
                        datasets: [{ data: [weights.map(w => w.weight)]}],
                    }}
                    width={Dimensions.get('window').width - (size.lg + size.md) * 2}
                    height={220}
                    yAxisSuffix=' kg'
                    fromZero={false}
                    fromNumber={maxY + 0.5}
                    withInnerLines={false}
                    withOuterLines={false}
                    segments={4}
                    chartConfig={{
                        backgroundColor: colors.sec_bg,
                        backgroundGradientFrom: colors.sec_bg,
                        backgroundGradientTo: colors.sec_bg,
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(198, 43, 0, 0.75)`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: size.md },
                        propsForDots: { r: '1', strokeWidth: '0', stroke: colors.accent, fill: colors.sec_accent },
                    }}
                    bezier
                    style={{ marginVertical: size.md, borderRadius: size.sm }}
                    yLabelsOffset={5}
                    formatYLabel={(val) => `${val}`}
                />
                ) : ( <Text style={fonts.body}>No data yet. Log your first weight!</Text> )}
                <View style={{ width: box.full, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Dropdown options={[ 14, 30, 90, 180 ]} original={30} />
                    <PrimaryButton label='Log Bodyweight' onPress={
                        async () => {
                            try {
                                const { data: { user } } = await supabase.auth.getUser();
                                if (!user) return alert('Not logged in');
                                await logWeight(user.id, bodyweight);
                                const updated = await getWeights(user.id, time);
                                setWeights(updated);
                            } catch (err) { alert('Error logging weight: ' + err.message) }
                        }
                    } style={{ width: '65%' }} />
                </View>
            </DashboardCard>
        </View>
    );
}