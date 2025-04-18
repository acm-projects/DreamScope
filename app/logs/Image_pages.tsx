import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { useAnalysis } from "../context/AnalysisContext";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function AIAnalysisPage() {
    const router = useRouter();
    const { analysisData, loading, error, fetchDreamPostById } = useAnalysis();
    const { userData, isLoading } = useUser();
    const [postId, setPostId] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]); // Initialize as an empty array

    // Fetch postId from AsyncStorage on component mount
    useEffect(() => {
        const fetchPostId = async () => {
            try {
                const storedPostId = await AsyncStorage.getItem("postId");
                setPostId(storedPostId);
            } catch (error) {
                console.error("Error fetching postId:", error);
            }
        };
        fetchPostId();
    }, []);

    // Fetch dream post data when postId is available
    useEffect(() => {
        if (postId) {
            fetchDreamPostById(postId);
        }
    }, [postId, fetchDreamPostById]);

    useEffect(() => {
        if (analysisData?.visualizations) {
            setImages(analysisData.visualizations); // Set images directly to the array
        } else {
            setImages([]); // Ensure images is an empty array if no visualizations
        }
    }, [analysisData?.visualizations]);

    if (isLoading) {
        return <Text>Loading User Data...</Text>;
    }

    if (!userData) {
        return <Text>User data not available.</Text>;
    }

    if (loading) {
        return <Text style={{ color: "white" }}>Loading Analysis...</Text>;
    }

    if (error) {
        return <Text style={{ color: "red" }}>Error: {error.message}</Text>;
    }

    console.log("in page: ", userData.joinDate);

    // Get current date formatted nicely
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <View style={styles.container}>
            {/* Back Button with improved shadow and positioning */}
            <Button
                onPress={() => router.push("/tabs/DreamVisualization")}
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

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.headerText}>Your Dream Visualizations</Text>
                <Text style={styles.dateText}>Selected Date: {analysisData?.date}</Text>
                {images.map((imgSrc, index) => (
                    <View key={index} style={styles.imageCard}>
                        <Image
                            source={{ uri: imgSrc }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.caption}>Image {index + 1}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C123F",
    },
    scrollViewContent: {
        padding: 16,
        alignItems: "center",
    },
    headerText: {
        color: "#D7C9E3",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    imageCard: {
        backgroundColor: "purple",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 16,
        width: screenWidth * 0.9,
        elevation: 4,
    },
    image: {
        width: "100%",
        height: 200,
    },
    caption: {
        textAlign: "center",
        padding: 8,
        fontWeight: "600",
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D7C9E3',
    },
});