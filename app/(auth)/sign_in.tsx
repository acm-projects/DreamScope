import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '../../Frontend/components/FormField'
import CustomButton from '../../Frontend/components/CustomButton'
import { Link } from 'expo-router'
import { Redirect, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/firebaseConfig'; // Import auth
import AsyncStorage from '@react-native-async-storage/async-storage'


const Sign_in = () => {
    const [form, setForm] = useState({
    email: '',
    password: ''
})
const [isSubmitting, setSubmitting] = useState(false);

const submit = async () => {
    if (!form.email || !form.password) {
        alert("Please enter email and password");
        return;
}
    setSubmitting(true);
    try {

        await signInWithEmailAndPassword(auth, form.email, form.password);
        console.log("User signed in successfully!");
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        router.push('../home');

    } catch (error : unknown) {
        if (error instanceof Error) {
            console.error("Sign in error:", error.message);
        } else {
            console.error("An unknown error occurred");
        }
        alert("Failed to sign in. Check credentials.");
    }
    setSubmitting(false);
};
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
                        source={require('../../Frontend/assets/images/logo.png')}
                        className="w-32 h-32 mt-2"
                        resizeMode="contain"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder=''
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-5"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder =''
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