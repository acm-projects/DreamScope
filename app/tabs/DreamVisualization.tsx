import { View, FlatList, Text, ScrollView, SafeAreaView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../Frontend/assets/dummyJson/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";
import { useState } from 'react';
import CalendarPicker from "react-native-calendar-picker";



export default function DreamVisualizationScreen() {
    const router = useRouter();
    const [value, onChange] = useState(new Date());
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <View>
                <Text style={{
                    color: "white",
                    fontSize: 40,
                    marginTop: 5,
                    marginBottom: 5, flex: 1, backgroundColor: "#304575"
                }}>Dream Visualization</Text>
                <ScrollView>
                    <CalendarPicker >

                    </CalendarPicker>


                </ScrollView>
            </View>
        </SafeAreaView>

    );
}