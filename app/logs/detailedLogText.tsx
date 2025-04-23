import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, StatusBar } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"

const API_BASE_URL = 'http://10.0.2.2:5001';


export default function DetailedLogTextScreen() {
    // To push onto new pages
    const router = useRouter();
    // To pass data between pages
    const params = useLocalSearchParams();

    // Default border color, dynamically setting border color
    const [titleBorderColor, setTitleBorderColor] = useState("#ffe25e");
    const [textBorderColor, setTextBorderColor] = useState("#ffe25e");

    // Text input state and validation
    const [inputText, setInputText] = useState("");
    const [validText, setValidText] = useState(false);

    // Title input state and validation
    const [inputTitle, setInputTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);

    // Updated handler for text input with immediate validation
    const handleTextChange = (text: string) => {
        setInputText(text);
        setValidText(text.trim() !== "");
        setTextBorderColor(text.trim() !== "" ? "#ffe25e" : "#fc77a6");
    };

    // Handler for when user finishes editing text
    const userEndedEditingText = () => {
        if (inputText.trim() === "") {
            setTextBorderColor("#fc77a6");
            setValidText(false);
        } else {
            setTextBorderColor("#ffe25e");
            setValidText(true);
        }
    };

    // Updated handler for title input with immediate validation
    const handleTitleChange = (text: string) => {
        setInputTitle(text);
        setValidTitle(text.trim() !== "");
        setTitleBorderColor(text.trim() !== "" ? "#ffe25e" : "#fc77a6");
    };

    // Handler for when user finishes editing title
    const userEndedEditingTitle = () => {
        if (inputTitle.trim() === "") {
            setTitleBorderColor("#fc77a6");
            setValidTitle(false);
        } else {
            setTitleBorderColor("#ffe25e");
            setValidTitle(true);
        }
    };

    // Function that checks if the title and text field both contain text.
    const handlePress = async () => {
        const isTitleValid = inputTitle.trim() !== "";
        const isTextValid = inputText.trim() !== "";

        setValidTitle(isTitleValid);
        setValidText(isTextValid);
        setTitleBorderColor(isTitleValid ? "#ffe25e" : "#fc77a6");
        setTextBorderColor(isTextValid ? "#ffe25e" : "#fc77a6");

        if (validTitle && validText) {
            router.push('/logCompletion/detailedLogCompletion');
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                const response = await axios.get(`${API_BASE_URL}/users/email/${storedEmail}`);
                const userId = response.data._id;

                console.log(response.data.name);
                const dreamData = {
                    userId: userId,
                    title: inputTitle,
                    type: "Detailed",
                    dreamText: inputText,
                    selectedThemes: params.THEMETAGS,
                    selectedSettings: params.SETTINGSTAGS,
                    selectedEmotions: params.ADDONSTAGS,
                };

                const apiResponse = await axios.post(`${API_BASE_URL}/api/dreamPosts`, dreamData);
                await AsyncStorage.setItem('postId', apiResponse.data._id);
                const totalDreams = response.data.totalDreams + 1;
                const detailedDreams = response.data.detailedDreams + 1;


                await axios.put(`${API_BASE_URL}/users/${userId}`, {
                    totalDreams: totalDreams + 1,
                    detailedDreams: detailedDreams + 1,
                });

                console.log("done");


            } catch (error) {
                console.error('Error submitting dream log:', error);
                Alert.alert('Error', 'Failed to submit dream log.');
            }
        }
        else {
            console.log("valid title and text is not true");
        }

    };

    // Improved tag parsing
    const arrayOfUsersTags = params.tags ? params.tags.toString().split(',') : [];

    // Function that gets today's date!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <LinearGradient
            colors={["#180723", "#2C123F", "#3d1865"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            <View style={{ opacity: 0.2, left: 0, right: 0 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground2.png")}
                    style={{ position: "absolute", maxWidth: "auto", maxHeight: "auto" }}
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
                            top: "3%",
                            left: "2%",
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#e9f59d" }}>
                            <Feather name="arrow-left" size={30} />
                        </Text>
                    </Button>

                    {/* Header with enhanced styling */}
                    <View style={{ alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                        <Text
                            style={{
                                fontSize: 26,
                                fontWeight: "bold",
                                color: "#e9f59d",
                                textAlign: "center",
                                marginBottom: 8,
                                textShadowColor: "rgba(255, 226, 94, 0.3)",
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 5,
                            }}
                        >
                            {currentDate}
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
                            Describe your experience
                        </Text>
                    </View>

                    {/* Tags Container */}
                    {arrayOfUsersTags.length > 0 && (
                        <View
                            style={{
                                backgroundColor: "rgba(24, 7, 35, 0.6)",
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 20,
                                borderLeftWidth: 3,
                                borderLeftColor: "#ffe25e",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#D7C9E3",
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
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#e9f59d" }}>
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
                            backgroundColor: "rgba(24, 7, 35, 0.6)",
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 20,
                            borderLeftWidth: 3,
                            borderLeftColor: "#ffe25e",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#D7C9E3",
                                marginBottom: 10,
                            }}
                        >
                            <Feather name="edit-3" size={14} color="#ffe25e" /> Title
                        </Text>

                        <TextInput
                            value={inputTitle}
                            onChangeText={handleTitleChange}
                            onEndEditing={userEndedEditingTitle}
                            numberOfLines={1}
                            multiline={false}
                            placeholder="Enter a title for your experience..."
                            placeholderTextColor="rgba(215, 201, 227, 0.6)"
                            style={{
                                backgroundColor: "#180723",
                                borderWidth: 2,
                                borderColor: titleBorderColor,
                                borderRadius: 12,
                                color: "#e9f59d",
                                padding: 12,
                                fontSize: 16,
                            }}
                        />

                        {titleBorderColor === '#fc77a6' && (
                            <Text style={{ color: "#fc77a6", marginTop: 5, fontSize: 12 }}>
                                <Feather name="alert-circle" size={12} /> Please enter a title
                            </Text>
                        )}
                    </View>

                    {/* Main Text Input Container */}
                    <View
                        style={{
                            backgroundColor: "rgba(24, 7, 35, 0.6)",
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 30,
                            borderLeftWidth: 3,
                            borderLeftColor: "#ffe25e",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#D7C9E3",
                                marginBottom: 10,
                            }}
                        >
                            <Feather name="book-open" size={14} color="#ffe25e" /> Description
                        </Text>

                        <TextInput
                            value={inputText}
                            onChangeText={handleTextChange}
                            onEndEditing={userEndedEditingText}
                            multiline={true}
                            placeholderTextColor="rgba(215, 201, 227, 0.6)"
                            placeholder="Begin typing your experience here..."
                            style={{
                                height: 200,
                                backgroundColor: "#180723",
                                borderWidth: 2,
                                borderColor: textBorderColor,
                                padding: 16,
                                color: "#e9f59d",
                                borderRadius: 12,
                                marginBottom: 25,
                                textAlignVertical: 'top',
                                fontSize: 16,
                            }}
                        />

                        {textBorderColor === '#fc77a6' && (
                            <Text style={{ color: "#fc77a6", marginTop: 5, fontSize: 12 }}>
                                <Feather name="alert-circle" size={12} /> Please enter a description
                            </Text>
                        )}
                    </View>

                    {/* Submit Button */}
                    <Button
                        onPress={handlePress}
                        style={{
                            backgroundColor: validTitle && validText ? "#fc77a6" : "rgba(252, 119, 166, 0.5)",
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
                                color: "#e9f59d",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            <Feather name="check-circle" size={18} /> Submit Log
                        </ButtonText>
                    </Button>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        onPress={() => router.push("/tabs/HomeScreen")}
                        style={{
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#eadb8c",
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