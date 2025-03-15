import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Tabslayout = () => {
    return (
        <>

            <Tabs screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#94C9A9",
                tabBarInactiveTintColor: "#716969",
                tabBarStyle: {
                    backgroundColor: '#2C123F'
                }

            }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />,
                <Tabs.Screen
                    name="timeline"
                    options={{
                        title: "Timeline",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="time-outline" size={size} color={color} />
                        )
                    }}
                />,
                <Tabs.Screen
                    name="log"
                    options={{
                        title: "Log",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    )
}

export default Tabslayout

const styles = StyleSheet.create({})