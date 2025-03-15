import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import CustomButton from "../../Frontend/components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    return (
        <View className="bg-primary h-full">
            <Text>Home</Text>

            <View className="flex-1 justify-center items-center">
                <CustomButton
                    title="Logout"
                    handlePress={() => {
                        AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                        router.back();
                        router.back();
                    }}
                    containerStyles="w-40 h-20 justify-center items-center bg-red-500"
                />
            </View>

        </View>



    )
}

export default Home

