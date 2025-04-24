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
                        const dreamPostResponse = await axios.get(`${API_BASE_URL}/api/dreamPosts/users/${userId}/date/${date}`);
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
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading User Data...</Text>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>User data not available.</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Analysis...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    // Format the display date nicely
    const displayDate = () => {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);



        switch (month) {
            case "01":
                month = "January";
                break;
            case "02":
                month = "February";
                break;
            case "03":
                month = "March";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "May";
                break;
            case "06":
                month = "June";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "August";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;



        }

        return month + " " + day + " ," + year
    };

    return (
        <LinearGradient
            colors={['#180723', '#2C123F', '#3d1865']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar barStyle="light-content" backgroundColor="#180723" />

            {/* Back Button with improved shadow and positioning */}
            <TouchableOpacity
                onPress={() => router.push("/tabs/DreamVisualization")}
                style={styles.backButton}
            >
                <Feather name="arrow-left" size={28} color="#FFE25E" />
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.headerText}>DREAM VISUALS</Text>
                    <View style={styles.dateContainer}>
                        <Feather name="calendar" size={20} color="#FFE25E" />
                        <Text style={styles.dateText}>{displayDate()}</Text>
                    </View>
                </View>

                {/* Images Section */}
                {images.length > 0 ? (
                    images.map((imgSrc, index) => (
                        <View key={index} style={styles.imageCard}>
                            <Image
                                source={{ uri: imgSrc }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <LinearGradient
                                colors={['#3d1865', '#2C123F']}
                                style={styles.captionContainer}
                            >
                                <Text style={styles.caption}>Dream Visual {index + 1}</Text>
                            </LinearGradient>
                        </View>
                    ))
                ) : (
                    <View style={styles.noImagesContainer}>
                        <Feather name="image" size={60} color="#EADB8C" />
                        <Text style={styles.noImagesText}>No dream visuals available for this date</Text>
                    </View>
                )}

                {/* Bottom padding */}
                <View style={{ height: 30 }} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#180723",
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: "#FFE25E",
        fontSize: 18,
        fontWeight: "500",
    },
    errorText: {
        color: "#FC77A6",
        fontSize: 18,
        fontWeight: "500",
    },
    scrollViewContent: {
        padding: 16,
        paddingTop: 60,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 16,
        zIndex: 10,
        backgroundColor: "rgba(60, 24, 101, 0.7)",
        borderRadius: 12,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 24,
        backgroundColor: "rgba(60, 24, 101, 0.5)",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E9F59D",
        shadowColor: "#FFE25E",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        color: "#FFE25E",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        letterSpacing: 1.2,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(24, 7, 35, 0.5)",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E9F59D',
        marginLeft: 8,
    },
    imageCard: {
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 24,
        width: screenWidth * 0.9,
        alignSelf: "center",
        elevation: 6,
        shadowColor: "#FFE25E",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        borderWidth: 2,
        borderColor: "#EADB8C",
    },
    image: {
        width: "100%",
        height: 240,
    },
    captionContainer: {
        padding: 12,
    },
    caption: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#D7C9E3",
    },
    noImagesContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        backgroundColor: "rgba(60, 24, 101, 0.3)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#3d1865",
        marginTop: 20,
    },
    noImagesText: {
        marginTop: 16,
        fontSize: 16,
        color: "#EADB8C",
        textAlign: "center",
        paddingHorizontal: 20,
    }
});