import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
                        // Logic to delete logs here
                        Alert.alert("Logs Deleted", "Your logs history has been deleted.");
                    },
                },
            ]
        );
    };

    const handleSaveChanges = () => {
        // Placeholder save logic
        Alert.alert("Changes Saved", "Your account settings have been updated.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Settings</Text>

                <View style={styles.settingItem}>
                    <Feather name="user" size={20} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Change account name"
                        value={accountName}
                        onChangeText={setAccountName}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Feather name="lock" size={20} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Change password"
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    content: {
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 30,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 20,
    },
    deleteButton: {
        backgroundColor: "#FF4D4D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
    },
    deleteButtonText: {
        color: "#fff",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
    },
});
