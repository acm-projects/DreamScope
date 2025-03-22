import { View, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
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
            <Text style={{ marginBottom: 15, fontSize: 30, color: "white" }}>

                {currentDate}


            </Text>



            <Text style={{ marginBottom: 15, fontSize: 25, color: "white" }}>
                Daily Capture Complete!
            </Text>






            <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                <Button onPress={() => router.push("/logs/AIAnalysisPage")}>
                    <ButtonText style={{ backgroundColor: "blue", color: "white", borderColor: "blue", borderRadius: 12, borderWidth: 12 }}>
                        Continue to Dream Analysis
                    </ButtonText>
                </Button>

                <Button onPress={() => router.push("/tabs/DreamLogging")}>

                    <ButtonText style={{ color: "white", borderColor: "blue", backgroundColor: "blue", borderRadius: 12, borderWidth: 12 }}>
                        Back to Home

                    </ButtonText>
                </Button>
            </View>
        </View>


    );
}