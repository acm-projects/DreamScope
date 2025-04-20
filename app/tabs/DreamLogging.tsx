import { View, FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Modal, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import options from "../../Frontend/assets/dummyJson/options.json";

const { width } = Dimensions.get("window");
const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

const EmptyType = "Empty Capture"

const checkDreamType = (dreamType: any) => {

    if (dreamType == "Fragmented Capture") {
        return "#C9B9E2";

    }
    else if (dreamType == "Empty Capture") {
        return "#eadb8c";
    }
    else {
        return "#fc77a6";
    }

}


export default function DreamLogScreen() {


    const [modalVisible, setModalVisible] = useState(false);


    const handlePress = (dreamType: any) => {
        if (dreamType == "Empty Capture") {
            setModalVisible(true);


        }
        else if (dreamType == "Fragmented Capture") {
            return router.push({ pathname: `/logs/[name]`, params: { name: dreamType } })

        }
        else {
            return router.push({ pathname: `/logs/[name]`, params: { name: dreamType } })

        }
    }





    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <LinearGradient colors={["#15041D", "#29123A", "#3B1856"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 10, alignContent: "center" }}>


                {/*modal stuff for empty log*/}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Empty Captures hold little to no information and is intended for streak saving, proceed?</Text>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({ pathname: `/logs/${EmptyType}`, params: { name: EmptyType } })

                                    }}
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Decorative background elements */}
                <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.1 }}>
                    <Image
                        source={require("../../Frontend/images/cloudbackground2.png")}
                        style={{ maxWidth: "auto", maxHeight: "auto" }}
                        resizeMode="contain"
                    />
                </View>



                {/* Dream Options */}
                <FlatList
                    contentContainerStyle={{ paddingBottom: 12, paddingTop: 30 }}
                    data={options}
                    keyExtractor={(item) => item.name.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (

                        <View>





                            {/* Header with enhanced styling */}
                            <View style={{ alignItems: "center", marginTop: 10, marginBottom: 25 }}>

                                <Text
                                    style={{
                                        fontSize: 36,
                                        fontWeight: "bold",
                                        color: "#fc77a6",
                                        marginBottom: 5,
                                    }}
                                >
                                    DREAM LOGGING
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 26,
                                        fontWeight: "bold",
                                        color: "#eadb8c",

                                        textAlign: "center",
                                        marginBottom: 8,
                                        textShadowColor: "rgba(0, 191, 255, 0.3)",
                                        textShadowOffset: { width: 0, height: 1 },
                                        textShadowRadius: 5,
                                    }}
                                >
                                    {currentDate}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#C9B9E2",
                                        opacity: 0.85,
                                        textAlign: "center",
                                        fontStyle: "italic",
                                    }}
                                >
                                    What type of dream would you like to log?
                                    <Text style={{ fontSize: 12 }}>
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    )}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            onPress={() => handlePress(item.name)}
                            style={{
                                marginBottom: 20,
                                padding: 24,
                                borderRadius: 13,
                                borderBottomLeftRadius: 13,
                                borderBottomRightRadius: 13,
                                backgroundColor: "rgba(215, 201, 250, 0.25)",
                                borderWidth: 1,
                                height: 250,
                                borderColor: checkDreamType(item.name),
                                shadowColor: checkDreamType(item.name),

                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 5,

                            }}
                        >
                            <Text style={{
                                fontSize: 25,
                                marginTop: 50,
                                fontWeight: "600",
                                color: "#fedde8",
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


const styles = StyleSheet.create({

    newDreamButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 7, 63, 0.5)",
    },
    modalContainer: {
        width: "90%",
        height: "20%",
        backgroundColor: "#180723",
        padding: 15,
        borderRadius: 11,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D7C9E3",
    },
    modalText: {
        color: "#D7C9E3",
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#2C123F",
        alignItems: "center",
        paddingVertical: 10,
        width: "45%",
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#D7C9E3",
    },
    modalButtonText: {
        color: "#D7C9E3",
        fontSize: 16,
        fontWeight: "bold",
    },
});