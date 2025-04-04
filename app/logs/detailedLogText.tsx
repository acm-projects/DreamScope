import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailedLogTextScreen() {
    // To push onto new pages
    const router = useRouter();
    // To pass data between pages
    const params = useLocalSearchParams();

    // Default border color, dynamically setting border color
    const [titleBorderColor, setTitleBorderColor] = useState("#00BFFF");
    const [textBorderColor, setTextBorderColor] = useState("#00BFFF");

    // Function that updates when the user finishes editing the text textinput
    const [inputText, setInputText] = useState("");
    const [validText, setValidText] = useState(false);
    const userEndedEditingText = () => {
        if (inputText.trim() === "") {
            setTextBorderColor("red");
            setValidText(false);
        } else {
            setTextBorderColor("#00BFFF");
            setValidText(true);
        }
    };

    // Function that updates when the user finishes editing the title textinput
    const [inputTitle, setInputTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const userEndedEditingTitle = () => {
        if (inputTitle.trim() === "") {
            setTitleBorderColor("red");
            setValidTitle(false);
        } else {
            setTitleBorderColor("#00BFFF");
            setValidTitle(true);
        }
    };

    // Function that checks if the title and text field both contain text.
    const handlePress = () => {
        if (validTitle && validText) {
            return router.push("/logCompletion/detailedLogCompletion");
        } else {
            // If fields are empty, trigger validation UI
            if (!validTitle) {
                setTitleBorderColor("red");
            }
            if (!validText) {
                setTextBorderColor("red");
            }
        }
    };

    // Slicing users tags that got put together as one big string into an array
    let arrayOfUsersTags = [];
    if (params.tags) {
        let z = 0;
        let tagsIndex = 0;
        for (let i = 0; i < params.tags.length; i++) {
            if (params.tags[i] === ",") {
                arrayOfUsersTags[tagsIndex] = params.tags.slice(z, i);
                z = i + 1;
                tagsIndex += 1;
            } else if (i === params.tags.length - 1) {
                arrayOfUsersTags[tagsIndex] = params.tags.slice(z, i + 1);
            }
        }
    }

    // Function that gets today's date!
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

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button with improved shadow and positioning */}
                    <Button
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: 5,
                            left: -8,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "white" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    {/* Header with enhanced styling */}
                    <View style={{ alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                        <Text
                            style={{
                                fontSize: 26,
                                fontWeight: "bold",
                                color: "white",
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
                                fontSize: 16,
                                color: "#C9B9E2",
                                opacity: 0.85,
                                textAlign: "center",
                                fontStyle: "italic",
                                marginBottom: 15,
                            }}
                        >
                            Describe your experience
                        </Text>
                    </View>

                    {/* Tags Container */}
                    {arrayOfUsersTags.length > 0 && (
                        <View
                            style={{
                                backgroundColor: "rgba(0, 49, 76, 0.3)",
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 20,
                                borderLeftWidth: 3,
                                borderLeftColor: "#00BFFF",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "white",
                                    marginBottom: 10,
                                }}
                            >
                                <Feather name="tag" size={14} color="#00BFFF" /> Selected Tags
                            </Text>

                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {arrayOfUsersTags.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            margin: 4,
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            backgroundColor: "#00BFFF",
                                            borderRadius: 12,
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 2,
                                            elevation: 2,
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>
                                            {item}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Title Input Container */}
                    <View
                        style={{
                            backgroundColor: "rgba(0, 49, 76, 0.3)",
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00BFFF",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 10,
                            }}
                        >
                            <Feather name="edit-3" size={14} color="#00BFFF" /> Title
                        </Text>

                        <TextInput
                            value={inputTitle}
                            onChangeText={setInputTitle}
                            onEndEditing={userEndedEditingTitle}
                            numberOfLines={1}
                            multiline={false}
                            placeholder="Enter a title for your experience..."
                            placeholderTextColor="rgba(201, 185, 226, 0.6)"
                            style={{
                                backgroundColor: "#00314C",
                                borderWidth: 2,
                                borderColor: titleBorderColor,
                                borderRadius: 12,
                                color: "white",
                                padding: 12,
                                fontSize: 16,
                            }}
                        />

                        {titleBorderColor === 'red' && (
                            <Text style={{ color: "#FF6B6B", marginTop: 5, fontSize: 12 }}>
                                <Feather name="alert-circle" size={12} /> Please enter a title
                            </Text>
                        )}
                    </View>

                    {/* Main Text Input Container */}
                    <View
                        style={{
                            backgroundColor: "rgba(0, 49, 76, 0.3)",
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 30,
                            borderLeftWidth: 3,
                            borderLeftColor: "#00BFFF",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 10,
                            }}
                        >
                            <Feather name="book-open" size={14} color="#00BFFF" /> Description
                        </Text>

                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            onEndEditing={userEndedEditingText}
                            multiline={true}
                            placeholderTextColor="rgba(201, 185, 226, 0.6)"
                            placeholder="Begin typing your experience here..."
                            style={{
                                height: 200,
                                backgroundColor: "#00314C",
                                borderWidth: 2,
                                borderColor: textBorderColor,
                                padding: 16,
                                color: "white",
                                borderRadius: 12,
                                textAlignVertical: 'top',
                                fontSize: 16,
                            }}
                        />

                        {textBorderColor === 'red' && (
                            <Text style={{ color: "#FF6B6B", marginTop: 5, fontSize: 12 }}>
                                <Feather name="alert-circle" size={12} /> Please enter a description
                            </Text>
                        )}
                    </View>

                    {/* Submit Button */}
                    <Button
                        onPress={handlePress}
                        style={{
                            backgroundColor: validTitle && validText ? "#0000ff" : "rgba(0, 0, 255, 0.5)",
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 54,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                            marginBottom: 20,
                        }}
                    >
                        <ButtonText
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            <Feather name="check-circle" size={18} /> Submit Log
                        </ButtonText>
                    </Button>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        onPress={() => router.push("/tabs")}
                        style={{
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#C9B9E2",
                                textDecorationLine: "underline",
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}