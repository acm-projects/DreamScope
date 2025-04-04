import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { UserProvider } from './context/UserContext';

export default function Entry() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const data = await AsyncStorage.getItem('isLoggedIn');
                const loggedIn = data === 'true';
                setIsLoggedIn(loggedIn);

                if (loggedIn) {
                    router.replace('./tabs/HomeScreen');
                } else {
                    router.replace('./auth/sign_in');
                }
            } catch (error) {
                console.error('Error reading login status:', error);
            } 
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#663399" />
            </View>
        );
    }

    return null;
}