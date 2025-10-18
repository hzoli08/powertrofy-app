import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors, size, fonts, box } from '../theme';

export default function Input({ label, value, setValue, type }) {
    const [isActive, setIsActive] = useState(false);

    let keyboard = '';

    switch (type) {
        case 'text': keyboard = 'default'; break;
        case 'email': keyboard = 'email-address'; break;
        case 'code': keyboard = 'number-pad'; break;
        case 'number': keyboard = 'number-pad'; break;
    }

    return (
            <View>
                <Text style={[fonts.body, { transform: 'translateY(10%)', zIndex: 10, color: (isActive ? colors.accent : colors.sec_font), textAlign: 'center', width: (type == 'code' ? '30%' : '40%'), marginLeft: size.md, backgroundColor: (type == 'number' ? colors.sec_bg : colors.main_bg) }]}>{label}</Text>
                <TextInput
                    style={{ width: (type == 'number' ? 200 : box.full), padding: size.md, borderRadius: size.sm, borderWidth: 2, borderColor: (isActive ? colors.accent : colors.sec_font), color: colors.main_font, outlineWidth: (isActive ? 3 : 0), outlineColor: 'rgba(198, 43, 0, 0.25)', textAlign: (type == 'code' ? 'center' : 'left'), letterSpacing: (type == 'code' ? 15 : 1) }}
                    value={value}
                    onChangeText={setValue}
                    numberOfLines={1}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    keyboardType={keyboard}
                    maxLength={(keyboard == 'number-pad' ? 6 : 32)}
                />
            </View>
    );
}