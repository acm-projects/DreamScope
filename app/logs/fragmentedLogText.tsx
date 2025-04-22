import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, StatusBar } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = 'http://10.0.2.2:5001';

export default function fragmentedLogTextScreen() {

    const router = useRouter();
    const params = useLocalSearchParams();
    const numParts = Number(params.parts) || 1; // Default to 1 if not provided
    const { name } = params;

    // Current date formatting
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Manage multiple input fields dynamically
    const [inputFields, setInputFields] = useState(Array(numParts).fill(""));
    const [error, setError] = useState(false);

    // Handle text input changes
    const handleInputChange = (text: string, index: number) => {
        const newFields = [...inputFields];
        newFields[index] = text;
        setInputFields(newFields);
        if (error) setError(false);
    };

    //function that checks if the title and text field both contain text.
    const handlePress = async () => {

        if (inputFields.every(field => field.trim() !== "")) {
            // Join all fragments and pass as a parameter
            const allText = inputFields.join(" ||| ");

            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                const response = await axios.get(`${API_BASE_URL}/users/email/${storedEmail}`);
                const userId = response.data._id;

                const dreamData = {
                    userId: userId,
                    title: "no title provided",
                    type: "Fragmented",
                    dreamText: allText,
                    selectedThemes: params.THEMETAGS,
                    selectedSettings: params.SETTINGSTAGS,
                    selectedEmotions: params.ADDONSTAGS,
                };

                const apiResponse = await axios.post(`${API_BASE_URL}/api/dreamPosts`, dreamData);
                await AsyncStorage.setItem('postId', apiResponse.data._id);
                const totalDreams = response.data.totalDreams + 1;
                const fragDreams = response.data.fragDreams + 1;

                await axios.put(`${API_BASE_URL}/users/${userId}`, {
                    totalDreams: totalDreams,
                    fragDreams: fragDreams,
                });
                router.push("/logCompletion/fragmentedLogCompletion");


            } catch (error) {
                console.log('Error submitting dream log:', error);
                Alert.alert('Error', 'Failed to submit dream log.');
            }


        } else {
            setError(true);
        }
        return router.push("/logCompletion/fragmentedLogCompletion");
    };



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

    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            {/* Decorative background elements */}
            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground2.png")}
                    style={{ maxWidth: "auto", maxHeight: "auto" }}
                    resizeMode="contain"
                />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 20,
                        paddingTop: 60,
                        paddingBottom: 40
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button with improved shadow and positioning */}
                    <Button
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: 15,
                            left: 10,
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "white" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    {/* Header with enhanced styling */}
                    <View style={{ alignItems: "center", marginBottom: 30 }}>
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
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#00BFFF",
                                marginBottom: 5,
                            }}
                        >
                            {name || "Fragmented Capture"}
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
                            Fill in each part of your fragmented log
                        </Text>

                        {error && (
                            <View style={{
                                backgroundColor: "rgba(255, 59, 48, 0.15)",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 15,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}>
                                <Feather name="alert-circle" size={18} color="#FF3B30" />
                                <Text style={{
                                    color: "#FF3B30",
                                    fontSize: 15,
                                    marginLeft: 8
                                }}>
                                    Please fill in all fields
                                </Text>
                            </View>
                        )}
                    </View>



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

                    {/* Generate Input Fields with improved styling */}
                    {inputFields.map((value, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom: 20,
                                width: "100%",
                            }}
                        >
                            <Text style={{
                                color: "#00BFFF",
                                fontSize: 16,
                                marginBottom: 8,
                                fontWeight: "500"
                            }}>
                                <Feather name="file-text" size={16} /> Fragment {index + 1}
                            </Text>
                            <TextInput
                                value={value}
                                onChangeText={(text) => handleInputChange(text, index)}
                                placeholder={`Enter text for part ${index + 1}...`}
                                placeholderTextColor="rgba(215, 201, 227, 0.6)"
                                multiline={true}
                                numberOfLines={4}
                                style={{
                                    minHeight: 100,
                                    width: "100%",
                                    borderColor: error && value.trim() === "" ? "#FF3B30" : "#00BFFF",
                                    borderWidth: 1.5,
                                    backgroundColor: "rgba(0, 49, 76, 0.3)",
                                    padding: 15,
                                    color: "white",
                                    borderRadius: 12,
                                    textAlignVertical: "top",
                                    fontSize: 16
                                }}
                            />
                        </View>
                    ))}

                    {/* Submit Button with improved styling */}
                    <Button
                        onPress={handlePress}
                        style={{
                            backgroundColor: "#0000ff",
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 54,
                            width: "100%",
                            marginTop: 15,
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
                            <Feather name="check" size={16} /> Continue
                        </ButtonText>
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}