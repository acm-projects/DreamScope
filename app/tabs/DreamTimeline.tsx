import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function TestScreen() {
    return (
        <>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: '#2C123F', justifyContent: 'center', alignItems: 'center' }}
                edges={['left', 'right']}
            >
                <Text style={{ color: 'white', fontSize: 24 }}>No White Bars 🎉</Text>

            </SafeAreaView>
        </>
    );
}
