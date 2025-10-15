import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input({ label, value, setValue, type }) {
    if (type == 'text' || type == 'email') {
        return (
            <View className=''>
                <Text className=''>{label}</Text>
                <TextInput
                    className=''
                    value={value}
                    onChangeText={setValue}
                    numberOfLines={1}
                    keyboardType={(type == 'text' ? 'default' : 'email-address')}
                />
            </View>
        );
    } else if (type == 'code') {
        return (
            <View>
                <Text>{label}</Text>
                <View>
                    <TextInput maxLength={1} keyboardType='number-pad' />
                </View>
            </View>
        );
    }
}