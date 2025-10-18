import { View, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors, size, fonts, box } from '../theme';

export default function DashboardCard({ title, children, type }) {
    return (
        <View style={{ width: box.full, backgroundColor: colors.sec_bg, padding: size.md, borderRadius: size.sm, marginTop: size.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={fonts.subheading}>{title}</Text>
                {type == 'bodyweight' ? <></> : <></>}
            </View>
            {children}
        </View>
    );
}