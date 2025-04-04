import React from 'react';
import { Stack } from 'expo-router';
import { AnalysisProvider } from '../context/AnalysisContext';

export default function AnalysisLayout() {
    return (
        <AnalysisProvider>
            <Stack>
            <Stack.Screen name="AIAnalysisPage" />
            </Stack>
        </AnalysisProvider>
    );
}