import React from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from "@expo/vector-icons";

export default function HomeScreenScreen() {
    const router = useRouter();

    const handleProfilePress = () => {
        router.push("../Settings&ProfilePages/Profile"); // Make sure this route exists
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>


                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../Frontend/images/treeforeground.png")}
                        style={styles.image}
                        resizeMode="stretch" // or "stretch"
                    />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <Pressable onPress={handleProfilePress} style={styles.profileButton}>
                        <Fontisto name="person" size={24} color="#D7C9E3" />
                    </Pressable>

                </ScrollView>





            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 0,
        zIndex: 1,
    },
    profileButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2C123F', // or 'transparent' with a border
        borderWidth: 2,
        borderColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // (existing styles remain unchanged below)
    innerContainer: {
        alignItems: "center"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    },
    highlight: {
        color: "#FFD700"
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#fff"
    },
    inputFocused: {
        borderColor: "#FFD700"
    },
    button: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "100%"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000"
    },
    footer: {
        flexDirection: "row",
        marginTop: 20
    },
    footerText: {
        color: "#fff",
        fontSize: 16
    },
    linkText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFD700",
        marginLeft: 5
    },

    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 800, // Adjust this based on how tall your trees image should be
        zIndex: 0,
    },

    image: {
        width: '100%',
        height: '100%',

    },


});
