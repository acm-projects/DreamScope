import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';



export default function DetailedLogCompletion() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Parse tags if they exist
    const selectedTags = params.tags ? params.tags.toString().split(",") : [];

    return (
        <LinearGradient
            colors={["#180723", "#2C123F", "#3d1865"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />


            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20
            }}>
                {/* Header with enhanced styling */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold",
                            color: "#ffe25e",
                            textAlign: "center",
                            marginBottom: 12,
                            textShadowColor: "rgba(252, 119, 166, 0.3)",
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
                            color: "#fc77a6",
                            marginBottom: 10,
                        }}
                    >
                        Capture Complete!
                    </Text>

                    {selectedTags.length > 0 && (
                        <View style={{
                            backgroundColor: "rgba(252, 119, 166, 0.15)",
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Feather name="tag" size={18} color="#ffe25e" />
                            <Text style={{
                                color: "#e9f59d",
                                fontSize: 15,
                                marginLeft: 8
                            }}>
                                {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} included
                            </Text>
                        </View>
                    )}
                </View>

                {/* Completion card with success animation */}
                <View style={{
                    alignItems: "center",
                    backgroundColor: "rgba(24, 7, 35, 0.6)",
                    width: "100%",
                    borderRadius: 16,
                    padding: 30,
                    borderLeftWidth: 3,
                    borderLeftColor: "#fc77a6",
                    marginBottom: 30
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: "rgba(252, 119, 166, 0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <Feather name="check-circle" size={50} color="#ffe25e" />
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: "#D7C9E3",
                        textAlign: "center",
                        marginBottom: 10
                    }}>
                        Your log has been saved successfully.
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: "#D7C9E3",
                        opacity: 0.8,
                        textAlign: "center",
                        fontStyle: "italic",
                    }}>
                        Would you like to analyze your dream or return home?
                    </Text>
                </View>

                {/* Action buttons with improved styling */}
                <Button
                    onPress={() => router.push("/logs/AIAnalysisPage")}
                    style={{
                        backgroundColor: "#fc77a6",
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 54,
                        width: "100%",
                        marginBottom: 15,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}
                >
                    <ButtonText
                        style={{
                            color: "#180723",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        <Feather name="star" size={16} /> Continue to Dream Analysis
                    </ButtonText>
                </Button>

                <Button
                    onPress={() => router.push("/tabs/HomeScreen")}
                    style={{
                        backgroundColor: "rgba(24, 7, 35, 0.8)",
                        borderColor: "#ffe25e",
                        borderWidth: 1.5,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 54,
                        width: "100%",
                    }}
                >
                    <ButtonText
                        style={{
                            color: "#eadb8c",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        <Feather name="home" size={16} /> Back to Home
                    </ButtonText>
                </Button>
            </View>
        </LinearGradient>
    );
}