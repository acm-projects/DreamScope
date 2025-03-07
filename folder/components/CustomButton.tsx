import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

// Define the props interface
interface CustomButtonProps {
    title: string;
    handlePress: (event: GestureResponderEvent) => void;
}

// Annotate the component with the props type
const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`mt-5 bg-light p-4 rounded-3xl ${containerStyles}`}
        >
            <Text className="font-bold text-lg">{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;