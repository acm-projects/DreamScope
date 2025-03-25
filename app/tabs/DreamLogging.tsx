import { View, FlatList, Text, TouchableOpacity, SafeAreaView, Touchable } from "react-native";
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

        <SafeAreaView style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <Text style={{
                color: "white",
                fontSize: 40,
                marginTop: 0,
                marginBottom: 5, flex: 1, backgroundColor: "#304575"
            }}>Dream Logging, {currentDate}</Text>





            <FlatList style={{ marginTop: 30 }}
                data={options}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => router.push(`/logs/${item.name}`)} style={{ borderColor: "white", marginBottom: 30, padding: 55, borderRadius: 12, backgroundColor: "#00314C", }}>

                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", textAlign: "center" }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: "white", opacity: 0.8, textAlign: "center" }}>
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </SafeAreaView>
        // </GluestackUIProvider>
    );
}