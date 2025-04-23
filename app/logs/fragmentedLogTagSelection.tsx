import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Updated color theme based on your specification
const DREAM_THEME = {
    yellow: '#ffe25e',
    lightYellow: '#eadb8c',
    whiteYellow: '#e9f59d',
    darkPurple: '#180723',
    purple: '#2C123F',
    lightPurple: '#3d1865',
    whitePurple: '#D7C9E3',
    pink: '#fc77a6',
    textLight: '#D7C9E3', // Using whitePurple for text
    accent: '#fc77a6',    // Using pink as accent
    primaryButton: '#ffe25e' // Using yellow for primary button
};

export default function FragmentedTagSelectionScreen() {
    const router = useRouter();
    const { name, parts } = useLocalSearchParams();
    const params = useLocalSearchParams();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [selectedThemesTags, setSelectedThemesTags] = useState<string[]>([]);
    const [selectedSettingsTags, setSelectedSettingsTags] = useState<string[]>([]);
    const [selectedAddonsTags, setSelectedAddonsTags] = useState<string[]>([]);

    // Function for today's date
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Tags sections
    const sections: { title: string; data: string[] }[] = [
        { title: "Themes", data: tags.themes },
        { title: "Settings", data: tags.settings },
        { title: "Add-ons", data: tags.addons },
    ];

    // Function to navigate to the next screen
    const navigateToLogText = () => {
        router.push({
            pathname: "/logs/fragmentedLogText",
            params: {
                parts: parts,
                monthDayYear: params.monthDayYear,
                dreamtype: name,
                tags: selectedTags.join(","),
                THEMETAGS: selectedThemesTags.join(","),
                ADDONTAGS: selectedAddonsTags.join(","),
                SETTINGSTAGS: selectedSettingsTags.join(",")
            }
        });
    };

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

    // Render a tag item with flexible width
    const renderTagItem = (tag: string, tagType: string) => {
        const isSelected = selectedTags.includes(tag);

        return (
            <Pressable
                onPress={() => handleTagPress(tagType, tag)}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    shadowColor: isSelected ? DREAM_THEME.yellow : "transparent",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: isSelected ? 3 : 0,
                    margin: 5,
                })}
            >
                <View
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                        backgroundColor: isSelected ? DREAM_THEME.yellow : DREAM_THEME.purple,
                        borderColor: DREAM_THEME.pink,
                        borderWidth: isSelected ? 0 : 1.5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: isSelected ? DREAM_THEME.darkPurple : DREAM_THEME.whiteYellow,
                            textAlign: "center",
                        }}
                    >
                        {tag}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <LinearGradient
            colors={[DREAM_THEME.darkPurple, DREAM_THEME.purple, DREAM_THEME.lightPurple]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/cloudbackground2.png")}
                    style={{ maxWidth: "auto", maxHeight: "auto" }}
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
                        {/* Navigation controls: Back Button (left) and Skip Button (right) */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                            width: '100%',
                            paddingTop: 5
                        }}>
                            {/* Back Button */}
                            <Button
                                onPress={() => router.back()}
                                style={{
                                    backgroundColor: "transparent",
                                }}
                            >
                                <Text style={{ fontSize: 24, color: DREAM_THEME.whitePurple }}>
                                    <Feather name="arrow-left" size={30} />
                                </Text>
                            </Button>

                            {/* Skip Button */}
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: "/logs/fragmentedLogText",
                                    params: {
                                        parts: parts,
                                        monthDayYear: params.monthDayYear,
                                        dreamtype: name,
                                        tags: "",
                                        THEMETAGS: "",
                                        ADDONTAGS: "",
                                        SETTINGSTAGS: ""
                                    }
                                })}
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 8,
                                    marginTop: 15,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(255, 226, 94, 0.15)' // Yellow with opacity
                                }}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: DREAM_THEME.whiteYellow,
                                    fontWeight: '500'
                                }}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Header with enhanced styling */}
                        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 25 }}>
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "bold",
                                    color: DREAM_THEME.whiteYellow,
                                    textAlign: "center",
                                    marginBottom: 8,
                                    textShadowColor: "rgba(252, 119, 166, 0.3)", // Pink shadow
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
                                    color: DREAM_THEME.pink,
                                    marginBottom: 5,
                                }}
                            >
                                {name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: DREAM_THEME.whitePurple,
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
                                backgroundColor: "rgba(252, 119, 166, 0.15)", // Pink with opacity
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Feather name="tag" size={18} color={DREAM_THEME.yellow} />
                                <Text style={{
                                    color: DREAM_THEME.whitePurple,
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
                        backgroundColor: "rgba(44, 18, 63, 0.5)", // Purple with opacity
                        borderRadius: 16,
                        padding: 16,
                        borderLeftWidth: 3,
                        borderLeftColor: DREAM_THEME.pink,
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: DREAM_THEME.whitePurple,
                                marginBottom: 15,
                            }}
                        >
                            <Feather
                                name={
                                    item.title === "Themes" ? "layout" :
                                        item.title === "Settings" ? "settings" : "plus-circle"
                                }
                                size={16}
                                color={DREAM_THEME.yellow}
                            /> {item.title}
                        </Text>

                        {/* Flexbox View for tag layout */}
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',

                        }}>
                            {item.data.map((tag) => (
                                <View key={tag} style={{ marginTop: 3, marginBottom: 0, marginLeft: 0, marginRight: 3, flexDirection: 'row' }}>
                                    {renderTagItem(tag, item.title)}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 10, marginBottom: 5 }}>
                        {/* Continue Button with improved styling */}
                        <Button
                            onPress={navigateToLogText}
                            style={{
                                backgroundColor: selectedTags.length > 0 ? DREAM_THEME.yellow : "rgba(255, 226, 94, 0.5)", // Yellow with opacity when disabled
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
                                    color: DREAM_THEME.darkPurple,
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