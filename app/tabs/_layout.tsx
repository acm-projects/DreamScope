import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from "../context/UserContext";
import { AnalysisProvider } from "../context/AnalysisContext";

export default function RootLayout() {
    // Get proper status bar style based on platform
    const statusBarStyle = Platform.OS === 'ios' ? 'auto' : 'auto';
    return (
        <UserProvider>
            <AnalysisProvider>
                {/* Status bar with proper styling */}

                <StatusBar style={statusBarStyle} backgroundColor="#1d112e" translucent={true} />



                <Tabs
                    screenOptions={{
                        tabBarActiveBackgroundColor: "#1d112e",
                        tabBarShowLabel: true,
                        headerShown: false,

                        tabBarActiveTintColor: "#0093ED",
                        tabBarInactiveTintColor: "#7B718B",
                        animation: "fade",
                        tabBarLabelStyle: {
                            fontSize: 10,
                            marginBottom: 5,
                        },
                        tabBarStyle: {
                            borderTopWidth: 1,

                            borderColor: "#110b1a",
                            height: 60,
                            backgroundColor: "#1d112e",
                            paddingBottom: Platform.OS === 'ios' ? 0 : 0,
                            paddingTop: 5,
                            elevation: 8,
                            borderRadius: 0.5,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        },
                    }}
                >
                    <Tabs.Screen
                        name="HomeScreen"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" color={color} size={size} />
                            ),
                        }}

                    />
                    <Tabs.Screen
                        name="DreamLogging"
                        options={{
                            title: "Log Dream",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="pencil-plus" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="DreamTimeline"
                        options={{
                            title: "Timeline",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="timeline-clock" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="DreamVisualization"
                        options={{
                            title: "Insights",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="eye" color={color} size={size} />
                            ),
                        }}
                    />
                </Tabs>
            </AnalysisProvider>
        </UserProvider>
    );
}