import { View, Text, TouchableOpacity } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter, useLocalSearchParams } from "expo-router";


export default function fragmentedLogCompletion() {
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






            <View style={{ alignItems: "center", backgroundColor: "00314D", width: "100%", borderWidth: 2, borderColor: "#03A4FF" }}>
                <Text>
                    <TouchableOpacity onPress={() => router.push("/logs/AIAnalysisPage")} style={{ alignItems: "center", marginTop: 25, marginBottom: 25, justifyContent: "center", width: 200, height: 50, borderColor: "white", borderWidth: 2, borderRadius: 12, backgroundColor: "#0093ED" }}>
                        <Text style={{ justifyContent: "center", color: "white" }} >
                            Continue to Dream Analysis
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/logs/tabs")} style={{ alignItems: "center", marginTop: 25, marginBottom: 25, justifyContent: "center", width: 200, height: 50, borderColor: "white", borderWidth: 2, borderRadius: 12, backgroundColor: "#0093ED" }}>
                        <Text style={{ justifyContent: "center", color: "white" }} >
                            Back to home
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>


    );
}



