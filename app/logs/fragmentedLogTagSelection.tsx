import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

    return (
        <LinearGradient
            colors={["#15041D", "#2C123F", "#3B1856"]}
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

                        <FlatList
                            data={item.data}
                            keyExtractor={(tag) => tag}
                            numColumns={3}
                            scrollEnabled={false}
                            columnWrapperStyle={{ justifyContent: "flex-start" }}
                            renderItem={({ item: tag }) => (
                                <Pressable
                                    onPress={() => handleTagPress(item.title, tag)}
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
                            )}
                        />
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 10, marginBottom: 5 }}>
                        {/* Continue Button with improved styling */}
                        <Button
                            onPress={() => router.push({
                                pathname: "logs/fragmentedLogText",
                                params: { parts: parts, monthDayYear: params.monthDayYear, dreamtype: name, tags: selectedTags.join(","), THEMETAGS: selectedThemesTags, ADDONTAGS: selectedAddonsTags, SETTINGSTAGS: selectedSettingsTags }
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

                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.push({
                            pathname: "logs/fragmentedLogText",
                            params: { parts: parts, dreamtype: params.name, tags: selectedTags.join(","), monthDayYear: params.monthDayYear, SETTINGSTAGS: selectedSettingsTags.join(","), THEMESTAGS: selectedThemesTags.join(","), ADDONSTAGS: selectedAddonsTags.join(",") }
                        })}>
                            <Text style={{ fontSize: 20, marginTop: 35, color: "white", opacity: .50, shadowColor: "white" }}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </LinearGradient>
    );
}