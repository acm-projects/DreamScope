import { View, Text, TextInput, TouchableOpacity, TextInputProps, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width; // Get screen width

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;  // Ensures placeholder can be undefined
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title = '', // Default value to prevent undefined error
  value,
  placeholder = '',  // Ensures placeholder is never undefined
  handleChangeText,
  otherStyles = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  return (
    <View style={{ width: "100%", alignItems: "center" }}> {/* Ensures full width */}
      {/* Title */}
      {title ? (
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#EAEAEA',
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          alignSelf: 'flex-start',
        }}>
          {title} {/* Ensures title is always a string */}
        </Text>
      ) : null}

      {/* Input Container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: isFocused ? '#D7C9E3' : '#3e2756', // Fixed: valid color strings
          borderRadius: 50, // Fully rounded
          paddingHorizontal: 15,
          backgroundColor: '#121212', // Dark mode background
          height: 50,
          width: screenWidth * 0.9, // 90% of screen width
          maxWidth: 400, // Prevents stretching on large screens
        }}
      >
        {/* Input Field */}
        <TextInput
          style={{
            flex: 1,
            color: '#D7C9E3',
            fontSize: 16,
            paddingVertical: 10,
          }}
          value={value}
          placeholder={placeholder} // Ensures placeholder is never undefined
          placeholderTextColor="#7B718B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' ? !showPassword : false} // Ternary used
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Feather Icon for Password (using ternary for conditional rendering) */}
        {title === "Password" ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color={showPassword ? "white" : "#7B718B"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default FormField;
