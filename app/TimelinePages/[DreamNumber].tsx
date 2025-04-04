import { View, Alert, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, StyleSheet, ListRenderItem, StatusBar, Image } from "react-native";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import userDreamData from '../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json';
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/ui/button";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'react-native-collapsible-tab-view';
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";


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

    if (params.DreamType == "Detailed Capture") {
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

                    <Button
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 20,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#00BFFF" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    <View style={{ alignItems: "center", marginTop: 100, marginBottom: 20 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#A5E3B7",
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowColor: "rgba(0, 191, 255, 0.3)",
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
                                color: "#00BFFF",
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


                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "white", marginBottom: 10 }}>
                        Dream Details
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#0c1b33",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00cf91",
                            borderRightWidth: 3,
                            borderRightColor: "#00cf91",
                        }}
                    >



                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Dream Title: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DreamTitle}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Dream Type: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DreamType}
                            </Text>
                        </Text>


                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Dream Capture Date: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DayMonthYear}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Dream Capture Time: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.TimeOfCapture}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Selected Tags: {"\n"}
                            <Text style={{ color: "white", borderColor: "white" }}>
                                {params.SelectedTags}
                            </Text>
                        </Text>



                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
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

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "white", marginBottom: 10, marginTop: 10 }}>
                        AI Analysis
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#0c1b33",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00cf91",
                            borderRightWidth: 3,
                            borderRightColor: "#00cf91",
                        }}
                    >

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            People: {"\n"}
                            <Text style={{ color: "white", marginBottom: 8 }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Reoccuring People: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Objects: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Objects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Reoccuring Objects: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Places: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Reoccuring Places: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Themes: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Themes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#4fe38f", marginBottom: 8 }}>
                            Reoccuring Themes: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Themes}
                            </Text>
                        </Text>



                        <Text style={{ fontWeight: "bold", color: "#4fe38f" }}>
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
    else if (params.DreamType == "Fragmented Capture") {
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

                    <Button
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 20,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#00BFFF" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    <View style={{ alignItems: "center", marginTop: 100, marginBottom: 20 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#A5E3B7",
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowColor: "rgba(0, 191, 255, 0.3)",
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
                                color: "#00BFFF",
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


                    <Text style={{ fontSize: 25, color: "white", marginBottom: 10 }}>
                        Dream Details
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#0c1b33",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#8A2BE2",
                            borderRightWidth: 3,
                            borderRightColor: "#8A2BE2",
                        }}
                    >



                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Dream Title: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DreamTitle}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Dream Type: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DreamType}
                            </Text>
                        </Text>


                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Dream Capture Date: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.DayMonthYear}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Dream Capture Time: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.TimeOfCapture}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Selected Tags: {"\n"}
                            <Text style={{ color: "white", borderColor: "white" }}>
                                {params.SelectedTags}
                            </Text>
                        </Text>



                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
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

                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "white", marginBottom: 10, marginTop: 10 }}>
                        AI Analysis
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#0c1b33",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#8A2BE2",
                            borderRightWidth: 3,
                            borderRightColor: "#8A2BE2",
                        }}
                    >

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            People: {"\n"}
                            <Text style={{ color: "white", marginBottom: 8 }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Reoccuring People: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Objects: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Objects}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Reoccuring Objects: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.People}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Places: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Reoccuring Places: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Places}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Themes: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Themes}
                            </Text>
                        </Text>

                        <Text style={{ fontWeight: "bold", color: "#8A2BE2", marginBottom: 8 }}>
                            Reoccuring Themes: {"\n"}
                            <Text style={{ color: "white" }}>
                                {params.Themes}
                            </Text>
                        </Text>



                        <Text style={{ fontWeight: "bold", color: "#8A2BE2" }}>
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
        // Default case
        return (
            <LinearGradient colors={["#15041D", "#42052a", "#3B1856"]} style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />

                <Button
                    onPress={() => router.push("/tabs/DreamTimeline")}
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 20,
                        backgroundColor: "transparent",
                        zIndex: 10,
                    }}
                >
                    <Text style={{ fontSize: 24, color: "#00BFFF" }}>
                        <Feather name="arrow-left" size={30} />
                    </Text>
                </Button>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 22, color: "#00BFFF", fontWeight: "bold", marginBottom: 25 }}>
                        Dream Details Not Available

                    </Text>


                    <Text style={{
                        color: "#C9B9E2",
                        textAlign: "center",
                        padding: 10,
                        fontSize: 16,
                        lineHeight: 24,
                        fontStyle: "italic", justifyContent: "center", alignItems: "center"
                    }}>
                        {params.DreamDescription} {"\n"}
                        {params.AiAnalysis}


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
        backgroundColor: "rgba(0, 49, 76, 0.3)",
        marginBottom: 15,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boxA: {
        backgroundColor: 'rgba(0, 49, 76, 0.3)',
        borderRadius: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#8A2BE2",
    },
    boxB: {
        backgroundColor: 'rgba(0, 49, 76, 0.3)',
        borderRadius: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#00cf91",
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: "rgba(0, 49, 76, 0.2)",
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
        borderBottomColor: "#00BFFF",
    },
    tabText: {
        color: "#C9B9E2",
        fontSize: 16,
        fontWeight: "600",
    },
    activeTabText: {
        color: "#00BFFF",
        fontWeight: "bold",
    },
    tabScrollView: {
        backgroundColor: 'transparent',
    },
    dreamCard: {
        backgroundColor: "rgba(0, 49, 76, 0.3)",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        borderLeftWidth: 3,
        borderLeftColor: "#00cf91",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#00BFFF",
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
        backgroundColor: "rgba(0, 191, 255, 0.15)",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        margin: 4,
    },
    tagText: {
        color: "#00BFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    dreamTypeTag: {
        marginTop: 8,
        backgroundColor: "rgba(0, 191, 255, 0.15)",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    dreamTypeText: {
        color: "#00BFFF",
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
        height: '100%', // Change to full height
        zIndex: -1,     // Change from 0 to -1
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: .1
    },
});