import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../assets/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";
import { useState } from 'react';
import Calendar from "react-calendar";



export default function DreamVisualizationScreen() {
    const router = useRouter();
    const [value, onChange] = useState(new Date());
    return (
        <View style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <Text style={{ fontSize: 30, color: "white" }}> Dream Visualization</Text>



            <Calendar></Calendar>


            <Button onPress={() => router.push("/tabs")} style={{ marginTop: 50, borderColor: "blue" }}>
                <ButtonText style={{ color: "white" }}>

                    Visualize Dream
                </ButtonText>
            </Button>

        </View>

    );
}
