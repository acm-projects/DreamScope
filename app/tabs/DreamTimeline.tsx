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
        return <Text style={{ color: 'white', flex: 1, textAlign: 'center', marginTop: 50 }}>Loading Dream Timeline...</Text>;
    }

    if (error) {
        return <Text style={{ color: 'red', flex: 1, textAlign: 'center', marginTop: 50 }}>Error loading dream timeline: {error}</Text>;
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

    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
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
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    if (currentItem) {
                                        navigateToDreamPage(currentItem);
                                    }
                                }}
                                style={styles.modalButton}
                            >
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Decorative background elements */}
            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground.png")}
                    style={{ maxWidth: "auto", maxHeight: "auto" }}
                    resizeMode="contain"
                />
            </View>

            <FlatList
                data={dreamLogs}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        {/* Header with enhanced styling */}
                        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "bold",
                                    color: "#A5E3B7",
                                    textAlign: "center",
                                    marginBottom: 8,
                                    textShadowColor: "rgba(0, 191, 255, 0.3)",
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 5,
                                }}
                            >
                                {currentDate}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 36,
                                    fontWeight: "bold",
                                    color: "#00BFFF",
                                    marginBottom: 5,
                                }}
                            >
                                DREAM TIMELINE
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#C9B9E2",
                                    opacity: 0.85,
                                    textAlign: "center",
                                    fontStyle: "italic",
                                }}
                            >
                                Your journey through dreams
                                <Text style={{ fontSize: 12 }}>
                                    {"\n"}  *Select a capture to view its information*
                                </Text>
                            </Text>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => checkDreamTypeOnPressed(item)}
                        key={item._id} // Add key here as well for proper rendering
                    >
                        <View style={[
                            styles.dreamCard,
                            determineDreamTypeStyle(item.type)
                        ]}>
                            <View style={styles.dreamIconContainer}>
                                <Feather
                                    name={getDreamTypeIcon(item.type)}
                                    size={24}
                                    color="#00BFFF"
                                />
                            </View>
                            <View style={styles.dreamContent}>
                                <Text style={styles.dreamDate}>
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                                <Text style={styles.dreamTitle}>
                                    {item.title || "no title provided"}
                                </Text>
                                <View style={styles.dreamTypeTag}>
                                    <Text style={styles.dreamTypeText}>
                                        {item.type}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.chevronContainer}>
                                <Feather name="chevron-right" size={24} color="#00BFFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 20, marginBottom: 5 }}>
                        <Button
                            onPress={() => router.push("/tabs/DreamLogging")}
                            style={styles.newDreamButton}
                        >
                            <Text style={styles.newDreamButtonText}>
                                Capture New Dream
                            </Text>
                            <Feather name="plus" size={18} color="white" style={{ marginLeft: 8 }} />
                        </Button>
                    </View>
                )}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    dreamCard: {
        flexDirection: 'row',
        backgroundColor: "rgba(0, 49, 76, 0.3)",
        borderRadius: 16,
        marginBottom: 15,
        padding: 16,
        borderLeftWidth: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    detailedCapture: {
        borderLeftColor: "#00cf91",
    },
    emptyCapture: {
        borderLeftColor: "#ff0a9d",
    },
    fragmentedCapture: {
        borderLeftColor: "#8A2BE2",
    },
    dreamIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        marginRight: 12,
    },
    dreamContent: {
        flex: 1,
    },
    dreamDate: {
        fontSize: 14,
        color: "#C9B9E2",
        marginBottom: 4,
    },
    dreamTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: -2,
    },
    dreamTypeTag: {
        marginTop: 8,
        alignSelf: 'flex-start',
        backgroundColor: "rgba(0, 191, 255, 0.15)",
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    dreamTypeText: {
        color: "#00BFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    newDreamButton: {
        backgroundColor: "#0000ff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 54,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    newDreamButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 7, 63, 0.5)",
    },
    modalContainer: {
        width: "90%",
        height: "20%",
        backgroundColor: "#180723",
        padding: 15,
        borderRadius: 11,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D7C9E3",
    },
    modalText: {
        color: "#D7C9E3",
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#2C123F",
        alignItems: "center",
        paddingVertical: 10,
        width: "45%",
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#D7C9E3",
    },
    modalButtonText: {
        color: "#D7C9E3",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%', // Change to full height
        zIndex: -1,     // Change from 0 to -1
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: .1
    },
});