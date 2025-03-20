import { View, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Redirect, useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import options from "../../assets/options.json";  // Update path because we moved this file
import { Fontisto } from "@expo/vector-icons";


export default function HomeScreenScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <Text style={{ fontSize: 30, color: "white" }}>
                Home Screen

                <Button onPress={() => router.push("/Settings&ProfilePages/Settings")} style={{ marginBottom: 25, paddingLeft: 400 }}>
                    <ButtonText style={{ color: "white" }}>
                        <Fontisto name="spinner-cog" />
                    </ButtonText>

                </Button>
            </Text>
        </View>

    );
}
