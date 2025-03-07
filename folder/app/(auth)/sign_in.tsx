import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { Redirect, router } from 'expo-router';

const Sign_in = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setSubmitting] = useState(false);

    const submit = () => {
        router.push('/home')
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
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-5"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-5"
                    />

                    <CustomButton
                        title="Log in"
                        handlePress={submit}
                        containerStyles="mt-10 px-10"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign_up"
                            className="text-lg font-extrabold text-light"
                        >
                            Signup
                        </Link>
                    </View>




                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Sign_in