import { Button } from 'react-native';

export default function PrimaryButton({ title, onPress }) {
    return (
        <Button 
            onPress={onPress}
            title={title}
            className=''
            style={{ backgroundColor: 'black' }}
        />
    );
}