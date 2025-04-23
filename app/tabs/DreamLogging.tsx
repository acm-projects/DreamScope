import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    StyleSheet,
    Dimensions,
    Modal,
    Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import options from '../../Frontend/assets/dummyJson/options.json';

const API_BASE_URL = 'http://10.0.2.2:5001';
const { width } = Dimensions.get('window');

const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

const checkDreamType = (dreamType: any) => {
    if (dreamType == 'Fragmented Capture') {
        return '#D7C9E3'; // white purple
    } else if (dreamType == 'Empty Capture') {
        return '#eadb8c'; // light yellow
    } else {
        return '#fc77a6'; // pink
    }
};

export default function DreamLogScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const params = useLocalSearchParams();

    const handlePress2 = async () => {
        router.push('/logCompletion/emptyLogCompletion');
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const response = await axios.get(`${API_BASE_URL}/users/email/${storedEmail}`);
            const userId = response.data._id;

            const dreamData = {
                userId: userId,
                title: '',
                type: 'Empty',
                dreamText: '',
                selectedThemes: [],
                selectedSettings: [],
                selectedEmotions: [],
            };

            const apiResponse = await axios.post(`${API_BASE_URL}/api/dreamPosts`, dreamData);
            await AsyncStorage.setItem('postId', apiResponse.data._id);

            await axios.put(`${API_BASE_URL}/users/${userId}`, {
                totalDreams: response.data.totalDreams + 1,
                detailedDreams: response.data.detailedDreams + 1,
            });
        } catch (error) {
            console.error('Error submitting dream log:', error);
            Alert.alert('Error', 'Failed to submit dream log.');
        }
    };

    const handlePress = (dreamType: any) => {
        if (dreamType === 'Empty Capture') {
            setModalVisible(true);
        } else {
            router.push({ pathname: `/logs/name`, params: { name: dreamType } });
        }
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
                <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>
                                Empty Captures hold little to no information and is intended for streak saving, proceed?
                            </Text>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePress2} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
                    <Image
                        source={require('../../Frontend/images/cloudbackground2.png')}
                        style={{ maxWidth: 'auto', maxHeight: 'auto' }}
                        resizeMode="contain"
                    />
                </View>

                <FlatList
                    contentContainerStyle={{ paddingBottom: 12, paddingTop: 30 }}
                    data={options}
                    keyExtractor={(item) => item.name.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 25 }}>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#D7C9E3', marginBottom: 5 }}>
                                DREAM LOGGING
                            </Text>
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: 'bold',
                                    color: '#eadb8c',
                                    textAlign: 'center',
                                    marginBottom: 8,
                                    textShadowColor: 'rgba(0, 191, 255, 0.3)',
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 5,
                                }}
                            >
                                {currentDate}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#D7C9E3',
                                    opacity: 0.85,
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                }}
                            >
                                What type of dream would you like to log?
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handlePress(item.name)}
                            style={{
                                marginBottom: 20,
                                padding: 24,
                                borderRadius: 13,
                                backgroundColor: 'rgba(215, 201, 250, 0.25)',
                                borderWidth: 1,
                                height: 250,
                                borderColor: checkDreamType(item.name),
                                shadowColor: checkDreamType(item.name),
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    marginTop: 50,
                                    fontWeight: '600',
                                    color: '#ffe25e',
                                    textAlign: 'center',
                                    marginBottom: 6,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#D7C9E3',
                                    textAlign: 'center',
                                }}
                            >
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 7, 35, 0.7)',
    },
    modalContainer: {
        width: '90%',
        height: '20%',
        backgroundColor: '#180723',
        padding: 15,
        borderRadius: 11,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D7C9E3',
    },
    modalText: {
        color: '#D7C9E3',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#2C123F',
        alignItems: 'center',
        paddingVertical: 10,
        width: '45%',
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D7C9E3',
    },
    modalButtonText: {
        color: '#D7C9E3',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
