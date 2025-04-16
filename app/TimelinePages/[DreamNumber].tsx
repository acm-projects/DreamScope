import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
export default function DreamTimelinePage() {
    const { dreamNumber } = useLocalSearchParams();
    const router = useRouter();
    const params = useLocalSearchParams();
    const trueVar = "true";
    const falseVar = "false";
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#2C123F" }}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    position: "absolute",
                    top: 50,
                    left: 5,


                    backgroundColor: "transparent",
                }}
            >
                <Text style={{ fontSize: 24, color: "white" }}>
                    X
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={{ color: "white", fontSize: 40 }}>{params.DayMonthYear}, {params.DreamTitle}</Text>
                <ScrollView>





                </ScrollView>
            </View>
        </SafeAreaView>
    );
}