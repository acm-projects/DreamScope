import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert("Logged Out", "You have been logged out successfully.", [
            {
                text: "OK",
                onPress: async () => {
                    try {
                        await AsyncStorage.setItem("isLoggedIn", "false");
                        router.push("/auth/sign_in");
                    } catch (error) {
                        console.error("Logout failed:", error);
                    }
                },
            },
        ]);
    };

    const handleSettings = () => {
        router.push("./Settings");
    };

    const handleTopRightButton = () => {
        router.push("../tabs/HomeScreen");
    };

    return (
        <LinearGradient
            colors={["#180723", "#2C123F", "#2C123F", "#3d1865"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.profileSection}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleTopRightButton}
                        >
                            <Feather name="arrow-left" size={20} color="#D7C9E3" />
                        </TouchableOpacity>

                        <Image
                            source={{ uri: "https://via.placeholder.com/100" }}
                            style={styles.avatar}
                        />
                        <Text style={styles.username}>John Doe</Text>
                        <Text style={styles.email}>john.doe@example.com</Text>
                    </View>

                    <View style={styles.options}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={handleSettings}
                        >
                            <Feather name="settings" size={20} color="#D7C9E3" />
                            <Text style={styles.optionText}>Account Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionButton}>
                            <Feather name="info" size={20} color="#D7C9E3" />
                            <Text style={styles.optionText}>About</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
        alignItems: "center",
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 40,
        width: "100%",
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 20,
        backgroundColor: "#2C123F",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#D7C9E3",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#D7C9E3",
    },
    username: {
        fontSize: 20,
        fontWeight: "700",
        color: "#D7C9E3",
    },
    email: {
        fontSize: 14,
        color: "#B5A7C7",
        marginTop: 4,
    },
    options: {
        width: "100%",
        marginBottom: 40,
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#3d1865",
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
    },
    optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#D7C9E3",
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 16,
        elevation: 3,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
