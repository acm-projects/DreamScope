import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [showPassword, setShowPassword] = useState(false); // For "Password"
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For "Confirm Password"

  return (
    <View>
      <Text className={`text-base text-light font-bold mb-1 pl-3 ${otherStyles}`}>
        {title}
      </Text>

      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? 'border-light' : 'border-white'} 
                  flex flex-row items-center`}
      >
        <TextInput
          className="flex-1 text-light font-semibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' ? !showPassword : title === 'Confirm Password' ? !showConfirmPassword : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Password Visibility Toggle */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}

        {title === "Confirm Password" && (
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
