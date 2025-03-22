import { Tabs, Stack } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
    return (

        <Tabs screenOptions={{ tabBarStyle: { backgroundColor: "#2C123F", height: 65, paddingBottom: 0 }, tabBarInactiveBackgroundColor: "#273952", tabBarActiveBackgroundColor: "#405674", headerShown: false, animation: 'shift' }}>
            <Tabs.Screen name="DreamLogging" options={{ title: "Dream Logging", tabBarIcon: ({ color, size }) => <Fontisto name="cloudy" color={"white"} /> }} />
            <Tabs.Screen name="HomeScreen" options={{ title: "HomeScreen", tabBarIcon: ({ color, size }) => <Fontisto name="home" color={"white"} /> }} />
            <Tabs.Screen name="DreamTimeline" options={{ title: "Dream Timeline", tabBarIcon: ({ size, color }) => <Fontisto name="stopwatch" color={"white"} /> }} />
            <Tabs.Screen name="DreamVisualization" options={{ title: "Dream Visualization", tabBarIcon: ({ size, color }) => <Fontisto name="picture" color="white" /> }} />
        </Tabs>
    );
}