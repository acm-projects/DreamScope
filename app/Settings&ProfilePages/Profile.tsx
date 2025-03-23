import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert("Logged Out", "You have been logged out successfully.", [
            {
                text: "OK",
                onPress: async () => {
                    try {
                        await AsyncStorage.setItem("isLoggedIn", "false"); // or removeItem
                        router.replace("/auth/sign_in");
                    } catch (error) {
                        console.error("Logout failed:", error);
                    }
                },
            },
        ]);
    };

    const handleSettings = () => {
        router.push("./Settings")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/100" }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.email}>john.doe@example.com</Text>
                </View>

                <View style={styles.options}>
                    <TouchableOpacity style={styles.optionButton} onPress={handleSettings}>

                        <Feather name="settings" size={20} color="#333" />
                        <Text style={styles.optionText}>Account Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}>
                        <Feather name="info" size={20} color="#333" />
                        <Text style={styles.optionText}>About</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    content: {
        padding: 20,
        alignItems: "center",
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    username: {
        fontSize: 20,
        fontWeight: "600",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
    options: {
        width: "100%",
        marginBottom: 30,
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 1,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
