import { useUser } from "../context/UserContext";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'http://10.0.2.2:5001';
import { View, Alert, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, StyleSheet, ListRenderItem, StatusBar, Image } from "react-native";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import userDreamData from "../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json";
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';

const HEADER_HEIGHT = 0

const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

const Header = () => {
    return <View style={styles.header} />
}

export default function DreamTimelinePage() {
    const { dreamNumber } = useLocalSearchParams();
    const router = useRouter();
    const params = useLocalSearchParams();
    const trueVar = "true";
    const falseVar = "false";

    // Get current date for display
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
        return (
            <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
        )
    }, [])

    // Using the same dream type handling as the first file
    if (params.DreamType == "Detailed") {
        return (
            <LinearGradient
                colors={["#15041D", "#2C123F", "#3B1856"]}
                style={{ flex: 1 }}
            >
                <StatusBar barStyle="light-content" />

                {/* Decorative background elements */}
                <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                    <Image
                        source={require("../../Frontend/images/cloudbackground.png")}
                        style={{ maxWidth: "auto", maxHeight: "auto" }}
                        resizeMode="contain"
                    />
                </View>

                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    padding: 20,
                }}
                    showsVerticalScrollIndicator={false}>

                    <TouchableOpacity
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 20,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#8caedb" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: "center", marginTop: 100, marginBottom: 20 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#eadb8c", // light yellow from first file
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 5,
                            }}
                        >
                            {params.DayMonthYear}
                        </Text>
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "bold",
                                color: "#D7C9E3", // white purple from first file
                                marginBottom: 5,
                            }}
                        >
                            {params.DreamTitle}
                        </Text>
                        <View style={styles.dreamTypeTag}>
                            <Text style={styles.dreamTypeText}>
                                {params.DreamType}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#D7C9E3", marginBottom: 10 }}>
                        Dream Details
                    </Text>
                    <View
                        style={{
                            backgroundColor: "rgba(56, 24, 101, 0.3)", // from first file's dreamCard
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#e9f59d", // white yellow for Detailed from first file
                            borderRightWidth: 3,
                            borderRightColor: "#e9f59d",
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Dream Title: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DreamTitle}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Dream Type: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DreamType}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Dream Capture Date: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DayMonthYear}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Dream Capture Time: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.TimeOfCapture}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Selected Tags: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.SelectedTags}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Dream Description: {"\n"}
                            <Text style={{
                                color: "#a37be3",
                                padding: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: "italic",
                            }}>
                                {params.DreamDescription}
                            </Text>
                        </Text>
                    </View>

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#D7C9E3", marginBottom: 10, marginTop: 10 }}>
                        AI Analysis
                    </Text>
                    <View
                        style={{
                            backgroundColor: "rgba(56, 24, 101, 0.3)",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#e9f59d",
                            borderRightWidth: 3,
                            borderRightColor: "#e9f59d",
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            People: {"\n"}
                            <Text style={{ color: "#D7C9E3", marginBottom: 8 }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Recurring People: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringPeople}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Objects: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Objects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Recurring Objects: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringObjects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Places: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Recurring Places: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringPlaces}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Themes: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Themes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d", marginBottom: 8 }}>
                            Recurring Themes: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringThemes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#e9f59d" }}>
                            AI Analysis:
                        </Text>
                        <Text
                            style={{
                                color: "#C9B9E2",
                                padding: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: "italic",
                            }}
                        >
                            {params.AiAnalysis}
                        </Text>
                    </View>

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#D7C9E3", marginBottom: 10, marginTop: 10 }}>
                        Generated Images
                    </Text>
                    <View
                        style={{
                            backgroundColor: "rgba(56, 24, 101, 0.3)",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#e9f59d",
                            borderRightWidth: 3,
                            borderRightColor: "#e9f59d",
                        }}
                    >
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
    else if (params.DreamType == "Fragmented") {
        return (
            <LinearGradient
                colors={["#15041D", "#2C123F", "#3B1856"]}
                style={{ flex: 1 }}
            >
                <StatusBar barStyle="light-content" />

                {/* Decorative background elements */}
                <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                    <Image
                        source={require("../../Frontend/images/cloudbackground.png")}
                        style={{ maxWidth: "auto", maxHeight: "auto" }}
                        resizeMode="contain"
                    />
                </View>

                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    padding: 20,
                }}
                    showsVerticalScrollIndicator={false}>

                    <TouchableOpacity
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 20,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#8caedb" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: "center", marginTop: 100, marginBottom: 20 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#eadb8c", // light yellow from first file
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 5,
                            }}
                        >
                            {params.DayMonthYear}
                        </Text>
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "bold",
                                color: "#D7C9E3", // white purple from first file
                                marginBottom: 5,
                            }}
                        >
                            {params.DreamTitle}
                        </Text>
                        <View style={styles.dreamTypeTag}>
                            <Text style={styles.dreamTypeText}>
                                {params.DreamType}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#D7C9E3", marginBottom: 10 }}>
                        Dream Details
                    </Text>
                    <View
                        style={{
                            backgroundColor: "rgba(56, 24, 101, 0.3)",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#ffe25e", // vibrant yellow for Fragmented from first file
                            borderRightWidth: 3,
                            borderRightColor: "#ffe25e",
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Dream Title: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DreamTitle}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Dream Type: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DreamType}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Dream Capture Date: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.DayMonthYear}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Dream Capture Time: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.TimeOfCapture}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Selected Tags: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.SelectedTags}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Dream Description: {"\n"}
                            <Text style={{
                                color: "#a37be3",
                                padding: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: "italic",
                            }}>
                                {params.DreamDescription}
                            </Text>
                        </Text>
                    </View>

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#D7C9E3", marginBottom: 10, marginTop: 10 }}>
                        AI Analysis
                    </Text>
                    <View
                        style={{
                            backgroundColor: "rgba(56, 24, 101, 0.3)",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#ffe25e",
                            borderRightWidth: 3,
                            borderRightColor: "#ffe25e",
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            People: {"\n"}
                            <Text style={{ color: "#D7C9E3", marginBottom: 8 }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Recurring People: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringPeople}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Objects: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Objects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Recurring Objects: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringObjects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Places: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Recurring Places: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringPlaces}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Themes: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.Themes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e", marginBottom: 8 }}>
                            Recurring Themes: {"\n"}
                            <Text style={{ color: "#D7C9E3" }}>
                                {params.RecurringThemes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#ffe25e" }}>
                            AI Analysis:
                        </Text>
                        <Text
                            style={{
                                color: "#C9B9E2",
                                padding: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: "italic",
                            }}
                        >
                            {params.AiAnalysis}
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
    else {
        // Default case for Empty type
        return (
            <LinearGradient colors={["#15041D", "#66243b", "#3B1856"]} style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />

                <TouchableOpacity
                    onPress={() => router.push("/tabs/DreamTimeline")}
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 20,
                        backgroundColor: "transparent",
                        zIndex: 10,
                    }}
                >
                    <Text style={{ fontSize: 24, color: "#8caedb" }}>
                        <Feather name="arrow-left" size={30} />
                    </Text>
                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 22, color: "#fc77a6", fontWeight: "bold", marginBottom: 25 }}>
                        Dream Details Not Available
                    </Text>

                    <Text style={{
                        color: "#C9B9E2",
                        textAlign: "center",
                        padding: 10,
                        fontSize: 16,
                        lineHeight: 24,
                        fontStyle: "italic",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        The absence of a dream might suggest a night of deep rest or emotional numbness. This dream may reflect deeper emotional undercurrents, symbolic imagery, or internal conflicts that are surfacing during rest.
                    </Text>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: 250,
        width: '100%',
        borderRadius: 16,
        backgroundColor: "rgba(56, 24, 101, 0.3)", // Updated to match first file
        marginBottom: 15,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boxA: {
        backgroundColor: 'rgba(56, 24, 101, 0.3)', // Updated to match first file
        borderRadius: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#ffe25e", // vibrant yellow for Fragmented
    },
    boxB: {
        backgroundColor: 'rgba(56, 24, 101, 0.3)', // Updated to match first file
        borderRadius: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#e9f59d", // white yellow for Detailed
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: "rgba(56, 24, 101, 0.2)", // Updated to match first file
        borderRadius: 12,
        height: 48,
        marginBottom: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    activeTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: "#e9f59d", // white yellow from first file
    },
    tabText: {
        color: "#C9B9E2",
        fontSize: 16,
        fontWeight: "600",
    },
    activeTabText: {
        color: "#e9f59d", // white yellow from first file
        fontWeight: "bold",
    },
    tabScrollView: {
        backgroundColor: 'transparent',
    },
    dreamCard: {
        backgroundColor: "rgba(56, 24, 101, 0.3)", // Updated to match first file
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        borderLeftWidth: 3,
        borderLeftColor: "#e9f59d", // white yellow from first file
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e9f59d", // white yellow from first file
        marginBottom: 10,
        marginTop: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: "#C9B9E2",
        lineHeight: 24,
    },
    infoText: {
        fontSize: 16,
        color: "#C9B9E2",
        marginBottom: 15,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        backgroundColor: "rgba(255, 226, 94, 0.2)", // Updated to match first file's dreamTypeTag
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        margin: 4,
    },
    tagText: {
        color: "#ffe25e", // vibrant yellow from first file
        fontSize: 14,
        fontWeight: "500",
    },
    dreamTypeTag: {
        marginTop: 8,
        backgroundColor: "rgba(255, 226, 94, 0.2)", // soft yellow glow from first file
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    dreamTypeText: {
        color: "#ffe25e", // yellow from first file
        fontSize: 14,
        fontWeight: "bold",
    },
    fragmentedContainer: {
        flex: 1,
        padding: 20,
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
        opacity: 0.1
    },
});