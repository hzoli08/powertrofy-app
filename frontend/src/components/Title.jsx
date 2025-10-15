import { View, Text } from 'react-native';
import { fonts, size } from '../theme';

export default function Title({ highline, mainline }) {
    return (
        <View style={{ flexDirection: 'column', gap: size.xs, marginTop: size.xxl }}>
            <Text style={fonts.subheading}>{highline}</Text>
            <Text style={fonts.heading}>{mainline}</Text>
        </View>
    );
}