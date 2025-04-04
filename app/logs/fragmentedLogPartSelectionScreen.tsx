import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Button, ButtonText } from "../../components/ui/button";
import { HStack } from "../../components/ui/hstack";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { GluestackUIProvider } from "../../components/ui/gluestack-ui-provider";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";




export default function TagsScreen() {
    const router = useRouter();
    let parts = ["2", "3", "4"];
    const { name } = useLocalSearchParams();
    const params = useSearchParams();
    const [selectedPart, setSelectedPart] = useState<string[]>([]);
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const sections: { title: string; data: string[] }[] = [
        { title: "", data: parts },

    ];

    // Function to toggle tag selection
    const handleTagPress = (tag: string) => {

        setSelectedPart((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );


    };

    const handleContinuePress = (partSelected: string[]) => {
        if (partSelected[0] != null) {
            router.push({ pathname: "/logs/fragmentedLogTagSelection", params: { parts: selectedPart, name: name } })
        }
        else {
            console.log("please select a number of parts");
        }
    };



    return (

        <FlatList style={{ backgroundColor: "#2C123F" }}
            data={sections}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
            ListHeaderComponent={() => (
                <View>
                    {/* Close Button */}
                    <Button
                        onPress={() => router.push("./tabs")}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            backgroundColor: "transparent",
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "white" }}>X

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
                        }}
                    >
                        {currentDate}
                    </Text>
                </View>
            )}
            renderItem={({ item, index }) => (
                <View style={{ marginBottom: 20 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                            marginBottom: 10,
                        }}
                    >
                        Parts:
                    </Text>

                    <FlatList
                        data={item.data}
                        keyExtractor={(tag) => tag}
                        renderItem={({ item: tag }) => (
                            <Pressable onPress={() => handleTagPress(tag)}>
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        backgroundColor: selectedPart.includes(tag)
                                            ? "#00BFFF"
                                            : "#00314C",
                                        borderColor: "#00BFFF",
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
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
                    {/*Finished*/}
                    <Button
                        onPress={() => handleContinuePress(selectedPart)}
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