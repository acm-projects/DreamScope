import { View, Text } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter, useLocalSearchParams } from "expo-router";


export default function detailedLogCompletion() {
    const router = useRouter();
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });





    return (





        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2D1A54" }}>
            <Text style={{ marginBottom: 15, fontSize: 30, color: "white" }}>{currentDate} </Text>
            {currentDate}



            <Text style={{ marginBottom: 15, fontSize: 25, color: "white" }}>
                Daily Capture Complete!
            </Text>







            <View>
                <Button onPress={() => router.push("/tabs/AIAnalysis")}>
                    Continue to dream ai analysis / where you can decide to post ( think instead of AI-Analysis Tab we make a community tab and just have AA be after logging)
                </Button>
            </View>
        </View>


    );
}