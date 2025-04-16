import React from 'react';
import { Stack } from 'expo-router';
import { AnalysisProvider } from '../context/AnalysisContext';
import {UserProvider} from '../context/UserContext'

export default function AnalysisLayout() {
    return (
        <UserProvider>
        <AnalysisProvider>
            <Stack>
            <Stack.Screen name="AIAnalysisPage" />
            </Stack>
        </AnalysisProvider>
        </UserProvider>
    );
}