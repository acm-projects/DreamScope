import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { Button, ButtonText } from "@/components/ui/button";



const screenWidth = Dimensions.get("window").width;



export default function DreamVisualizationScreen() {
    const router = useRouter();
    const [images, setImages] = useState([
        // Replace these URLs with AI-generated ones
        "https://via.placeholder.com/300x200.png?text=Data+1",
        "https://via.placeholder.com/300x200.png?text=",
        "https://via.placeholder.com/300x200.png?text=",
        "https://via.placeholder.com/300x200.png?text=",
        "https://via.placeholder.com/300x200.png?text=",
        "https://via.placeholder.com/300x200.png?text=",
        "https://via.placeholder.com/300x200.png?text=",
    ]);

    const { date } = useLocalSearchParams(); // Retrieve the date parameter from the route

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