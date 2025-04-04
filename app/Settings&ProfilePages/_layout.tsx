import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function SettingsLayout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="Profile" />
                <Stack.Screen name="Settings" />
            </Stack>
        </UserProvider>
    );
}