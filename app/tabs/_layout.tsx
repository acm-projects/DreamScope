import { Tabs } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';



export default function RootLayout() {
    return (

        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: "#94C9A9",
                tabBarInactiveTintColor: "#7B718B",
                tabBarStyle: {
                    borderTopWidth: 0.2,
                    borderColor: "#1c092a",
                    height: 50,
                    backgroundColor: "#2C123F",
                },
            }}
        >
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    title: "HomeScreen",
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ marginTop: 6 }}>
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
