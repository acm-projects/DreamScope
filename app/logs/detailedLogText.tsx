import { View, Text, TextInput } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
export default function detailedLogTextScreen() {
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
                    top: 5,
                    left: -8,

                    backgroundColor: "transparent",
                }}
            >
                <Text style={{ fontSize: 24, color: "white" }}>
                    <Feather name="arrow-left" size={30} />
                </Text>
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

                {arrayOfUsersTags.map((item, index) => (
                    <Text style={{ color: "white", backgroundColor: "blue" }} key={index}>{item}{" "}

                    </Text>
                ))}
            </Text>



            <View>



                <Text style={{ color: "white" }}>
                    Dream Title:

                    <TextInput multiline={false} placeholder="Enter a title for your dream" style={{ backgroundColor: "white", backfaceVisibility: "visible", borderColor: "white", color: "grey" }}>

                    </TextInput>
                </Text>



            </View>


            <TextInput
                multiline={true}
                numberOfLines={10} // Optional: Sets the visible number of lines
                placeholder="Begin typing your dream here.."
                style={{
                    height: 350,  // Adjust height as needed
                    width: 300,
                    borderColor: '#',
                    borderWidth: 0.5,
                    backfaceVisibility: "visible",
                    backgroundColor: "#00314C",
                    padding: 10,
                    color: "grey",
                    borderRadius: 12,
                    textAlignVertical: 'top', // Ensures text starts from the top
                }}
            />






            <Button onPress={() => router.push({ pathname: "logCompletion/detailedLogCompletion" })} style={{ justifyContent: "center", width: 200, height: 50, borderColor: "white", borderWidth: 2, borderRadius: 12, backgroundColor: "#0093ED" }} >
                <ButtonText style={{ color: "white" }} >
                    Complete log
                </ButtonText>
            </Button>
        </View>





    );
}
