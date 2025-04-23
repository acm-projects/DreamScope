import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable'; // You may need to install this package

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

    // Loading state
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState('');
    const [loadingStage, setLoadingStage] = useState(0);

    // Handle text input changes
    const handleInputChange = (text: string, index: number) => {
        const newFields = [...inputFields];
        newFields[index] = text;
        setInputFields(newFields);
        if (error) setError(false);
    };

    // Function to simulate loading progress
    const updateLoadingProgress = () => {
        const loadingSteps = [
            'Processing your fragmented entry...',
            'Analyzing dream patterns...',
            'Organizing your fragments...',
            'Saving your dream log...'
        ];

        let currentStep = 0;

        const progressInterval = setInterval(() => {
            if (currentStep < loadingSteps.length) {
                setLoadingProgress(loadingSteps[currentStep]);
                setLoadingStage(currentStep + 1);
                currentStep++;
            } else {
                clearInterval(progressInterval);
            }
        }, 1500);

        return progressInterval;
    };

    //function that checks if the title and text field both contain text.
    const handlePress = async () => {

        if (inputFields.every(field => field.trim() !== "")) {
            // Join all fragments and pass as a parameter
            const allText = inputFields.join(" ||| ");

            setIsLoading(true);
            const progressInterval = updateLoadingProgress();

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

                clearInterval(progressInterval);
                setIsLoading(false);
                router.push("/logCompletion/fragmentedLogCompletion");

            } catch (error) {
                console.log('Error submitting dream log:', error);
                clearInterval(progressInterval);
                setIsLoading(false);
                Alert.alert('Error', 'Failed to submit dream log.');
            }

        } else {
            setError(true);
        }
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

    if (isLoading) {
        return (
            <LinearGradient
                colors={["#180723", "#2C123F", "#3d1865"]}
                style={styles.loadingContainer}
            >
                <StatusBar barStyle="light-content" />

                <View style={styles.loadingContent}>
                    <Animatable.View
                        animation="pulse"
                        iterationCount="infinite"
                        duration={1500}
                    >
                        <View style={styles.loadingIconContainer}>
                            <Feather name="moon" size={50} color="#ffe25e" />
                        </View>
                    </Animatable.View>

                    <Text style={styles.loadingTitle}>Dreaming in Progress</Text>

                    <Text style={styles.loadingText}>{loadingProgress}</Text>

                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${loadingStage * 25}%` }]} />
                    </View>

                    <View style={styles.loadingDotsContainer}>
                        <Animatable.Text
                            animation="flash"
                            iterationCount="infinite"
                            duration={1000}
                            style={styles.loadingDots}
                        >
                            ...
                        </Animatable.Text>
                    </View>

                    <Text style={styles.loadingSubtext}>
                        Please wait while we process your dream
                    </Text>
                </View>

                <Image
                    source={require("../../Frontend/images/cloudbackground2.png")}
                    style={styles.backgroundImage}
                    resizeMode="contain"
                />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={["#180723", "#2C123F", "#3d1865"]}
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
                        <Text style={{ fontSize: 24, color: "#e9f59d" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    {/* Header with enhanced styling */}
                    <View style={{ alignItems: "center", marginBottom: 30 }}>
                        <Text
                            style={{
                                fontSize: 26,
                                fontWeight: "bold",
                                color: "#ffe25e",
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowColor: "rgba(252, 119, 166, 0.3)",
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
                                color: "#fc77a6",
                                marginBottom: 5,
                            }}
                        >
                            {name || "Fragmented Capture"}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#D7C9E3",
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
                                backgroundColor: "rgba(24, 7, 35, 0.6)",
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 20,
                                borderLeftWidth: 3,
                                borderLeftColor: "#fc77a6",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#e9f59d",
                                    marginBottom: 10,
                                }}
                            >
                                <Feather name="tag" size={14} color="#ffe25e" /> Selected Tags
                            </Text>

                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {arrayOfUsersTags.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            margin: 4,
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            backgroundColor: "#fc77a6",
                                            borderRadius: 12,
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 2,
                                            elevation: 2,
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#180723" }}>
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
                                color: "#ffe25e",
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
                                    borderColor: error && value.trim() === "" ? "#FF3B30" : "#eadb8c",
                                    borderWidth: 1.5,
                                    backgroundColor: "rgba(60, 24, 101, 0.3)",
                                    padding: 15,
                                    color: "#e9f59d",
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
                            backgroundColor: "#fc77a6",
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
                                color: "#180723",
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

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContent: {
        alignItems: 'center',
        padding: 20,
        width: '90%',
        maxWidth: 400,
    },
    loadingIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(61, 24, 101, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#fc77a6',
        shadowColor: '#ffe25e',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    loadingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffe25e',
        marginBottom: 12,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#D7C9E3',
        marginBottom: 25,
        textAlign: 'center',
    },
    progressContainer: {
        height: 10,
        width: '100%',
        backgroundColor: 'rgba(61, 24, 101, 0.5)',
        borderRadius: 10,
        marginBottom: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eadb8c',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#fc77a6',
        borderRadius: 10,
    },
    loadingDotsContainer: {
        height: 20,
        marginBottom: 10,
    },
    loadingDots: {
        color: '#ffe25e',
        fontSize: 30,
        lineHeight: 30,
    },
    loadingSubtext: {
        fontSize: 14,
        color: '#eadb8c',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.15,
    }
});