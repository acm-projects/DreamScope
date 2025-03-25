import { useState } from "react";
import { View, Text, FlatList, TextInput, ScrollView, Button } from "react-native";
import { useRouter } from "expo-router";
import dummyAIAnalysis from "../../Frontend/assets/dummyJson/DummyDataForAIAnalysis.json";

const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export default function AIAnalysisPage() {
    const router = useRouter();

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

            {/* Dream Breakdown */}
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600", marginBottom: 10 }}>
                Your Dream Breakdown/Analysis:
            </Text>

            {/* Categories (Places, People, Objects, Themes, etc.) */}
            {[
                { label: "Places", data: dummyAIAnalysis.places },
                { label: "People", data: dummyAIAnalysis.people },
                { label: "Objects", data: dummyAIAnalysis.objects },
                { label: "Themes", data: dummyAIAnalysis.themes },
                { label: "Reoccurring Places", data: dummyAIAnalysis["reoccuring-places"] },
                { label: "Reoccurring People", data: dummyAIAnalysis["reoccuring-people"] },
                { label: "Reoccurring Objects", data: dummyAIAnalysis["reoccuring-objects"] },
                { label: "Reoccurring Themes", data: dummyAIAnalysis["reoccuring-themes"] },
            ].map((section, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            backgroundColor: "#ADD8E6",
                            padding: 10,
                            borderRadius: 15,
                        }}
                    >
                        {section.label}:
                    </Text>
                    <FlatList
                        data={section.data}
                        renderItem={({ item }) => (
                            <Text style={{ color: "white", marginLeft: 10, fontSize: 16, flexWrap: "wrap" }}>
                                • {item}
                            </Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            ))}

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
                    AI Overview:
                </Text>
                <TextInput
                    editable={false}
                    style={{
                        backgroundColor: "#3C1E59",
                        color: "white",
                        padding: 10,
                        borderRadius: 15,
                        marginTop: 10,
                        height: 150,
                        textAlignVertical: "top",
                        fontSize: 16,
                        fontStyle: "italic",
                    }}
                    placeholder="AI analysis will appear here"
                />
            </View>
        </ScrollView>
    );
}
