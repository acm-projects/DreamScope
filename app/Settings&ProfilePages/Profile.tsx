import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";


import React, { useState } from "react"; export default function ProfilePage() {
    return (
        <View style={{ backgroundColor: "blue" }}>
            <Text>
                hi my name is profile
            </Text>
        </View>
    )
}