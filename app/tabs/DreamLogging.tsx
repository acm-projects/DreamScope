import { View, FlatList, Text, TouchableOpacity, SafeAreaView, Dimensions, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Fontisto } from "@expo/vector-icons";
import options from "../../Frontend/assets/dummyJson/options.json";

const { width } = Dimensions.get("window");
const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export default function DreamLogScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <LinearGradient colors={["#180723", "#2C123F", "#2C123F", "#3d1865"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 800, zIndex: 0 }}>
                    <Image
                        source={require("../../Frontend/images/treeforeground.png")}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="stretch"
                    />
                </View>

                <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <Text style={{
                        color: "#D7C9E3",
                        fontSize: 32,
                        fontWeight: "bold",
                        marginBottom: 20,
                        textAlign: "center",
                    }}>
                        Dream Logging
                    </Text>
                    <Text style={{
                        color: "#94C9A9",
                        fontSize: 16,
                        textAlign: "center",
                        marginBottom: 30,
                    }}>
                        {currentDate}
                    </Text>
                </View>

                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
                    data={options}
                    keyExtractor={(item) => item.name.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: `/logs/${item.name}`, params: { name: item.name } })}
                            style={{
                                marginBottom: 25,
                                padding: 24,
                                borderRadius: 20,
                                backgroundColor: "#D7C9E3",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.2,
                                shadowRadius: 10,
                                elevation: 5,
                            }}
                        >
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#2C123F",
                                textAlign: "center",
                                marginBottom: 6,
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: "#D7C9E3",
                                opacity: 0.8,
                                textAlign: "center",
                            }}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}
