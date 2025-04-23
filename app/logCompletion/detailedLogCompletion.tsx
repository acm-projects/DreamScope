import { View, Text, StatusBar, Image } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

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
            colors={[DREAM_THEME.darkPurple, DREAM_THEME.purple, DREAM_THEME.lightPurple]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />



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
                            color: DREAM_THEME.whiteYellow,
                            textAlign: "center",
                            marginBottom: 12,
                            textShadowColor: "rgba(252, 119, 166, 0.3)", // Pink shadow
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
                            color: DREAM_THEME.pink,
                            marginBottom: 10,
                        }}
                    >
                        Dream Capture Complete!
                    </Text>

                    {/* Add mood indicator if available */}
                    {dreamMood && (
                        <View style={{
                            backgroundColor: "rgba(252, 119, 166, 0.15)", // Pink with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10
                        }}>
                            <Feather name="smile" size={18} color={DREAM_THEME.yellow} />
                            <Text style={{
                                color: DREAM_THEME.whitePurple,
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
                            backgroundColor: "rgba(252, 119, 166, 0.15)", // Pink with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10
                        }}>
                            <Feather name="eye" size={18} color={DREAM_THEME.yellow} />
                            <Text style={{
                                color: DREAM_THEME.whitePurple,
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
                            backgroundColor: "rgba(252, 119, 166, 0.15)", // Pink with opacity
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 10,
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
                                {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} included
                            </Text>
                        </View>
                    )}
                </View>

                {/* Completion card with success animation */}
                <View style={{
                    alignItems: "center",
                    backgroundColor: "rgba(44, 18, 63, 0.5)", // Purple with opacity
                    width: "100%",
                    borderRadius: 16,
                    padding: 30,
                    borderLeftWidth: 3,
                    borderLeftColor: DREAM_THEME.yellow,
                    marginBottom: 30
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: "rgba(252, 119, 166, 0.2)", // Pink with opacity
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <Feather name="check-circle" size={50} color={DREAM_THEME.yellow} />
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: DREAM_THEME.whitePurple,
                        textAlign: "center",
                        marginBottom: 10
                    }}>
                        Your dream log has been saved successfully.
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: DREAM_THEME.whiteYellow,
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
                        backgroundColor: DREAM_THEME.yellow,
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
                            color: DREAM_THEME.darkPurple,
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
                        backgroundColor: "rgba(44, 18, 63, 0.8)", // Purple with opacity
                        borderColor: DREAM_THEME.pink,
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
                            color: DREAM_THEME.whiteYellow,
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