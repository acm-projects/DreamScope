import React, { useState } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsPage() {
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");

    const handleDeleteLogs = () => {
        Alert.alert(
            "Delete Logs",
            "Are you sure you want to delete all log history?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert("Logs Deleted", "Your logs history has been deleted.");
                    },
                },
            ]
        );
    };

    const handleSaveChanges = () => {
        Alert.alert("Changes Saved", "Your account settings have been updated.");
    };

    const handleTopRightButton = () => {
        router.push("./Profile");
    };

    return (
        <LinearGradient
            colors={["#180723", "#2C123F", "#2C123F", "#3d1865"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleTopRightButton}
                        >
                            <Feather name="arrow-left" size={20} color="#D7C9E3" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Settings</Text>
                    </View>

                    <View style={styles.settingItem}>
                        <Feather name="user" size={20} color="#D7C9E3" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Change account name"
                            placeholderTextColor="#B5A7C7"
                            value={accountName}
                            onChangeText={setAccountName}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <Feather name="lock" size={20} color="#D7C9E3" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Change password"
                            placeholderTextColor="#B5A7C7"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteLogs}>
                        <Feather name="trash-2" size={18} color="#fff" />
                        <Text style={styles.deleteButtonText}>Delete Logs History</Text>
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
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#D7C9E3",
        marginLeft: 16,
    },
    backButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#2C123F",
        borderWidth: 1.5,
        borderColor: "#D7C9E3",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3d1865",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#D7C9E3",
    },
    saveButton: {
        backgroundColor: "#94C9A9",
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 30,
        elevation: 3,
    },
    saveButtonText: {
        color: "#180723",
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#B5A7C7",
        marginVertical: 20,
    },
    deleteButton: {
        backgroundColor: "#FF4D4D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 16,
        elevation: 3,
    },
    deleteButtonText: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
    },
});
