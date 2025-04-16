import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

export default function DetailedLogCompletion() {
    const router = useRouter();
    const { tags } = useLocalSearchParams();

    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Parse tags if they exist
    const selectedTags = tags ? tags.toString().split(",") : [];

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
                        Capture Complete!
                    </Text>

                    {selectedTags.length > 0 && (
                        <View style={{
                            backgroundColor: "rgba(0, 191, 255, 0.15)",
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Feather name="tag" size={18} color="#00BFFF" />
                            <Text style={{
                                color: "white",
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
                    backgroundColor: "rgba(0, 49, 76, 0.3)",
                    width: "100%",
                    borderRadius: 16,
                    padding: 30,
                    borderLeftWidth: 3,
                    borderLeftColor: "#00BFFF",
                    marginBottom: 30
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: "rgba(0, 191, 255, 0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <Feather name="check-circle" size={50} color="#00BFFF" />
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: "#C9B9E2",
                        textAlign: "center",
                        marginBottom: 10
                    }}>
                        Empty Log Captured.
                    </Text>


                </View>

                {/* Action buttons with improved styling */}


                <Button
                    onPress={() => router.push("/tabs/HomeScreen")}
                    style={{
                        backgroundColor: "rgba(0, 49, 76, 0.8)",
                        borderColor: "#00BFFF",
                        borderWidth: 1.5,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 100,
                        height: 54,
                        width: "100%",
                    }}
                >
                    <ButtonText
                        style={{
                            color: "#FFFFFF",
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