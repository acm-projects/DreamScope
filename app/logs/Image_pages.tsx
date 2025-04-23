import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useAnalysis } from "../context/AnalysisContext";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = 'http://10.0.2.2:5001';

const screenWidth = Dimensions.get("window").width;

export default function AIAnalysisPage() {
    const router = useRouter();
    const { analysisData, loading, error, fetchDreamPostById } = useAnalysis();
    const { userData, isLoading } = useUser();
    const [postId, setPostId] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const { date } = useLocalSearchParams(); // Retrieve the date parameter from the route

    // Fetch postId from AsyncStorage on component mount
    useEffect(() => {
        const fetchPostId = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    const userResponse = await axios.get(`${API_BASE_URL}/users/email/${storedEmail}`);
                    console.log("got email");
                    if (userResponse.data) {
                        const userId = userResponse.data._id;
                        console.log("got user id")
                        const dreamPostResponse = await axios.get(`http://10.0.2.2:5001/api/dreamPosts/users/${userId}/date/${date}`);
                        if (dreamPostResponse.data) {
                            setPostId("68088d4d40764fe7f5620213"); //68043925d627f746b4741cc8
                            console.log("got post id");
                            console.log(date)

                        } else {
                            console.log("No dream post found for this user on the specified date.");
                            setPostId(null);
                        }
                    } else {
                        console.log("User not found with this email.");
                        setPostId(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching postId:", error);
            }
        };
        fetchPostId();
    }, [date]);

    // Fetch dream post data when postId is available
    useEffect(() => {
        if (postId) {
            fetchDreamPostById(postId);
        }
    }, [postId, fetchDreamPostById]);

    useEffect(() => {
        if (analysisData?.visualizations) {
            console.log(images)
            setImages(analysisData.visualizations); // Set images directly to the array
        } else {
            setImages([]); // Ensure images is an empty array if no visualizations
            console.log("hi")
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
                    top: "2%",
                    left: "3%",
                    backgroundColor: "transparent",
                    zIndex: 10,
                }}
            >
                <Text style={{ fontSize: 24, color: "white" }}>
                    <Feather name="arrow-left" size={30} />
                </Text>
            </Button>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.headerText}>{"\n"}YOUR DREAM VISUALS</Text>
                <Text style={styles.dateText}>Selected Date: {date}</Text>
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