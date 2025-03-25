import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');

    const handleProfilePicChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert('Account Deletion', 'Are you sure you want to delete your account?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => Alert.alert('Account Deleted!') }
        ]);
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerText}>MY PROFILE</Text>

                    {/* Profile Picture */}
                    <TouchableOpacity style={styles.profilePicContainer} onPress={handleProfilePicChange}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profilePic} />
                        ) : (
                            <Text style={styles.profilePicText}>Add Profile Pic</Text>
                        )}
                    </TouchableOpacity>

                    {/* Bio Input */}
                    <TextInput
                        style={styles.bioInput}
                        placeholder="Add a short bio..."
                        placeholderTextColor="#D7C9E3"
                        value={bio}
                        onChangeText={setBio}
                        multiline
                    />

                    {/* Stats */}
                    <View style={styles.statsBox}>
                        <Text style={styles.statsText}>Joined on: 03-24-2025</Text>
                        <Text style={styles.statsText}>Total Dreams: 0</Text>
                        <Text style={styles.statsText}>Thorough Logs: 0</Text>
                        <Text style={styles.statsText}>Fragmented Logs: 0</Text>
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/DreamTimeline')}>
                        <Text style={styles.buttonText}>My Dream Timeline</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/HomeScreen')}>
                        <Text style={styles.buttonText}>Back to Home Page</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => router.push('./Settings')}>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                        <Text style={styles.deleteButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 60,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D7C9E3',
        marginTop: 30,
        marginBottom: 20,
    },
    profilePicContainer: {
        backgroundColor: '#D7C9E3',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#94C9A9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    profilePicText: {
        color: '#180723',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    bioInput: {
        backgroundColor: '#2C123F',
        color: '#D7C9E3',
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D7C9E3',
        height: 80,
        textAlignVertical: 'top',
        width: '100%',
        marginBottom: 20,
    },
    statsBox: {
        backgroundColor: '#3d1865',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        borderWidth: 2,
        borderColor: '#D7C9E3',
        marginBottom: 30,
    },
    statsText: {
        color: '#D7C9E3',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#94C9A9',
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
    },
    buttonText: {
        color: '#180723',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#C41E3A',
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
