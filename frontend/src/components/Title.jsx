import { View, Text } from 'react-native';

export default function Title({ highline, mainline }) {
    return (
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 64, marginHorizontal: 24, marginBottom: 24 }}>
            <Text style={{ color: '#C4C4C4', fontSize: 16, fontWeight: 400, fontFamily: 'Oswald' }}>{highline}</Text>
            <Text style={{ color: '#E2E2E2', fontSize: 32, fontWeight: 700, fontFamily: 'Oswald' }}>{mainline}</Text>
        </View>
    );
}