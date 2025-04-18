import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch, ScrollView } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import {useUser} from "../context/UserContext"


const API_BASE_URL = 'http://localhost:5001';

export default function SettingsPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [feedback, setFeedback] = useState('');
    const { userData } = useUser();

    const userId = userData._id;

    const handleClearData = () => {
        Alert.alert('Confirmation', 'Are you sure you want to clear your dream data?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: async () => {
                await axios.delete(`${API_BASE_URL}/api/dreamPosts/user/${userId}`, userId)
                Alert.alert('Data Cleared!')
            }  }
        ]);
    };

    const handleFeedbackSubmit = () => {
        if (feedback.trim() === '') {
            Alert.alert('Please enter your feedback');
        } else {
            Alert.alert('Feedback Submitted!');
            setFeedback('');
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => {
                AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                router.push('../auth/sign_in') }
            }
        ]);
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerText}>SETTINGS</Text>

                    <SettingRow label="Light Mode" value={isDarkMode} onValueChange={setIsDarkMode} />
                    <SettingRow label="Notifications" value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} />


                    {/* Feedback Section */}
                    <View style={styles.feedbackContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your feedback..."
                            placeholderTextColor="#D7C9E3"
                            value={feedback}
                            onChangeText={setFeedback}
                            multiline
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
                            <Text style={styles.submitButtonText}>Submit Feedback</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Navigation Buttons */}
                    <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/HomeScreen')}>
                        <Text style={styles.buttonText}>Back to Home Page</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => router.push('./Profile')}>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={(handleLogout)}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>

                    {/* Data Management */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleClearData}>
                        <Text style={styles.logoutButtonText}>Clear Dream Data</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const SettingRow = ({ label, value, onValueChange }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Switch
            trackColor={{ false: '#4B4453', true: '#94C9A9' }}
            thumbColor={value ? '#180723' : '#D7C9E3'}
            ios_backgroundColor="#4B4453"
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D7C9E3',
        marginVertical: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3d1865',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderColor: '#D7C9E3',
        borderWidth: 1.5,
        marginBottom: 15,
        width: '100%',
    },
    label: {
        color: '#D7C9E3',
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#94C9A9',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#2d5136',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#C41E3A',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    feedbackContainer: {
        backgroundColor: '#3d1865',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#D7C9E3',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#2C123F',
        color: '#D7C9E3',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7C9E3',
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 10,
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#94C9A9',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#180723',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
