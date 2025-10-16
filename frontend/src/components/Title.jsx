import { View, Text } from 'react-native';
import { fonts, size } from '../theme';

export default function Title({ highline, mainline }) {
    return (
        <View style={{ flexDirection: 'column', marginTop: size.xxl }}>
            <Text style={fonts.subheading}>{highline}</Text>
            <Text style={[fonts.heading, { textTransform: 'uppercase' }]}>{mainline}</Text>
        </View>
    );
}