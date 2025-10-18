import { TouchableOpacity, Text } from 'react-native';
import { colors, size, fonts, box } from '../theme';

export default function PrimaryButton({ label, onPress, style }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[{ 
                width: box.full, 
                paddingVertical: size.md, 
                backgroundColor: colors.accent, 
                borderRadius: size.sm, 
                alignItems: 'center', 
                justifyContent: 'center'
            }, style]}
        ><Text style={[fonts.body, { fontWeight: 'bold' }]}>{label}</Text></TouchableOpacity>
    );
}