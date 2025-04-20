import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';
import { headingStyle } from '../../components/ui/heading/styles';
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const styleStatusBar = Platform.OS === 'ios' ? "light" : "auto"
export default function SettingsLayout() {
    return (
        <UserProvider>
            <StatusBar style={styleStatusBar} backgroundColor="#273952" ></StatusBar>
            <Stack screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Profile" />
                <Stack.Screen name="Settings" />
            </Stack>
        </UserProvider>
    );
}