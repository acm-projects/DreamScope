import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function FragmentedLogPartSelectionScreen() {
    const router = useRouter();
    let parts = ["2", "3", "4"];
    const { name } = useLocalSearchParams();
    const params = useSearchParams();
    const [selectedPart, setSelectedPart] = useState<string[]>([]);

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
    });

    const sections: { title: string; data: string[] }[] = [
        { title: "Number of Parts", data: parts },
    ];

    // Function to toggle part selection
    const handleTagPress = (tag: string) => {
        setSelectedPart([tag]); // Only allow one selection
    };

    const handleContinuePress = () => {
        if (selectedPart.length > 0) {
            router.push({
                pathname: "/logs/fragmentedLogTagSelection",
                params: { parts: selectedPart[0], name: name, monthDayYear: currentDateNumFormat }
            });
        }
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
                        {/* Back Button */}
                        <Button
                            onPress={() => router.push("/tabs/DreamLogging")}
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
                                How many parts will your log have?
                            </Text>
                        </View>

                        {/* Selected part indicator */}
                        {selectedPart.length > 0 && (
                            <View style={{
                                backgroundColor: "rgba(0, 191, 255, 0.15)",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Feather name="layers" size={18} color="#00BFFF" />
                                <Text style={{
                                    color: "white",
                                    fontSize: 15,
                                    marginLeft: 8
                                }}>
                                    {selectedPart[0]} parts selected
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{
                        marginBottom: 25,
                        backgroundColor: "rgba(0, 49, 76, 0.6)",
                        borderRadius: 16,
                        padding: 16,
                        borderLeftWidth: 3,
                        borderLeftColor: "#C9B9E2",
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 15,
                            }}
                        >
                            <Feather name="layers" size={16} color="#00BFFF" /> {item.title}
                        </Text>

                        <FlatList
                            data={item.data}
                            keyExtractor={(tag) => tag}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item: tag }) => (
                                <Pressable
                                    onPress={() => handleTagPress(tag)}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.8 : 1,
                                        transform: [{ scale: pressed ? 0.98 : 1 }],
                                        shadowColor: selectedPart.includes(tag) ? "#00BFFF" : "transparent",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 4,
                                        elevation: selectedPart.includes(tag) ? 3 : 0,
                                        marginRight: 12,
                                    })}
                                >
                                    <View
                                        style={{
                                            width: "100%",
                                            height: 150,
                                            marginBottom: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 16,
                                            backgroundColor: selectedPart.includes(tag)
                                                ? "#00BFFF"
                                                : "#00314C",
                                            borderColor: "#00BFFF",
                                            borderWidth: selectedPart.includes(tag) ? 0 : 1.5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 48,
                                                fontWeight: "bold",
                                                color: selectedPart.includes(tag) ? "white" : "#E4D7F4",
                                                textAlign: "center",
                                            }}
                                        >
                                            {tag}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: selectedPart.includes(tag) ? "white" : "#C9B9E2",
                                                textAlign: "center",
                                                marginTop: 6,
                                            }}
                                        >
                                            parts
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginTop: 50, marginBottom: 20 }}>
                        {/* Continue Button with improved styling */}
                        <Button
                            onPress={handleContinuePress}
                            style={{
                                backgroundColor: selectedPart.length > 0 ? "#0000ff" : "rgba(0, 0, 255, 0.5)",
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
                            disabled={selectedPart.length === 0}
                        >
                            <ButtonText
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Continue {selectedPart.length > 0 ? `with ${selectedPart[0]} parts` : ""}
                            </ButtonText>
                        </Button>

                        <TouchableOpacity
                            onPress={() => router.push("/tabs/DreamLogging")}
                            style={{
                                alignItems: "center",
                                marginTop: 15,
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
                    </View>
                )}
            />
        </LinearGradient>
    );
}