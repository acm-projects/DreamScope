import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout: React.FC = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="sign_in" options={{ headerShown: false }} />
                <Stack.Screen name="sign_up" options={{ headerShown: false }} />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default AuthLayout;