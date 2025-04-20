import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
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
        return <Text>Loading User Data...</Text>;
    }


    if (!userData) {
        return <Text>User data not available.</Text>;
    }


    if (loading) {
        return <Text style={{ color: "white" }}>Loading Analysis...</Text>;
    }


    if (error) {
        return <Text style={{ color: "red" }}>Error: {error.message}</Text>;
    }


    console.log("in page: ", userData.joinDate);


    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />


            {/* Decorative background elements */}
            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.4 }}>
                <Image
                    source={require("../../Frontend/images/treeforeground.png")}
                    style={{ width: 200, height: 200 }}
                    resizeMode="contain"
                />
            </View>


            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            >
                {/* Header Section */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                            marginBottom: 12,
                            textShadowColor: "rgba(0, 191, 255, 0.3)",
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 5,
                        }}
                    >
                        {currentDate}
                    </Text>


                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "#00BFFF",
                            marginBottom: 10,
                        }}
                    >
                        Dream Analysis
                    </Text>
                </View>


                {/* Dream Breakdown Header */}
                <View style={{
                    backgroundColor: "rgba(0, 191, 255, 0.15)",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 20,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Feather name="moon" size={18} color="#00BFFF" />
                    <Text style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        marginLeft: 8
                    }}>
                        Your Dream Elements
                    </Text>
                </View>


                {/* Categories (Places, People, Objects, Themes, etc.) */}
                {[
                    { label: "Places", icon: "map-pin", data: analysisData.dreamPlaces },
                    { label: "People", icon: "users", data: analysisData.dreamPeople },
                    { label: "Objects", icon: "box", data: analysisData.dreamObjects },
                    { label: "Themes", icon: "feather", data: analysisData.dreamThemes },
                    { label: "Reoccurring Places", icon: "repeat", data: userData.recurringPlaces },
                    { label: "Reoccurring People", icon: "refresh-cw", data: userData.recurringPeople },
                    { label: "Reoccurring Objects", icon: "rotate-cw", data: userData.recurringObjects },
                    { label: "Reoccurring Themes", icon: "refresh-ccw", data: userData.recurringThemes },
                ].map((section, index) => (
                    <View
                        key={index}
                        style={{
                            marginBottom: 20,
                            backgroundColor: "rgba(0, 49, 76, 0.3)",
                            borderRadius: 16,
                            padding: 15,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00BFFF",
                        }}
                    >
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10
                        }}>
                            <Feather name={section.icon} size={18} color="#00BFFF" />
                            <Text
                                style={{
                                    color: "#00BFFF",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginLeft: 8
                                }}
                            >
                                {section.label}
                            </Text>
                        </View>


                        {section.data?.length > 0 ? (
                            section.data.map((item: any, idx: any) => (
                                <Text
                                    key={idx}
                                    style={{
                                        color: "#C9B9E2",
                                        fontSize: 16,
                                        marginBottom: 5,
                                        marginLeft: 26,
                                        lineHeight: 22
                                    }}
                                >
                                    • {item}
                                </Text>
                            ))
                        ) : (
                            <Text style={{
                                color: "#C9B9E2",
                                fontSize: 16,
                                marginLeft: 26,
                                fontStyle: "italic",
                                opacity: 0.8
                            }}>
                                No {section.label.toLowerCase()} found
                            </Text>
                        )}
                    </View>
                ))}


                {/* AI Insight/Analysis View */}
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <View style={{
                        backgroundColor: "rgba(0, 191, 255, 0.15)",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 15,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Feather name="star" size={18} color="#00BFFF" />
                        <Text style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "600",
                            marginLeft: 8
                        }}>
                            AI Overview
                        </Text>
                    </View>


                    <View
                        style={{
                            backgroundColor: "rgba(0, 49, 76, 0.3)",
                            borderRadius: 16,
                            padding: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00BFFF",
                        }}
                    >
                        <Text
                            style={{
                                color: "#C9B9E2",
                                padding: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: "italic",
                            }}
                        >
                            {analysisData.analysis || "No analysis available."}
                        </Text>
                    </View>
                </View>


                {/* Action buttons */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <Button
                        onPress={() => router.push("/tabs/HomeScreen")}
                        style={{
                            backgroundColor: "rgba(0, 49, 76, 0.8)",
                            borderColor: "#00BFFF",
                            borderWidth: 1.5,
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 54,
                            flex: 1,
                        }}
                    >
                        <ButtonText
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            <Feather name="home" size={16} /> Home
                        </ButtonText>
                    </Button>


                    <View style={{ width: 15 }} />


                    <Button
                        onPress={() => router.push("/tabs/DreamTimeline")}
                        style={{
                            backgroundColor: "#0000ff",
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 54,
                            flex: 1,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}
                    >
                        <ButtonText
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            <Feather name="book" size={16} /> Dream Timeline
                        </ButtonText>
                    </Button>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}