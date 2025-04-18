import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Backend/firebaseConfig";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'http://localhost:5001';

const SignUp = (): JSX.Element => {
    const [form, setForm] = useState<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string; 
    }>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [focusedField, setFocusedField] = useState<"username" | "email" | "password" | "confirmPassword" | null>(null);

    const submit = async () => {
        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (form.password !== form.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setSubmitting(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

            const response = await axios.post(`${API_BASE_URL}/api/users`, { name: form.username, email: form.email });
            //const createCheckIn = await axios.post(`${API_BASE_URL}/api/checkIn`, {userId: response.data._id, checkInText: " ", date: response.data.joinDate})
           
            await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
            await AsyncStorage.setItem("userEmail", form.email);
            console.log("User registered successfully!");


            router.push("../tabs");

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Sign up error:", error.message);
                Alert.alert("Error", "Failed to sign up. Try again.");
            } else {
                console.error("An unknown error occurred");
                Alert.alert("Error", "An unknown error occurred.");
            }
        }
        setSubmitting(false);
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>
                            <Text>D</Text>
                            <Text style={styles.highlight}>ream</Text>
                            <Text>S</Text>
                            <Text style={styles.highlight}>cope</Text>
                        </Text>

                        <Image source={require("../../Frontend/images/logo-final.png")} style={styles.logo} resizeMode="contain" />

                        <TextInput
                            style={[styles.input, focusedField === "username" && styles.inputFocused]}
                            placeholder="Enter your username"
                            value={form.username}
                            onChangeText={(text) => setForm({ ...form, username: text })}
                            autoCapitalize="none"
                            onFocus={() => setFocusedField("username")}
                            onBlur={() => setFocusedField(null)}
                        />

                        <TextInput
                            style={[styles.input, focusedField === "email" && styles.inputFocused]}
                            placeholder="Enter your email"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                        />

                        <TextInput
                            style={[styles.input, focusedField === "password" && styles.inputFocused]}
                            placeholder="Enter your password"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            secureTextEntry
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                        />

                        <TextInput
                            style={[styles.input, focusedField === "confirmPassword" && styles.inputFocused]}
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                            secureTextEntry
                            onFocus={() => setFocusedField("confirmPassword")}
                            onBlur={() => setFocusedField(null)}
                        />

                        <TouchableOpacity style={styles.button} onPress={submit} disabled={isSubmitting}>
                            <Text style={styles.buttonText}>
                                {isSubmitting ? "Registering..." : "Register"}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <Link href="../../auth/sign_in" style={styles.linkText}>
                                Log in
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    innerContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    highlight: {
        color: "#FFD700",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
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
        borderColor: "#fff",
    },
    inputFocused: {
        borderColor: "#FFD700",
    },
    button: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    footer: {
        flexDirection: "row",
        marginTop: 20,
    },
    footerText: {
        color: "#fff",
        fontSize: 16,
    },
    linkText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFD700",
        marginLeft: 5,
    },
});

export default SignUp;
