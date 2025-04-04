import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAnalysis } from "../context/AnalysisContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export default function AIAnalysisPage() {
    const router = useRouter();
    const { analysisData, loading, error, fetchDreamPostById } = useAnalysis();
    const [postId, setPostId] = useState<string | null>(null);

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
    }, []); // Run only once on mount

    useEffect(() => {
        if (postId) {
            fetchDreamPostById(postId);
        }
    }, [postId, fetchDreamPostById]); // Run when postId changes

    if (loading) {
        return <Text style={{ color: "white" }}>Loading Analysis...</Text>;
    }

    if (error) {
        return <Text style={{ color: "red" }}>Error: {error.message}</Text>;
    }
    console.log("in page: ", analysisData);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#2C123F", padding: 20 }}>
            {/* Header Section */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    {currentDate}
                </Text>
                <Button
                    onPress={() => router.push("/tabs")}
                    title="Back to Home"
                    color="grey"
                    style={{
                        marginTop: 10,
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: "white",
                        padding: 5,
                        borderRadius: 50,
                    }}
                />
            </View>

            {/* AI Insight/Analysis View */}
            <View style={{ marginTop: 20 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10,
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 15,
                    }}
                >
                    AI Overview: {analysisData}
                </Text>
            </View>
        </ScrollView>
    );
}