import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
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
            <Text style={{
                color: "white",
                fontSize: 40,
                marginTop: 5,
                marginBottom: 5, backgroundColor: "#304575"
            }}>Home Screen</Text>

            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "blue", paddingVertical: 15, borderRadius: 15 }} onPress={() => router.push('/Settings&ProfilePages/Settings')}>
                <Text style={styles.profileButtonText}>Settings Page</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/Settings&ProfilePages/Profile')}>
                <Text style={styles.profileButtonText}>Profile Page</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    profileButton: {
        backgroundColor: '#7D7CF9',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    profileButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});