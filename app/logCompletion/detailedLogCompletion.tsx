import { View, Text, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

// Updated color theme based on the second program's color scheme
const DREAM_THEME = {
    blue: '#00BFFF',          // Primary accent color (was yellow)
    lightBlue: '#C9B9E2',     // Light text color (was lightYellow)
    whiteBlue: '#FFFFFF',     // White text (was whiteYellow)
    darkBlue: '#15041D',      // Dark background (was darkPurple)
    blue2: '#2C123F',         // Medium background (was purple)
    lightBlue2: '#3B1856',    // Light background (was lightPurple)
    whiteBlue2: '#C9B9E2',    // Light purple text (was whitePurple)
    accentBlue: '#00BFFF',    // Accent color (was pink)
    textLight: '#C9B9E2',     // Using whiteBlue2 for text
    accent: '#00BFFF',        // Using accentBlue as accent
    primaryButton: '#0000ff'  // Using darker blue for primary button
};

export default function DetailedLogCompletion() {
    const router = useRouter();
    const { tags, mood, lucidity } = useLocalSearchParams();

    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Parse tags if they exist
    const selectedTags = tags ? tags.toString().split(",") : [];

    // Get mood and lucidity values if they exist
    const dreamMood = mood ? mood.toString() : null;
    const dreamLucidity = lucidity ? parseInt(lucidity.toString()) : null;

    return (
        <LinearGradient
            colors={[DREAM_THEME.darkBlue, DREAM_THEME.blue2, DREAM_THEME.lightBlue2]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />

            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/completionPage.png")}
                    style={{ backgroundColor: "#180723", maxWidth: "150%", maxHeight: "100%", opacity: 0.1 }}
                    resizeMode="contain"
                />
            </View>



            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20
            }}>
                {/* Header with enhanced styling */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold",
                            color: DREAM_THEME.whiteBlue,
                            textAlign: "center",
                            marginBottom: 12,
                            textShadowColor: "rgba(0, 191, 255, 0.3)", // Blue shadow
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 5,
                        }}
                    >
                        {currentDate}
                    </Text>

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: DREAM_THEME.blue,
                            marginBottom: 10,
                        }}
                    >
                        Dream Capture Complete!
                    </Text>

                    {/* Add mood indicator if available */}
                    {dreamMood && (
                        <View style={{
                            backgroundColor: "rgba(0, 191, 255, 0.15)", // Blue with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10
                        }}>
                            <Feather name="smile" size={18} color={DREAM_THEME.blue} />
                            <Text style={{
                                color: DREAM_THEME.whiteBlue2,
                                fontSize: 15,
                                marginLeft: 8
                            }}>
                                Mood: {dreamMood}
                            </Text>
                        </View>
                    )}

                    {/* Add lucidity indicator if available */}
                    {dreamLucidity !== null && (
                        <View style={{
                            backgroundColor: "rgba(0, 191, 255, 0.15)", // Blue with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10
                        }}>
                            <Feather name="eye" size={18} color={DREAM_THEME.blue} />
                            <Text style={{
                                color: DREAM_THEME.whiteBlue2,
                                fontSize: 15,
                                marginLeft: 8
                            }}>
                                Lucidity: {dreamLucidity}/5
                            </Text>
                        </View>
                    )}

                    {/* Tags section */}
                    {selectedTags.length > 0 && (
                        <View style={{
                            backgroundColor: "rgba(0, 191, 255, 0.15)", // Blue with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Feather name="tag" size={18} color={DREAM_THEME.blue} />
                            <Text style={{
                                color: DREAM_THEME.whiteBlue2,
                                fontSize: 15,
                                marginLeft: 8
                            }}>
                                {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} included
                            </Text>
                        </View>
                    )}
                </View>

                {/* Completion card with success animation */}
                <View style={{
                    alignItems: "center",
                    backgroundColor: "rgba(0, 49, 76, 0.3)", // Darker blue with opacity
                    width: "100%",
                    borderRadius: 16,
                    padding: 30,
                    borderLeftWidth: 3,
                    borderLeftColor: DREAM_THEME.blue,
                    marginBottom: 30
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: "rgba(0, 191, 255, 0.2)", // Blue with opacity
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <Feather name="check-circle" size={50} color={DREAM_THEME.blue} />
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: DREAM_THEME.whiteBlue2,
                        textAlign: "center",
                        marginBottom: 10
                    }}>
                        Your dream log has been saved successfully.
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: DREAM_THEME.whiteBlue2,
                        opacity: 0.8,
                        textAlign: "center",
                        fontStyle: "italic",
                    }}>
                        Would you like to analyze your dream or return home?
                    </Text>
                </View>

                {/* Action buttons with improved styling */}
                <Button
                    onPress={() => router.push({
                        pathname: "/logs/AIAnalysisPage",
                        params: { tags: tags }
                    })}
                    style={{
                        backgroundColor: DREAM_THEME.primaryButton,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 54,
                        width: "100%",
                        marginBottom: 15,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}
                >
                    <ButtonText
                        style={{
                            color: DREAM_THEME.whiteBlue,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        <Feather name="star" size={16} /> Analyze Dream Symbolism
                    </ButtonText>
                </Button>

                <Button
                    onPress={() => router.push("/tabs/HomeScreen")}
                    style={{
                        backgroundColor: "rgba(0, 49, 76, 0.8)", // Darker blue with opacity
                        borderColor: DREAM_THEME.blue,
                        borderWidth: 1.5,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 54,
                        width: "100%",
                    }}
                >
                    <ButtonText
                        style={{
                            color: DREAM_THEME.whiteBlue,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        <Feather name="home" size={16} /> Return to Home
                    </ButtonText>
                </Button>
            </View>
        </LinearGradient>
    );
}