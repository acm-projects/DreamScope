import { useState } from "react";
import { View, Text, FlatList, Pressable, ScrollView, TextInput } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { useSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import tags from "../../Frontend/assets/dummyJson/tagsHolder.json";
import Feather from '@expo/vector-icons/Feather';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import dummyAIAnalysis from "../../Frontend/assets/dummyJson/DummyDataForAIAnalysis.json";

const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});




export default function AIAnalysisPage() {
    const router = useRouter();
    return (

        <ScrollView style={{ flex: 1, backgroundColor: "2C123F" }}>

            <View>
                <Text>
                    {currentDate}
                </Text>
                <Button onPress={() => router.push("/tabs")}>
                    <ButtonText style={{ color: "white", }}>
                        X
                    </ButtonText>
                </Button>


            </View>


            <Text>
                Your Dream breakdown/analysis:
            </Text>



            {/* Places*/}

            <View>
                <Text style={{ color: "white" }}>
                    Places:
                </Text>

                <FlatList data={dummyAIAnalysis}>

                </FlatList>
            </View>


            {/* People*/}

            <View>
                <Text style={{ color: "white" }}>
                    People:
                </Text>


                <FlatList>

                </FlatList>
            </View>


            {/* Objects*/}
            <View>
                <Text style={{ color: "white" }}>
                    Objects:
                </Text>

                <FlatList>

                </FlatList>
            </View>



            {/* Themes*/}
            <View>
                <Text style={{ color: "white" }}>
                    Themes:
                </Text>

                <FlatList>

                </FlatList>
            </View>



            {/*Reoccuring Places from past logs*/}

            <View>
                <Text style={{ color: "white" }}>
                    Reoccuring Places:
                </Text>

                <FlatList>

                </FlatList>
            </View>




            {/*Reoccuring People from past logs*/}

            <View>
                <Text style={{ color: "white" }}>
                    Reoccuring People:
                </Text>

                <FlatList>

                </FlatList>
            </View>



            {/*Reoccuring Objects from past logs*/}

            <View>
                <Text style={{ color: "white" }}>
                    Reoccuring Objects:
                </Text>

                <FlatList>

                </FlatList>
            </View>




            {/*Reoccuring Themes*/}

            <View>
                <Text style={{ color: "white" }}>
                    Reoccuring Themes:
                </Text>

                <FlatList>

                </FlatList>
            </View>




            {/*AI Insight/Analysis View*/}
            <View>
                <Text style={{ color: "white" }}>
                    AI Overview:
                </Text>


                <TextInput editable={false} style={{}}>


                </TextInput>
            </View>





        </ScrollView>

    )
}