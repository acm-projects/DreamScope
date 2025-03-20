import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../assets/options.json";  // Update path because we moved this file
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
            <Text style={{ marginBottom: 15, fontSize: 30, color: "white" }}>{currentDate}

                <Button style={{ marginBottom: 25, paddingLeft: 400 }}>
                    <ButtonText style={{ color: "white" }}>
                        <Fontisto name="redo" />
                    </ButtonText>
                </Button>
            </Text>





            <FlatList
                data={options}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({ item }) => (

                    <Button onPress={() => router.push(`/logs/${item.name}`)} style={{ borderStyle: "dotted", borderColor: "white", marginBottom: 30, padding: 55, borderWidth: 1, borderRadius: 12, backgroundColor: "#00314C", }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", textAlign: "center" }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: "white", opacity: 0.8, textAlign: "center" }}>
                                {item.description}
                            </Text>
                        </View>
                    </Button>
                )}
            />
        </View>
        // </GluestackUIProvider>
    );
}
