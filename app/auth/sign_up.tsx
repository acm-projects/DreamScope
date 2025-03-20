import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Backend/firebaseConfig";

const SignUp = (): JSX.Element => {
    const [form, setForm] = useState<{ username: string; email: string; password: string; confirmPassword: string }>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

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
            console.log("User registered successfully!", userCredential.user);
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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {/* Logo & Title */}
                    <Text style={styles.title}>
                        <Text>D</Text>
                        <Text style={styles.highlight}>ream</Text>
                        <Text>S</Text>
                        <Text style={styles.highlight}>cope</Text>
                    </Text>

                    <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />

                    {/* Form Fields */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={form.username}
                        onChangeText={(text) => setForm({ ...form, username: text })}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                        secureTextEntry
                    />

                    {/* Register Button */}
                    <TouchableOpacity style={styles.button} onPress={submit} disabled={isSubmitting}>
                        <Text style={styles.buttonText}>{isSubmitting ? "Registering..." : "Register"}</Text>
                    </TouchableOpacity>

                    {/* Login Redirect */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <Link href="../../auth/sign_in" style={styles.linkText}>
                            Log in
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C123F",
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
