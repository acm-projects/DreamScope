import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { UserProvider } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto } from '@expo/vector-icons';


export default function ProfilePage() {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const { userData, isLoading } = useUser();


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

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => router.push('../auth/sign_in') }
        ]);
    };


    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../Frontend/images/pine-tree-background.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => router.push('../tabs/HomeScreen')} style={{ padding: 10 }}>
                            <Fontisto name="arrow-left" size={24} color="#D7C9E3" />
                        </TouchableOpacity>

                        <Text style={styles.headerText}>MY PROFILE</Text>

                        <TouchableOpacity onPress={() => router.push('./Settings')} style={{ padding: 10 }}>
                            <Fontisto name="player-settings" size={24} color="#D7C9E3" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Picture */}
                    <TouchableOpacity style={styles.profilePicContainer} onPress={handleProfilePicChange}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profilePic} />
                        ) : (
                            <Fontisto name="person" size={40} color="#180723" />
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
                    {
                        <View style={styles.statsBox}>
                            <Text style={styles.statsText}>
                                Joined on: {userData.joinDate ? userData.joinDate.substring(0, 10) : 'N/A'}
                            </Text>
                            <Text style={styles.statsText}>Total Dreams: 0</Text>
                            <Text style={styles.statsText}>Thorough Logs: 0</Text>
                            <Text style={styles.statsText}>Fragmented Logs: 0</Text>
                        </View>
                    }

                    <TouchableOpacity style={[styles.logoutButton, { flex: 1, marginRight: 10 }]} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deleteButton, { flex: 1, marginLeft: 10 }]} onPress={handleDeleteAccount}>
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
        borderColor: '#3d1865',
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
        backgroundColor: '#180723',
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
        backgroundColor: '#180723',
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
        color: '#2d5136',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#C41E3A',
        paddingVertical: 14,
        borderRadius: 20,
        width: '70%',
        alignItems: 'center',
        marginTop: 15,

    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        marginTop: 30,

    },
    logoutButtonText: {
        color: '#2C123F',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 800,
        zIndex: 0,
    },
    image: {
        width: '100%',
        height: '170%',
    },
});