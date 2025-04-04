import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import userDreamData from '../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json';


const determineDreamType = (currentDreamType: string) => {
    if (currentDreamType == "Detailed Capture") {
        return styles.detailedlog
    }
    else if (currentDreamType == "Empty Capture") {
        return styles.emptylog
    }
    else if (currentDreamType == "Fragmented Capture") {
        return styles.fragmentedlog
    }

};




export default function DreamTimelineScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#304575" }}>
            <Text style={styles.timelinetitle}>
                Dream Timeline
            </Text>

            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", width: "100%" }}>


                <FlatList data={userDreamData}
                    keyExtractor={(item) => item.DreamType.toString()}
                    renderItem={({ item }) => (


                        <TouchableOpacity onPress={() => router.push({ pathname: `/TimelinePages/${item.DreamNumber}`, params: { DreamNumber: item.DreamNumber, DreamTitle: item.DreamTitle, DreamDescription: item.description, DayMonthYear: item.DayMonthYear, TimeOfCapture: item.TimeOfCapture, AiAnalysis: item.AiAnalysis.toString() } })} style={styles.container}>

                            <View style={determineDreamType(item.DreamType)}>


                                <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold", color: "white", textAlign: "justify" }}>
                                    {item.DayMonthYear}
                                </Text>
                                <Text style={{ marginLeft: 10, fontSize: 18, color: "white", opacity: 1, textAlign: "justify", fontWeight: "bold" }}>
                                    {item.DreamTitle}
                                </Text>
                                <Text style={{ fontSize: 18, color: "white", opacity: 1, textAlign: "right", fontWeight: "bold", marginTop: 20, marginRight: 50 }}>
                                    {item.DreamType}
                                </Text>

                            </View>
                        </TouchableOpacity>


                    )}
                />



            </ScrollView>
        </SafeAreaView>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2C123F',
        padding: 10,
    },
    fragmentedlog: {
        backgroundColor: "#00314C",
        width: "90%",
        marginTop: 5,
        height: 60,
        marginBottom: 5,
        flexWrap: "wrap",
        borderColor: "white",
        borderWidth: 0,
        borderRadius: 10

    },
    detailedlog: {
        backgroundColor: "#00314C",
        flexWrap: "wrap",
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
        height: 60,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 0

    },
    emptylog: {
        backgroundColor: "#00314C",
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
        flexWrap: "wrap",
        height: 60,
        borderColor: "white",
        borderWidth: 0,
        borderRadius: 10

    },
    timelinetitle: {
        color: "white",
        fontSize: 40,
        marginTop: 5,
        marginBottom: 5
    }




});