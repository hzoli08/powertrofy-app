import { View } from 'react-native';
import Title from '../components/Title';
import { colors, size } from '../theme';

export default function StatisticsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='View and celebrate' mainline='Your recent progress' />
        </View>
    );
}