import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const Sign_up = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isSubmitting, setSubmitting] = useState(false);

    const submit = () => {

    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className=" items-center justify-center p-4">
                    <Text className="mt-5 px-5 font-custom text-3xl leading-relaxed color-light" >
                        D
                        <Text className="color-secondary">
                            ream
                        </Text>
                        S
                        <Text className="color-secondary">
                            cope
                        </Text>
                    </Text>

                    <Image
                        source={require('../../assets/images/logo.png')}
                        className="w-32 h-32 mt-2"
                        resizeMode="contain"
                    />

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-10"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-5"
                    />

                    <FormField
                        title="Confirm Password"
                        value={form.confirmPassword}
                        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                        otherStyles="mt-5"
                    />



                    <CustomButton
                        title="Register"
                        handlePress={submit}
                        containerStyles="mt-10 px-10"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Already have an account?
                        </Text>
                        <Link
                            href="/sign_in"
                            className="text-lg font-extrabold text-light"
                        >
                            Login
                        </Link>
                    </View>




                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Sign_up