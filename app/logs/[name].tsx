import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign, Fontisto } from "@expo/vector-icons";

export default function TagsScreen() {
    const router = useRouter();

    //THIS NAME COMES FROM THE LAST PAGE IT GETS THE NAME OF THE TYPE OF LOG PRESSED!!
    const { name } = useLocalSearchParams();

    //Params to push all of the tags the user clicked to the next page
    const params = useSearchParams();

    //
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    //function for todays date!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    //Each section corresponds to its stuff in the json file tagsHolder
    const sections: { title: string; data: string[] }[] = [
        { title: "Themes", data: tags.themes },
        { title: "Settings", data: tags.settings },
        { title: "Add-ons", data: tags.addons },
    ];

    // Function to toggle tag selection
    const handleTagPress = (tag: string) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };

    //checks if the type of dream the user pressed is an Empty Log or Fragmented Log or Detailed Log
    if (name == "Empty Capture") {
        return (
            router.push("/logCompletion/emptyLogCompletion")
        )
    }
    else if (name == "Fragmented Capture") {
        return (
            router.push({ pathname: "logs/fragmentedLogPartSelectionScreen", params: { name: name } })

        )

    }
    else {
        return (

            <FlatList style={{ backgroundColor: "#2C123F" }}
                data={sections}
                keyExtractor={(item) => item.title}
                contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
                ListHeaderComponent={() => (
                    <View>
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

                        {/* Date */}
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                                marginBottom: 20,
                                marginTop: 40
                            }}
                        >
                            {currentDate} , {name} {"\n"}
                            <Text style={{ fontSize: 17, color: "grey", marginTop: 20 }}>add some tags for your log!</Text>
                        </Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 20 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 10,
                            }}
                        >
                            {item.title}:
                        </Text>

                        <FlatList
                            data={item.data}
                            keyExtractor={(tag) => tag}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: "flex-start" }}
                            renderItem={({ item: tag }) => (
                                <Pressable onPress={() => handleTagPress(tag)}>
                                    <View
                                        style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 10,
                                            borderRadius: 12,
                                            borderWidth: 2,
                                            backgroundColor: selectedTags.includes(tag)
                                                ? "#00BFFF"
                                                : "#00314C",
                                            borderColor: "#00BFFF",
                                            margin: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            {tag}
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                )}
                ListFooterComponent={() => (


                    <View>
                        {/*Continue Button*/}
                        <Button
                            onPress={() => router.push({ pathname: "logs/detailedLogText", params: { tags: selectedTags.join(",") } })}
                            style={{
                                backgroundColor: "#0000ff",
                                paddingVertical: 12,
                                paddingHorizontal: 30,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ButtonText
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Continue

                            </ButtonText>
                        </Button>



                    </View>
                )}
            />
        );
    }
}