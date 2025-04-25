import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { useAnalysis } from "../context/AnalysisContext";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AIAnalysisPage() {
    const router = useRouter();
    const { analysisData, loading, error, fetchDreamPostById } = useAnalysis();
    const { userData, isLoading } = useUser();
    const [postId, setPostId] = useState<string | null>(null);


    // Fetch postId from AsyncStorage on component mount
    useEffect(() => {
        const fetchPostId = async () => {
            try {
                const storedPostId = await AsyncStorage.getItem("postId");
                setPostId(storedPostId);
            } catch (error) {
                console.error("Error fetching postId:", error);
            }
        };
        fetchPostId();
    }, []);


    // Fetch dream post data when postId is available
    useEffect(() => {
        if (postId) {
            fetchDreamPostById(postId);
        }
    }, [postId, fetchDreamPostById]);


    if (isLoading) {
        return (
            <LinearGradient colors={["#15041D", "#2C123F"]} style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading User Data...</Text>
            </LinearGradient>
        );
    }


    if (!userData) {
        return (
            <LinearGradient colors={["#15041D", "#2C123F"]} style={styles.loadingContainer}>
                <Text style={styles.errorText}>User data not available.</Text>
            </LinearGradient>
        );
    }


    if (loading) {
        return (
            <LinearGradient colors={["#15041D", "#2C123F"]} style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Analysis...</Text>
            </LinearGradient>
        );
    }


    if (error) {
        return (
            <LinearGradient colors={["#15041D", "#2C123F"]} style={styles.loadingContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </LinearGradient>
        );
    }


    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />


            {/* Decorative background elements */}
            <View style={styles.backgroundImageContainer}>
                <Image
                    source={require("../../Frontend/images/treeforeground.png")}
                    style={styles.backgroundImage}
                    resizeMode="contain"
                />
            </View>


            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.dateText}>
                        {currentDate}
                    </Text>

                    <LinearGradient
                        colors={["#00BFFF", "#0000ff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.titleContainer}
                    >
                        <Text style={styles.titleText}>
                            Dream Analysis
                        </Text>
                    </LinearGradient>
                </View>


                {/* Dream Breakdown Header */}
                <LinearGradient
                    colors={["rgba(0, 191, 255, 0.15)", "rgba(0, 49, 76, 0.15)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.sectionHeader}
                >
                    <Feather name="moon" size={18} color="#00BFFF" />
                    <Text style={styles.sectionHeaderText}>
                        Your Dream Elements
                    </Text>
                </LinearGradient>


                {/* Categories (Places, People, Objects, Themes, etc.) */}
                {[
                    { label: "Places", icon: "map-pin", data: analysisData.dreamPlaces, color: "#00BFFF" },
                    { label: "People", icon: "users", data: analysisData.dreamPeople, color: "#00BFFF" },
                    { label: "Objects", icon: "box", data: analysisData.dreamObjects, color: "#00BFFF" },
                    { label: "Themes", icon: "feather", data: analysisData.dreamThemes, color: "#00BFFF" },
                    { label: "Reoccurring Places", icon: "repeat", data: userData.recurringPlaces, color: "#00BFFF" },
                    { label: "Reoccurring People", icon: "refresh-cw", data: userData.recurringPeople, color: "#00BFFF" },
                    { label: "Reoccurring Objects", icon: "rotate-cw", data: userData.recurringObjects, color: "#00BFFF" },
                    { label: "Reoccurring Themes", icon: "refresh-ccw", data: userData.recurringThemes, color: "#00BFFF" },
                ].map((section, index) => (
                    <View
                        key={index}
                        style={[
                            styles.categoryCard,
                            index % 2 === 1 ? { borderLeftColor: "#00BFFF" } : {}
                        ]}
                    >
                        <View style={styles.categoryHeader}>
                            <Feather name={section.icon} size={18} color={section.color} />
                            <Text style={[styles.categoryTitle, { color: section.color }]}>
                                {section.label}
                            </Text>
                        </View>


                        {section.data?.length > 0 ? (
                            section.data.map((item: any, idx: any) => (
                                <Text
                                    key={idx}
                                    style={styles.categoryItem}
                                >
                                    • {item}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.emptyCategory}>
                                No {section.label.toLowerCase()} found
                            </Text>
                        )}
                    </View>
                ))}


                {/* AI Insight/Analysis View */}
                <View style={styles.aiInsightContainer}>
                    <LinearGradient
                        colors={["rgba(0, 191, 255, 0.15)", "rgba(0, 49, 76, 0.15)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.sectionHeader}
                    >
                        <Feather name="star" size={18} color="#00BFFF" />
                        <Text style={styles.sectionHeaderText}>
                            AI Overview
                        </Text>
                    </LinearGradient>


                    <LinearGradient
                        colors={["rgba(0, 49, 76, 0.3)", "rgba(0, 49, 76, 0.3)"]}
                        style={[styles.categoryCard, { borderLeftColor: "#00BFFF", borderLeftWidth: 4 }]}
                    >
                        <Text style={styles.analysisText}>
                            {analysisData.analysis || "No analysis available."}
                        </Text>
                    </LinearGradient>
                </View>


                {/* Action buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => router.push("/tabs/HomeScreen")}
                        style={styles.homeButton}
                    >
                        <ButtonText style={styles.buttonText}>
                            <Feather name="home" size={16} /> Home
                        </ButtonText>
                    </Button>


                    <View style={{ width: 15 }} />


                    <Button
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={styles.timelineButton}
                    >
                        <LinearGradient
                            colors={["#00BFFF", "#0000ff"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.buttonGradient}
                        >
                            <ButtonText style={styles.buttonText}>
                                <Feather name="book" size={16} /> Dream Timeline
                            </ButtonText>
                        </LinearGradient>
                    </Button>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: "#00BFFF",
        fontSize: 18,
        fontWeight: "500",
    },
    errorText: {
        color: "#00BFFF",
        fontSize: 18,
        fontWeight: "500",
    },
    backgroundImageContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        opacity: 0.4
    },
    backgroundImage: {
        width: 200,
        height: 200
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
        paddingBottom: 40
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 30,
    },
    dateText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 12,
        textShadowColor: "rgba(0, 191, 255, 0.3)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
    },
    titleContainer: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 18,
        elevation: 4,
        shadowColor: "#00BFFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00BFFF",
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        borderLeftWidth: 3,
        borderLeftColor: "#00BFFF",
    },
    sectionHeaderText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8
    },
    categoryCard: {
        marginBottom: 20,
        backgroundColor: "rgba(0, 49, 76, 0.3)",
        borderRadius: 16,
        padding: 15,
        borderLeftWidth: 3,
        borderLeftColor: "#00BFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    categoryHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8
    },
    categoryItem: {
        color: "#C9B9E2",
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 26,
        lineHeight: 22
    },
    emptyCategory: {
        color: "#C9B9E2",
        fontSize: 16,
        marginLeft: 26,
        fontStyle: "italic",
        opacity: 0.8
    },
    aiInsightContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    analysisText: {
        color: "#C9B9E2",
        padding: 10,
        fontSize: 16,
        lineHeight: 24,
        fontStyle: "italic",
        borderLeftColor: "#00BFFF"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    homeButton: {
        backgroundColor: "rgba(0, 49, 76, 0.8)",
        borderColor: "#00BFFF",
        borderWidth: 1.5,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        height: 54,
        flex: 1,
    },
    timelineButton: {
        borderRadius: 12,
        height: 54,
        flex: 1,
        overflow: 'hidden',
        padding: 0
    },
    buttonGradient: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "#00BFFF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    }
});