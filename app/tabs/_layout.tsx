import { Tabs, Stack } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
export default function RootLayout() {
    return (


        // <GluestackUIProvider>
        <Tabs screenOptions={{ tabBarInactiveBackgroundColor: "#273952", tabBarActiveBackgroundColor: "#405674", headerShown: false, animation: 'shift' }}>
            <Tabs.Screen name="DreamLogging" options={{ title: "Dream Logging", tabBarIcon: ({ color, size }) => <Fontisto name="cloudy" color={"white"} /> }} />
            <Tabs.Screen name="HomeScreen" options={{ title: "HomeScreen", tabBarIcon: ({ color, size }) => <Fontisto name="home" color={"white"} /> }} />
            <Tabs.Screen name="AIAnalysis" options={{ title: "AI-Analysis", tabBarIcon: ({ size, color }) => <Fontisto name="search" color="white" /> }} />
            <Tabs.Screen name="DreamTimeline" options={{ title: "Dream Timeline", tabBarIcon: ({ size, color }) => <Fontisto name="stopwatch" color={"white"} /> }} />
            <Tabs.Screen name="DreamVisualization" options={{ title: "Dream Visualization", tabBarIcon: ({ size, color }) => <Fontisto name="picture" color="white" /> }} />
        </Tabs>
        // </GluestackUIProvider>
    );
}

