import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../context/UserContext";

const AuthLayout: React.FC = () => {
    return (
        <UserProvider>
        <Stack>
                <Stack.Screen name="sign_in" options={{ headerShown: false }} />
                <Stack.Screen name="sign_up" options={{ headerShown: false }} />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </UserProvider>
    );
};

export default AuthLayout;
