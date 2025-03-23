import { View, Text } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
export default function fragmentedLogTextScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();



    //slicing users tags that got put together as one big string into an array
    let arrayOfUsersTags = [];
    let z = 0;
    let tagsIndex = 0;
    for (let i = 0; i < params.tags.length; i++) {
        if (params.tags[i] == ",") {
            arrayOfUsersTags[tagsIndex] = params.tags.slice(z, i);
            z = i + 1;
            tagsIndex += 1;
        }
        else if (i == params.tags.length - 1) {
            arrayOfUsersTags[tagsIndex] = params.tags.slice(z, i + 1);

        }
    }


    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2D1A54" }}>


            {/* Back Button */}
            <Button
                onPress={() => router.back()}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    backgroundColor: "transparent",
                }}
            >
                <Text style={{ fontSize: 24, color: "white" }}>✖</Text>
            </Button>



            {/*Date*/}
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    marginBottom: 20,
                }}
            >
                {currentDate}

            </Text>

            <Text>

                {arrayOfUsersTags.map((item, index) => (
                    <Text style={{ color: "white", backgroundColor: "blue" }} key={index}>{item}{" "}

                    </Text>
                ))}


            </Text>






            <Textarea style={{ marginBottom: 22, padding: 55, borderWidth: 2, borderRadius: 12, backgroundColor: "#00314C" }}
                size="lg"
                isReadOnly={false}
                isInvalid={true}
                isDisabled={false}
                className="w-64"


            >
                <TextareaInput placeholder="Begin logging your dream..." />
            </Textarea>





            <Button onPress={() => router.push({ pathname: "logCompletion/detailedLogCompletion" })} style={{ borderWidth: 2, borderRadius: 12, backgroundColor: "blue" }} >
                <ButtonText >
                    Complete log
                </ButtonText>
            </Button>
        </View>





    );
}
