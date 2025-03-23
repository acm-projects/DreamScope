import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Entry() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const data = await AsyncStorage.getItem('isLoggedIn');
                const loggedIn = data === 'true';
                setIsLoggedIn(loggedIn);

                if (loggedIn) {
                    router.replace('./tabs/HomeScreen'); // replace prevents going back to this screen
                } else {
                    router.replace('./auth/sign_in');
                }
            } catch (error) {
                console.error('Error reading login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    // Optional: show loading while checking
    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#663399" />
            </View>
        );
    }

    // This screen never actually renders content — redirect happens above
    return null;
}
