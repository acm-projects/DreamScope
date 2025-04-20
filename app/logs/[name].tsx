import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable, Alert, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { GluestackUIProvider } from "../../components/ui/gluestack-ui-provider";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = 'http://10.0.2.2:5001';

export default function TagsScreen() {

    const [selectedThemesTags, setSelectedThemesTags] = useState<string[]>([]);
    const [selectedSettingsTags, setSelectedSettingsTags] = useState<string[]>([]);
    const [selectedAddonsTags, setSelectedAddonsTags] = useState<string[]>([]);

    const router = useRouter();
    const { name } = useLocalSearchParams();
    const params = useSearchParams();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isNavigating, setIsNavigating] = useState(false);

    // Function for today's date
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    const currentDateNumFormat = new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    })



    // Use useEffect for navigation based on conditions
    useEffect(() => {
        // Prevent unnecessary navigation if we're already handling it
        if (isNavigating) return;

        if (name === "Empty Capture") {

            setIsNavigating(true);
            router.push({
                pathname: "/logCompletion/emptyLogCompletion", params: {
                    monthDayYear: currentDateNumFormat,
                    title: "",
                    text: "",
                    dreamtype: name,
                    tags: [],
                    THEMETAGS: [],
                    SETTINGSTAGS: [],
                    ADDONSTAGS: [],

                }
            });

        } else if (name === "Fragmented Capture") {
            setIsNavigating(true);
            router.push({
                pathname: "/logs/fragmentedLogPartSelectionScreen",
                params: { name: name }
            });
        }
    }, [name, router, isNavigating]);

    // Function to toggle tag selection
    const handleTagPress = (tagType: string, tag: string) => {
        {/*This if statement is to check what type of tag it is theme,setting,addon*/ }
        if (tagType == "Themes") {
            setSelectedThemesTags((prevThemeTags) =>
                prevThemeTags.includes(tag)
                    ? prevThemeTags.filter((T) => T !== tag)
                    : [...prevThemeTags, tag]
            )

        }
        else if (tagType == "Settings") {
            setSelectedSettingsTags((prevSettingTags) =>
                prevSettingTags.includes(tag)
                    ? prevSettingTags.filter((S) => S !== tag)
                    : [...prevSettingTags, tag]

            )
        }
        else {
            setSelectedAddonsTags((prevAddonTags) =>
                prevAddonTags.includes(tag)
                    ? prevAddonTags.filter((A) => A !== tag)
                    : [...prevAddonTags, tag]

            )
        }

        {/* this is basically the stuff above but a seperate string array that just has it all shoved and mixed togetther*/ }
        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };


    // If we're in the process of navigating, return null to avoid rendering
    if (isNavigating || name === "Empty Capture" || name === "Fragmented Capture") {
        return null;
    }

    // Tags sections
    const sections: { title: string; data: string[] }[] = [
        { title: "Themes", data: tags.themes },
        { title: "Settings", data: tags.settings },
        { title: "Add-ons", data: tags.addons },
    ];

    // Function to render tags in a flexbox layout that properly wraps
    const renderTagsGrid = (tags: string[], sectionTitle: string) => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                    <Pressable
                        key={tag}
                        onPress={() => handleTagPress(sectionTitle, tag)}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.8 : 1,
                            transform: [{ scale: pressed ? 0.98 : 1 }],
                            shadowColor: selectedTags.includes(tag) ? "#00BFFF" : "transparent",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                            elevation: selectedTags.includes(tag) ? 3 : 0,
                        })}
                    >
                        <View
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 12,
                                borderRadius: 12,
                                backgroundColor: selectedTags.includes(tag)
                                    ? "#00BFFF"
                                    : "#00314C",
                                borderColor: "#00BFFF",
                                borderWidth: selectedTags.includes(tag) ? 0 : 1.5,
                                margin: 5,
                                minWidth: 90,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: selectedTags.includes(tag) ? "white" : "#E4D7F4",
                                    textAlign: "center",
                                }}
                            >
                                {tag}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            {/* Decorative background elements */}
            <View style={{ opacity: 0.2, left: 0, right: 0 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground2.png")}
                    style={{ position: "absolute", maxWidth: "auto", maxHeight: "auto" }}
                    resizeMode="contain"
                />
            </View>

            <FlatList
                data={sections}
                keyExtractor={(item) => item.title}
                contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        {/* Navigation row with Back Button and Skip Button */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                            {/* Back Button */}
                            <Button
                                onPress={() => router.push("/tabs/DreamLogging")}
                                style={{
                                    backgroundColor: "transparent",
                                }}
                            >
                                <Text style={{ fontSize: 24, color: "white" }}>
                                    <Feather name="arrow-left" size={30} />
                                </Text>
                            </Button>

                            {/* Skip Button (moved from bottom to top right) */}
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: "/logs/detailedLogText",
                                    params: {
                                        monthDayYear: currentDateNumFormat,
                                        name: name,
                                        tags: [],
                                        THEMETAGS: [],
                                        ADDONTAGS: [],
                                        SETTINGSTAGS: []
                                    }
                                })}
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 8,
                                    marginTop: 15,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                                }}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: "white",
                                    fontWeight: '500'
                                }}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Header */}
                        <View style={{ alignItems: "center", marginTop: 35, marginBottom: 25 }}>
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
                                {name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#C9B9E2",
                                    opacity: 0.85,
                                    textAlign: "center",
                                    fontStyle: "italic",
                                }}
                            >
                                Add some tags for your log!
                            </Text>
                        </View>

                        {/* Selected tags count indicator */}
                        {selectedTags.length > 0 && (
                            <View style={{
                                backgroundColor: "rgba(0, 191, 255, 0.15)",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 20,
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
                                    {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} selected
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{
                        marginBottom: 25,
                        backgroundColor: "rgba(0, 49, 76, 0.3)",
                        borderRadius: 16,
                        padding: 16,
                        borderLeftWidth: 3,
                        borderLeftColor: "#00BFFF",
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 15,
                            }}
                        >
                            <Feather
                                name={
                                    item.title === "Themes" ? "layout" :
                                        item.title === "Settings" ? "settings" : "plus-circle"
                                }
                                size={16}
                                color="#00BFFF"
                            /> {item.title}
                        </Text>

                        {/* Use flex-wrap to ensure tags don't spill out */}
                        {renderTagsGrid(item.data, item.title)}
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 10, marginBottom: 5 }}>
                        {/* Continue Button with improved styling */}
                        <Button
                            onPress={() => router.push({
                                pathname: "/logs/detailedLogText",
                                params: { monthDayYear: currentDateNumFormat, name: name, tags: selectedTags.join(","), THEMETAGS: selectedThemesTags.join(","), ADDONTAGS: selectedAddonsTags.join(","), SETTINGSTAGS: selectedSettingsTags.join(",") }
                            })}
                            style={{
                                backgroundColor: selectedTags.length > 0 ? "#0000ff" : "rgba(0, 0, 255, 0.5)",
                                borderRadius: 12,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 54,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}
                            disabled={selectedTags.length === 0}
                        >
                            <ButtonText
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Continue {selectedTags.length > 0 ? `with ${selectedTags.length} tag${selectedTags.length !== 1 ? "s" : ""}` : ""}
                            </ButtonText>
                        </Button>
                    </View>
                )}
            />
        </LinearGradient>
    );
}