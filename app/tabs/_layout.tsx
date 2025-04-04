import { Tabs } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';




export default function RootLayout() {
    return (

        <Tabs
            screenOptions={{
                tabBarActiveBackgroundColor: "#273459",
                tabBarShowLabel: false,
                headerShown: false,

                tabBarActiveTintColor: "#0093ED",
                tabBarInactiveTintColor: "#7B718B",

                animation: "fade",



                tabBarStyle: {

                    borderTopWidth: 0.5,

                    borderBottomWidth: 5,
                    borderColor: "#273952",
                    height: 55,
                    backgroundColor: "#273952",
                    paddingBottom: 15,



                },
            }}
        >
            <Tabs.Screen
                name="HomeScreen"

                options={{
                    title: "HomeScreen",
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ marginTop: 6 }} >
                            <Fontisto name="home" color={color} size={size} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="DreamLogging"
                options={{
                    title: "Dream Logging",

                    tabBarIcon: ({ color, size }) => (
                        <View style={{ marginTop: 6 }}>
                            <Fontisto name="cloudy" color={color} size={size} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="DreamTimeline"
                options={{
                    title: "Dream Timeline",
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ marginTop: 6 }}>
                            <Fontisto name="stopwatch" color={color} size={size * 0.8} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="DreamVisualization"
                options={{
                    title: "Dream Visualization",
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ marginTop: 6 }}>
                            <Fontisto name="picture" color={color} size={size * 0.8} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}