import { View, Text, Image, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
export default function detailedLogTextScreen() {

    //to push onto new pages
    const router = useRouter();
    //to pass data between pages
    const params = useLocalSearchParams();


    //default border color, dynamically setting border color
    const [borderColor, setBorderColor] = useState("white");





    //function that updates when the user finishes editing the text textinput
    const [inputText, setInputText] = useState("");
    const [validText, setValidText] = useState(false);
    const userEndedEditingText = () => {
        if (inputText.trim() === "") {
            console.log("updated valid text to false")
            setBorderColor("red");
            setValidText(false);
        }
        else {
            console.log("updated valid text to true")
            setBorderColor("white");
            setValidText(true);

        }
    };

    //function that updates when the user finishes editing the title textinput
    const [inputTitle, setInputTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const userEndedEditingTitle = () => {
        if (inputTitle.trim() === "") {
            setBorderColor("red")
            setValidTitle(false)
            console.log("updated valid title to false")
        }
        else {
            console.log("updated valid title to true")
            setBorderColor("white")
            setValidTitle(true)
        }
    };


    //function that checks if the title and text field both contain text.
    const handlePress = () => {

        if (validTitle == true && validText == true) {

            console.log("valid title and text are both true");
            return router.push("/logCompletion/detailedLogCompletion");
        }
        else {
            console.log("valid title and text is not true");
        }

    };

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

    //function that gets todays date!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
            }}>


                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2D1A54" }}>


                    {/* Back Button */}
                    <Button
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: 20,
                            left: 5,

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
                            fontSize: 40,
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                            marginBottom: 20,
                            marginTop: 20
                        }}
                    >
                        {currentDate}
                    </Text>


                    {/*Tags*/}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
                        {arrayOfUsersTags.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    margin: 2, // Adds spacing between items
                                    padding: 3,
                                    backgroundColor: "#0093ED",
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: "white",

                                }}
                            >
                                <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/*Dream Title*/}
                    <View>

                        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15, color: "white" }}>
                            Dream Title: {" "}

                            <TextInput value={inputTitle}
                                onChangeText={setInputTitle}
                                onEndEditing={userEndedEditingTitle}
                                numberOfLines={1}
                                multiline={false}



                                placeholder="Enter a title.."
                                style={{
                                    height: 25,
                                    width: 100,
                                    backgroundColor: "#0093ED",
                                    backfaceVisibility: "visible",
                                    borderWidth: 2,
                                    borderColor: borderColor,
                                    borderRadius: 10,
                                    color: "white"
                                }}>

                            </TextInput>
                        </Text>



                    </View>


                    {/*Dream Text*/}
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        onEndEditing={userEndedEditingText}
                        multiline={true}

                        placeholderTextColor={"#D7C9E3"}
                        numberOfLines={10} // Optional: Sets the visible number of lines
                        placeholder="Begin typing your dream here.."
                        style={{
                            height: 375,  // Adjust height as needed
                            width: 325,
                            borderColor: borderColor,
                            borderWidth: 0,
                            backfaceVisibility: "visible",
                            backgroundColor: "#00314C",
                            padding: 10,
                            color: "grey",
                            marginBottom: 50,
                            borderRadius: 12,
                            textAlignVertical: 'top', // Ensures text starts from the top
                        }}
                    />





                    {/*Complete Log Button*/}
                    <View style={{ alignItems: "center", backgroundColor: "00314D", width: "100%", borderWidth: 2, borderColor: "#03A4FF" }}>
                        <Text>
                            <TouchableOpacity onPress={handlePress} style={{ alignItems: "center", marginTop: 25, marginBottom: 25, justifyContent: "center", width: 200, height: 50, borderColor: "white", borderWidth: 2, borderRadius: 12, backgroundColor: "#0093ED" }}>
                                <Text style={{ justifyContent: "center", color: "white" }} >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>





    );
}