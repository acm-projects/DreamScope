import React, { useState } from "react";
import { View, SafeAreaView, Modal, Text, FlatList, TouchableOpacity, StatusBar, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import userDreamData from '../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from "expo-linear-gradient";

export default function DreamTimelineScreen() {
    const router = useRouter();

    // Function for today's date
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    //modal for empty log holding no information
    const [modalVisible, setModalVisible] = useState(false);
    // Store the current item being clicked
    const [currentItem, setCurrentItem] = useState(null);

    // Helper function to determine dream type styling
    const determineDreamTypeStyle = (dreamType: string) => {
        switch (dreamType) {
            case "Detailed Capture":
                return styles.detailedCapture;
            case "Empty Capture":
                return styles.emptyCapture;
            case "Fragmented Capture":
                return styles.fragmentedCapture;
            default:
                return styles.detailedCapture;
        }
    };

    // Helper function to determine icon for each dream type
    const getDreamTypeIcon = (dreamType: string) => {
        switch (dreamType) {
            case "Detailed Capture":
                return "file-text";
            case "Empty Capture":
                return "file";
            case "Fragmented Capture":
                return "layers";
            default:
                return "file-text";
        }
    };

    const checkDreamTypeOnPressed = (item: any) => {
        if (item.DreamType == "Empty Capture") {
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
            pathname: `/TimelinePages/${item.DreamNumber}`,
            params: {
                DreamNumber: item.DreamNumber,
                DreamTitle: item.DreamTitle,
                DreamType: item.DreamType,
                DreamDescription: item.description,
                DayMonthYear: item.DayMonthYear,
                TimeOfCapture: item.TimeOfCapture,
                SelectedTags: item.SelectedTags,
                AiAnalysis: item.AiAnalysis,
                People: item.people,
                Objects: item.objects,
                Places: item.place,
                Themes: item.theme,
                RecurringPeople: item.RecurringPeople,
                RecurringPlaces: item.RecurringPlaces,
                RecurringThemes: item.RecurringThemes,
                RecurringObjects: item.RecurringObjects

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
                        <Text style={styles.modalText}>Empty Captures hold little to no information, Proceed?</Text>
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
                data={userDreamData}
                keyExtractor={(item, index) => index.toString()}
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
                    >
                        <View style={[
                            styles.dreamCard,
                            determineDreamTypeStyle(item.DreamType)
                        ]}>
                            <View style={styles.dreamIconContainer}>
                                <Feather
                                    name={getDreamTypeIcon(item.DreamType)}
                                    size={24}
                                    color="#00BFFF"
                                />
                            </View>
                            <View style={styles.dreamContent}>
                                <Text style={styles.dreamDate}>
                                    {item.DayMonthYear}
                                </Text>
                                <Text style={styles.dreamTitle}>
                                    {item.DreamTitle}
                                </Text>
                                <View style={styles.dreamTypeTag}>
                                    <Text style={styles.dreamTypeText}>
                                        {item.DreamType}
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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    fragmentedlog: {
        backgroundColor: "#00314C",
        width: "90%",
        marginTop: 5,
        height: 60,
        marginBottom: 5,
        flexWrap: "wrap",
        borderColor: "white",
        borderWidth: 0,
        borderRadius: 10

    },
    detailedlog: {
        backgroundColor: "#00314C",
        flexWrap: "wrap",
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
        height: 60,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 0

    },
    emptylog: {
        backgroundColor: "#00314C",
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
        flexWrap: "wrap",
        height: 60,
        borderColor: "white",
        borderWidth: 0,
        borderRadius: 10

    },
    timelinetitle: {
        color: "white",
        fontSize: 40,
        marginTop: 5,
        marginBottom: 5
    },

    modalContainer: {
        width: "80%",
        backgroundColor: "#1E1E1E",
        padding: 20,
        borderRadius: 11,
        alignItems: "center",
    },
    modalText: {
        color: "white",
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
    },
    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#00BFFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 10,
    },
    modalButtonText: {
        color: "white",
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