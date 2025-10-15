import { Text, TouchableOpacity } from 'react-native';
import { colors, size, fonts, box } from '../theme';

export default function Link({ label, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[fonts.body, { width: box.full, color: colors.accent, textAlign: 'center', textDecorationColor: colors.accent, textDecorationLine: 'underline', textDecorationStyle: 'solid' }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}