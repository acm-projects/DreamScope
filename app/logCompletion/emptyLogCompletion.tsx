import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

const COLORS = {
    yellow: '#ffe25e',
    lightYellow: '#eadb8c',
    whiteYellow: '#e9f59d',
    darkPurple: '#180723',
    purple: '#2C123F',
    lightPurple: '#3d1865',
    whitePurple: '#D7C9E3',
    pink: '#fc77a6',
};

export default function DetailedLogCompletion() {
    const router = useRouter();
    const { tags } = useLocalSearchParams();

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const selectedTags = tags ? tags.toString().split(",") : [];

    return (
        <LinearGradient
            colors={[COLORS.darkPurple, COLORS.purple, COLORS.lightPurple]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            {/* Decorative background */}
            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.15 }}>
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
                {/* Header */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold",
                            color: COLORS.whitePurple,
                            textAlign: "center",
                            marginBottom: 12,
                            textShadowColor: "rgba(255, 255, 255, 0.2)",
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 4,
                        }}
                    >
                        {currentDate}
                    </Text>

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: COLORS.yellow,
                            marginBottom: 10,
                        }}
                    >
                        Capture Complete!
                    </Text>

                    {selectedTags.length > 0 && (
                        <View style={{
                            backgroundColor: "rgba(255, 226, 94, 0.2)",
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Feather name="tag" size={18} color={COLORS.yellow} />
                            <Text style={{
                                color: COLORS.whitePurple,
                                fontSize: 15,
                                marginLeft: 8
                            }}>
                                {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} included
                            </Text>
                        </View>
                    )}
                </View>

                {/* Completion Card */}
                <View style={{
                    alignItems: "center",
                    backgroundColor: "rgba(255, 226, 94, 0.07)",
                    width: "100%",
                    borderRadius: 16,
                    padding: 30,
                    borderLeftWidth: 3,
                    borderLeftColor: COLORS.yellow,
                    marginBottom: 30
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: "rgba(255, 226, 94, 0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <Feather name="check-circle" size={50} color={COLORS.yellow} />
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: COLORS.whitePurple,
                        textAlign: "center",
                        marginBottom: 10
                    }}>
                        Empty Log Captured.
                    </Text>
                </View>

                {/* Button */}
                <Button
                    onPress={() => router.push("/tabs/HomeScreen")}
                    style={{
                        backgroundColor: "rgba(255, 226, 94, 0.12)",
                        borderColor: COLORS.yellow,
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
                            color: COLORS.whitePurple,
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
