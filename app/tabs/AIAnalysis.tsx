import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../assets/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";
export default function AIAnalysisScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <Text style={{ fontSize: 30, color: "white" }}> AI Analysis</Text>


            <View>
                <Text style={{ color: "white" }}>
                    List of dreams that dont have an AI Analysis Already:

                    select a dream to analyze
                </Text>


            </View>


        </View>





    );
}
