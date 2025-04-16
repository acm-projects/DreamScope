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


const checkDreamType = (dreamType: any) => {

    if (dreamType == "Fragmented Capture") {
        return "#8A2BE2";

    }
    else if (dreamType == "Empty Capture") {
        return "#ff0a9d";
    }
    else {
        return "#00cf91";
    }

}

export default function DreamLogScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <LinearGradient colors={["#180723", "#2C123F", "#2C123F", "#3d1865"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 800, zIndex: 0 }}>
                    <Image
                        source={require("../../Frontend/images/pine-tree-background.png")}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="stretch"
                    />
                </View>

                {/* Title */}
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{
                        color: "#D7C9E3",
                        fontSize: 32,
                        fontWeight: "bold",
                        marginBottom: 20,
                        textAlign: "center",
                    }}>
                        Dream Logging
                    </Text>

                    <Text style={{ color: "white", fontWeight: "bold", opacity: .5, marginBottom: 0 }}>
                        Choose the type of dream you'd like to log!
                    </Text>
                    <Text style={{
                        color: "#94C9A9",
                        fontSize: 16,
                        textAlign: "center",
                        marginBottom: 30,
                        fontWeight: "bold"
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
                                marginBottom: 20,
                                padding: 24,
                                borderRadius: 13,
                                borderBottomLeftRadius: 13,
                                borderBottomRightRadius: 13,
                                backgroundColor: "#D7C9E3",
                                borderWidth: 1,
                                height: 250,
                                borderColor: checkDreamType(item.name),
                                shadowColor: checkDreamType(item.name),

                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.2,
                                shadowRadius: 12,
                                elevation: 5,

                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                marginTop: 50,
                                fontWeight: "600",
                                color: "#2C123F",
                                textAlign: "center",
                                marginBottom: 6,
                                textTransform: "capitalize",

                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: "#2C123F",
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
