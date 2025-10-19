import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors, size, fonts, box } from '../theme';

export default function Dropdown({ options, original, position, time, setTime }) {
    const [option, setOption] = useState(original || options[0]);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (original && options.includes(original)) {
            setOption(original);
        }
    }, [original]);

    const optionItems = options.map(option => (
        <TouchableOpacity key={option} style={{ padding: size.md, width: box.full, alignItems: 'center' }} onPress={() => {
            setOption(option);
            if (setTime) setTime(option);
            setShowOptions(false);
        }}>
            <Text style={fonts.body}>{option}</Text>
        </TouchableOpacity>
    ));
    
    return (
        <>
            <View style={{ backgroundColor: colors.sec_bg, width: '30%', borderRadius: size.sm, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.main_font, color: colors.main_font, position: 'relative' }}>
                <TouchableOpacity style={{ paddingVertical: size.md, width: box.full, alignItems: 'center' }} onPress={() => setShowOptions(!showOptions)}>
                    <Text style={[fonts.body]}>{(option != '' ? option : original)}</Text>
                </TouchableOpacity>
            </View>
            {showOptions ? <View style={[position, { backgroundColor: colors.sec_bg, position: 'absolute', borderRadius: size.sm, alignItems: 'center', boxShadow: '0px -4px 24px rgba(0,0,0,0.25)', width: '30%', zIndex: 50 }]}>{optionItems}</View> : <></>}
        </>
    );
}