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

const API_BASE_URL = 'http://10.0.2.2:5001';

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
            <LinearGradient colors={["#15041D", "#2C123F", "#3B1856"]} style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={{ alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                    <Text
                        style={{
                            fontSize: 36,
                            fontWeight: "bold",
                            color: "white",
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
                            textShadowColor: "rgba(0, 191, 255, 0.3)",
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 5,
                        }}
                    >
                        {currentDate}
                    </Text>


                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                            Your Dream Logs would appear here!
                        </Text>
                        <Text style={{ color: '#C9B9E2', fontSize: 16, textAlign: 'center' }}>
                            Start capturing your dreams by tapping the button below.
                        </Text>
                    </View>


                    <View style={{ marginTop: 20, marginBottom: 5 }}>
                        <Button onPress={() => router.push("/tabs/DreamLogging")} style={styles.newDreamButton}>
                            <Text style={styles.newDreamButtonText}>Capture New Dream</Text>
                            <Feather name="plus" size={18} color="white" style={{ marginLeft: 8 }} />
                        </Button>
                    </View>

                </View>

            </LinearGradient>
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Empty Captures hold little to no information, Proceed?
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

            <FlatList
                data={dreamLogs}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                            <Text
                                style={{
                                    fontSize: 36,
                                    fontWeight: "bold",
                                    color: "white",
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
                                    textShadowColor: "rgba(0, 191, 255, 0.3)",
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
                    <TouchableOpacity onPress={() => checkDreamTypeOnPressed(item)}>
                        <View style={[styles.dreamCard, determineDreamTypeStyle(item.type)]}>
                            <View style={styles.dreamIconContainer}>
                                <Feather name={getDreamTypeIcon(item.type)} size={24} color="#00BFFF" />
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
                                <Feather name="chevron-right" size={24} color="#00BFFF" />
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
        backgroundColor: "#180723",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D7C9E3",
        shadowColor: "#D7C9E3",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    modalText: {
        color: "#D7C9E3",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalInput: {
        fontSize: 20,
        backgroundColor: "#212121",
        borderRadius: 12,
        borderWidth: 4,
        borderColor: "#212121",
        color: "white",
        width: "100%",
        padding: 12,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 45,
    },
    modalButton: {
        backgroundColor: "#2C123F",
        alignItems: "center",
        paddingVertical: 12,
        width: "45%",
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D7C9E3",
        shadowColor: "#D7C9E3",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
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
        height: '100%',
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: .1
    },
});