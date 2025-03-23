import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../Frontend/assets/dummyJson/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";

const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export default function DreamLogScreen() {
    const router = useRouter();

    return (


        // <GluestackUIProvider>

        <View style={{ flex: 1, backgroundColor: "#2C123F", padding: 20 }}>
            <Text style={{ marginBottom: 35, fontSize: 30, color: "white" }}>
                {currentDate}
            </Text>





            <FlatList
                data={options}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({ item }) => (

                    <Button onPress={() => router.push(`/logs/${item.name}`)} style={{ borderStyle: "dotted", borderColor: "white", marginBottom: 30, padding: 55, borderWidth: 1, borderRadius: 12, backgroundColor: "#D7C9E3", }}>
                        <View>
                            <ButtonText style={{ fontSize: 18, fontWeight: "bold", color: "white", textAlign: "center" }}>
                                {item.name}
                            </ButtonText>
                            <ButtonText style={{ fontSize: 14, color: "white", opacity: 0.8, textAlign: "center" }}>
                                {item.description}
                            </ButtonText>
                        </View>
                    </Button>
                )}
            />
        </View>
        // </GluestackUIProvider>
    );
}
