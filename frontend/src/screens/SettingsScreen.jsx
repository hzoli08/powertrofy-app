import { View } from 'react-native';
import Title from '../components/Title';
import { colors, size } from '../theme';

export default function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main_bg, paddingHorizontal: size.lg }}>
            <Title highline='Customize the app' mainline='To get the best experience' />
        </View>
    );
}