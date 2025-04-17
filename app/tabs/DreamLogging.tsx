import { View, FlatList, Text, TouchableOpacity, SafeAreaView, Dimensions, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
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
        <LinearGradient colors={["#15041D", "#29123A", "#3B1856"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 10, alignContent: "center" }}>

                {/* Decorative background elements */}
                <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                    <Image
                        source={require("../../Frontend/images/cloudbackground2.png")}
                        style={{ maxWidth: "auto", maxHeight: "auto" }}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{
                        color: "#00BFFF",
                        fontSize: 36,
                        fontWeight: "bold",
                        letterSpacing: 1.5,
                    }}>
                        DREAM LOGGING
                    </Text>

                    <Text style={{ color: "white", fontStyle: "italic", opacity: .5, marginBottom: 0 }}>
                        Choose the type of dream you'd like to log!
                    </Text>

                    <Text style={{
                        color: "#A5E3B7",
                        fontSize: 18,
                        marginTop: 6,
                        opacity: 0.8,
                    }}>
                        {currentDate}
                    </Text>
                </View>

                {/* Dream Options */}
                <FlatList
                    contentContainerStyle={{ paddingBottom: 12, paddingTop: 30 }}
                    data={options}
                    keyExtractor={(item) => item.name.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: `../logs/${item.name}`, params: { name: item.name } })}
                            style={{
                                marginBottom: 20,
                                padding: 24,
                                borderRadius: 13,
                                borderBottomLeftRadius: 13,
                                borderBottomRightRadius: 13,
                                backgroundColor: "rgba(215, 201, 227, 0.15)",
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
                                color: "#E4D7F4",
                                textAlign: "center",
                                marginBottom: 6,
                                textTransform: "capitalize",

                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: "#C9B9E2",
                                opacity: 1,
                                textAlign: "center",
                            }}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </LinearGradient >
    );
}
