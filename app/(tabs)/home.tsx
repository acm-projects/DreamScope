import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '../../components/ui/button';


import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = () => {
    return <View className="bg-primary h-full">
        <Text>Home</Text>

        <View className="flex-1 justify-center items-center">
            <Button action={"primary"} variant={"solid"} size={"lg"} isDisabled={false}
                className="w-40 h-20 justify-center items-center bg-red-500"
                onPress={() => {
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                    router.push('/(auth)/sign_in')
                }}>
                <ButtonText>Log out</ButtonText>
            </Button>



        </View>

    </View>;
};
export default Home;