import React from 'react';
import { Stack } from 'expo-router';
import { AnalysisProvider } from '../context/AnalysisContext';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { UserProvider } from '../context/UserContext'
import { Header } from '@expo/html-elements';
import { headingStyle } from '../../components/ui/heading/styles';
const statusBarStyle = Platform.OS === 'ios' ? 'light' : 'auto';

export default function AnalysisLayout() {
    return (
        <UserProvider>

            <StatusBar style={statusBarStyle} backgroundColor="#273952" />
            <AnalysisProvider >
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AIAnalysisPage" />
                </Stack>
            </AnalysisProvider>
        </UserProvider>
    );
}