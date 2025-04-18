import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Modal, Text, FlatList, TouchableOpacity, StatusBar, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/button";
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../context/UserContext";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'http://localhost:5001';

export default function DreamTimelineScreen() {
    const router = useRouter();
    const { userData, isLoading } = useUser();
    const [dreamLogs, setDreamLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function for today's date
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const fetchDreamLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail && userData?._id) {
                    const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/user/${userData._id}`);
                    setDreamLogs(response.data);
                } else if (!storedEmail) {
                    console.log("User email not found");
                } else if (!userData?._id) {
                    return;
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching dream logs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isLoading && userData._id) {
            fetchDreamLogs();
        }
    }, [userData._id, isLoading]);

    if (loading) {
        return <Text style={styles.loadingText}>Loading Dream Timeline...</Text>;
    }

    if (error) {
        return <Text style={styles.errorText}>Error loading dream timeline: {error}</Text>;
    }

    // Helper function to determine dream type styling
    const determineDreamTypeStyle = (dreamType: string) => {
        switch (dreamType) {
            case "Detailed":
                return styles.detailedCapture;
            case "Empty":
                return styles.emptyCapture;
            case "Fragmented":
                return styles.fragmentedCapture;
            default:
                return styles.detailedCapture;
        }
    };

    // Helper function to determine icon for each dream type
    const getDreamTypeIcon = (dreamType: string) => {
        switch (dreamType) {
            case "Detailed":
                return "file-text";
            case "Empty":
                return "file";
            case "Fragmented":
                return "layers";
            default:
                return "file-text";
        }
    };

    const checkDreamTypeOnPressed = (item: any) => {
        if (item.type == "Empty") {
            // Save the current item and show modal
            setCurrentItem(item);
            setModalVisible(true);
        }
        else {
            navigateToDreamPage(item);
        }
    };

    const navigateToDreamPage = (item: any) => {
        router.push({
            pathname: `/TimelinePages/${item._id}`,//will have to work on that
            params: {
                DreamNumber: item._id,
                DreamTitle: item.title,
                DreamType: item.type,
                DreamDescription: item.dreamText,
                DayMonthYear: new Date(item.date).toLocaleDateString(),
                TimeOfCapture: new Date(item.date).toLocaleTimeString(),
                SelectedTags: item.selectedThemes, //adjust for all tags
                AiAnalysis: item.analysis,
                People: item.dreamPeople,
                Objects: item.dreamObjects,
                Places: item.dreamPlaces,
                Themes: item.dreamThemes,
                RecurringPeople: userData.recurringPeople,
                RecurringPlaces: userData.recurringPlaces,
                RecurringThemes: userData.recurringThemes,
                RecurringObjects: userData.recurringObjects,
            },
        });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => checkDreamTypeOnPressed(item)} style={[styles.dreamCard, determineDreamTypeStyle(item.type)]}>
            <View style={styles.cardHeader}>
                <Feather name={getDreamTypeIcon(item.type)} size={24} color={styles.cardHeaderText.color} style={styles.dreamTypeIcon} />
                <Text style={styles.cardHeaderText}>{item.title}</Text>
            </View>
            <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString()}</Text>
            {item.type === "Empty" && (
                <Text style={styles.emptyDreamText}>Empty dream log</Text>
            )}
            {item.type !== "Empty" && item.dreamText && (
                <Text style={styles.dreamDescription}>{item.dreamText.substring(0, 60)}...</Text>
            )}
            {item.selectedThemes && item.selectedThemes.length > 0 && (
                <View style={styles.tagsContainer}>
                    {item.selectedThemes.slice(0, 3).map((tag: string) => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                    {item.selectedThemes.length > 3 && (
                        <Text style={styles.moreTags}>+{item.selectedThemes.length - 3} more</Text>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={["#222222", "#333333", "#444444"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

           {/*modal stuff for empty log*/}
           <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>The only thing here is an eerie description, proceed?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.modalProceedButton]} onPress={() => {
                                setModalVisible(false);
                                if (currentItem) {
                                    navigateToDreamPage(currentItem);
                                }
                            }}>
                                <Text style={styles.modalButtonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Dream Timeline</Text>
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>
                    {dreamLogs.length > 0 ? (
                        <FlatList
                            data={dreamLogs}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                        <View style={styles.emptyTimelineContainer}>
                            <Text style={styles.emptyTimelineText}>No dream logs recorded yet.</Text>
                            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/tabs/RecordDream")}>
                                <Feather name="plus" size={24} color="#888888" />
                                <Text style={styles.addButtonText}>Record a Dream</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f0f0f0',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 16,
        color: '#aaaaaa',
    },
    listContent: {
        paddingBottom: 20,
    },
    dreamCard: {
        backgroundColor: '#333333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
        borderColor: '#666666',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dreamTypeIcon: {
        marginRight: 8,
    },
    cardHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f0f0f0',
    },
    cardDate: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 8,
    },
    dreamDescription: {
        fontSize: 16,
        color: '#dddddd',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    emptyDreamText: {
        fontSize: 16,
        color: '#999999',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tag: {
        backgroundColor: '#555555',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        color: '#f0f0f0',
        fontSize: 12,
    },
    moreTags: {
        color: '#888888',
        fontSize: 12,
        marginLeft: 5,
    },
    detailedCapture: {
        borderColor: '#00BFFF',
    },
    emptyCapture: {
        borderColor: '#FF4500',
    },
    fragmentedCapture: {
        borderColor: '#9400D3',
    },
    loadingText: {
        color: '#f0f0f0',
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
    errorText: {
        color: '#FF4500',
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
    emptyTimelineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyTimelineText: {
        fontSize: 18,
        color: '#888888',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#555555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#888888',
        marginLeft: 10,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#444444',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalText: {
        color: '#f0f0f0',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        backgroundColor: '#555555',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    modalProceedButton: {
        backgroundColor: '#00BFFF',
    },
    modalButtonText: {
        color: '#f0f0f0',
        fontSize: 16,
        fontWeight: 'bold',
    },
});