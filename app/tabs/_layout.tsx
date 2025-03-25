import { Tabs, Stack } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
    return (

        <Tabs screenOptions={{ tabBarStyle: { borderRadius: 15, backgroundColor: "#2C123F", height: 65, elevation: 0, right: 20, left: 20, bottom: 5, position: "absolute" }, tabBarShowLabel: false, tabBarInactiveBackgroundColor: "#273952", tabBarActiveBackgroundColor: "#405674", headerShown: false, animation: 'shift' }}>
            <Tabs.Screen name="DreamLogging" options={{ title: "Dream Logging", tabBarIcon: ({ color, size }) => <Fontisto name="cloudy" color={"white"} size={35} /> }} />
            <Tabs.Screen name="HomeScreen" options={{ title: "HomeScreen", tabBarIcon: ({ color, size }) => <Fontisto name="home" color={"white"} size={35} /> }} />
            <Tabs.Screen name="DreamTimeline" options={{ title: "Dream Timeline", tabBarIcon: ({ size, color }) => <Fontisto name="stopwatch" color={"white"} size={35} /> }} />
            <Tabs.Screen name="DreamVisualization" options={{ title: "Dream Visualization", tabBarIcon: ({ size, color }) => <Fontisto name="picture" color="white" size={35} /> }} />
        </Tabs>
    );
}