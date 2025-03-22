import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../Frontend/assets/dummyJson/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";


export default function HomeScreenScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <Text style={{ fontSize: 30, color: "white" }}>
                Home Screen


            </Text>

            <View style={{ flex: 0.08, backgroundColor: "blue" }} >
                <Button onPress={() => router.push("/Settings&ProfilePages/Settings")} style={{ marginBottom: 25 }}>
                    <ButtonText style={{ color: "white" }}>
                        <Fontisto name="spinner-cog" size={45} />
                    </ButtonText>

                </Button>
            </View>
        </View>

    );
}