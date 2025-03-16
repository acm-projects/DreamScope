import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';

import { Link } from 'expo-router';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/firebaseConfig';
import { Button, ButtonText } from '../../components/ui/button';

const Sign_up = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isSubmitting, setSubmitting] = useState(false);

    const submit = async () => {
        if (!form.email || !form.password || !form.confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setSubmitting(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log('User registered successfully!', userCredential.user);
            router.push('../home');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Sign up error:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
            alert('Failed to sign up. Try again.');
        }
        setSubmitting(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="items-center justify-center p-4">
                    {/* Logo & Title */}
                    <Text className="mt-5 px-5 font-custom text-3xl leading-relaxed color-light">
                        <Text>D</Text>
                        <Text className="color-secondary">ream</Text>
                        <Text>S</Text>
                        <Text className="color-secondary">cope</Text>
                    </Text>

                    <Image
                        source={require('../../Frontend/assets/images/logo.png')}
                        className="w-32 h-32 mt-2"
                        resizeMode="contain"
                    />

                    {/* Form Fields */}
                    <FormField
                        title="Username"
                        value={form.username}
                        placeholder="Enter your username"
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-10"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Enter your email"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-5"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Enter your password"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-5"
                    />

                    <FormField
                        title="Confirm Password"
                        value={form.confirmPassword}
                        placeholder="Confirm your password"
                        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                        otherStyles="mt-5"
                    />

                    {/* Register Button */}
                    <Button
                        action="primary"
                        variant="link"
                        size="md"
                        isDisabled={isSubmitting}
                        className="p-5 px-8 bg-light rounded-3xl mt-5 active:opacity-75"
                        onPress={submit}
                    >
                        <ButtonText className="text-xl font-bold">Register</ButtonText>
                    </Button>

                    {/* Login Redirect */}
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
                        <Link href="/sign_in" className="text-lg font-extrabold text-light">
                            Login
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Sign_up;
