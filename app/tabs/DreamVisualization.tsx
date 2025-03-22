import { View, FlatList, Text, ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../Frontend/assets/dummyJson/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";
import { useState } from 'react';
import Calendar from "react-calendar";



export default function DreamVisualizationScreen() {
    const router = useRouter();
    const [value, onChange] = useState(new Date());
    return (
        <View style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <ScrollView>




            </ScrollView>

        </View>

    );
}