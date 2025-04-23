import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Modal,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../context/UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.0.2.2:5001";

type DreamLog = {
    _id: string;
    title: string;
    type: string;
    date: string;
    dreamText: string;
    selectedThemes: string[];
    analysis: string;
    dreamPeople: string[];
    dreamObjects: string[];
    dreamPlaces: string[];
    dreamThemes: string[];
};

export default function DreamTimelineScreen() {
    const router = useRouter();
    const { userData, isLoading } = useUser();

    const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<DreamLog | null>(null);

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    useEffect(() => {
        const fetchDreamLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const storedEmail = await AsyncStorage.getItem("userEmail");

                if (!storedEmail || !userData || !userData._id) {
                    console.log("User not ready yet.");
                    return;
                }

                const response = await axios.get(
                    `${API_BASE_URL}/api/dreamPosts/user/${userData._id}`
                );
                setDreamLogs(response.data);
            } catch (error) {
                //setError(error);
                console.error("Error fetching dream logs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isLoading && userData && userData?._id) {
            fetchDreamLogs();
        }
    }, [userData?._id, isLoading]);

    if (loading) {
        return (
            <Text style={{ color: "white", flex: 1, textAlign: "center", marginTop: 50 }}>
                Loading Dream Timeline...
            </Text>
        );
    }

    if (error) {
        return (
            <Text style={{ color: "red", flex: 1, textAlign: "center", marginTop: 50 }}>
                Error loading dream timeline: {error as string}
            </Text>
        );
    }

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

    const checkDreamTypeOnPressed = (item: DreamLog) => {
        if (item.type === "Empty") {
            setCurrentItem(item);
            setModalVisible(true);
        } else {
            navigateToDreamPage(item);
        }
    };

    const navigateToDreamPage = (item: DreamLog) => {
        router.push({
            pathname: `/logs/[DreamNumber]`,
            params: {
                DreamNumber: item._id,
                DreamTitle: item.title,
                DreamType: item.type,
                DreamDescription: item.dreamText,
                DayMonthYear: new Date(item.date).toLocaleDateString(),
                TimeOfCapture: new Date(item.date).toLocaleTimeString(),
                SelectedTags: item.selectedThemes,
                AiAnalysis: item.analysis,
                People: item.dreamPeople,
                Objects: item.dreamObjects,
                Places: item.dreamPlaces,
                Themes: item.dreamThemes,
                RecurringPeople: userData?.recurringPeople,
                RecurringPlaces: userData?.recurringPlaces,
                RecurringThemes: userData?.recurringThemes,
                RecurringObjects: userData?.recurringObjects,
            },
        });
    };

    return (
        <LinearGradient colors={["#15041D", "#2C123F", "#3B1856"]} style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />

            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground.png")}
                    style={{ maxWidth: "auto", maxHeight: "auto" }}
                    resizeMode="contain"
                />
            </View>

            {/* Modal for "Empty" dream logs */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Empty Captures only contain a small analysis, continue?
                        </Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalButton}
                            >
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

            {/* List of dream logs */}
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
                                    fontSize: 36,
                                    fontWeight: "bold",
                                    color: "#D7C9E3",
                                    marginBottom: 5,
                                }}
                            >
                                DREAM TIMELINE
                            </Text>
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "bold",
                                    color: "#eadb8c",
                                    textAlign: "center",
                                    marginBottom: 8,
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 5,
                                }}
                            >
                                {currentDate}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#C9B9E2",
                                    opacity: 0.85,
                                    textAlign: "center",

                                }}
                            >
                                Your journey through dreams

                            </Text>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => checkDreamTypeOnPressed(item)}>
                        <View style={[styles.dreamCard, determineDreamTypeStyle(item.type)]}>
                            <View style={styles.dreamIconContainer}>
                                <Feather name={getDreamTypeIcon(item.type)} size={24} color="#8caedb" />
                            </View>
                            <View style={styles.dreamContent}>
                                <Text style={styles.dreamDate}>
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                                <Text style={styles.dreamTitle}>{item.title || "no title provided"}</Text>
                                <View style={styles.dreamTypeTag}>
                                    <Text style={styles.dreamTypeText}>{item.type}</Text>
                                </View>
                            </View>
                            <View style={styles.chevronContainer}>
                                <Feather name="chevron-right" size={24} color="#8caedb" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 20, marginBottom: 5 }}>
                        <Button onPress={() => router.push("/tabs/DreamLogging")} style={styles.newDreamButton}>
                            <Text style={styles.newDreamButtonText}>Capture New Dream</Text>
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
        backgroundColor: "rgba(56, 24, 101, 0.3)", // subtle dreamy purple glow
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
        borderLeftColor: "#e9f59d", // white yellow
    },
    emptyCapture: {
        borderLeftColor: "#fc77a6", // dreamy pink retained
    },
    fragmentedCapture: {
        borderLeftColor: "#ffe25e", // vibrant yellow for fragmented memory
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
        color: "#eadb8c", // light yellow
        marginBottom: 4,
    },
    dreamTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#D7C9E3", // white purple
        marginBottom: -2,
    },
    dreamTypeTag: {
        marginTop: 8,
        alignSelf: 'flex-start',
        backgroundColor: "rgba(255, 226, 94, 0.2)", // soft yellow glow
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    dreamTypeText: {
        color: "#ffe25e", // yellow
        fontSize: 12,
        fontWeight: "bold",
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    newDreamButton: {
        backgroundColor: "#3d1865", // light purple
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
        color: "#e9f59d", // white yellow
        fontSize: 16,
        fontWeight: "bold",
    },
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
    imageContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.1,
    },
});
