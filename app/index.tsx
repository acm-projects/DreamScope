import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from 'expo-router';
import "../global.css"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../Frontend/components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'


export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at index.tsx')
    setIsLoggedIn(data == 'true');
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full">

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className=" w-full min-h-[85vh] justify-center items-center  px-4">
          <Image
            source={require('../Frontend/assets/images/logo.png')}
            className="w-52 h-52"
            resizeMode="contain"
          />

          <Text className="mt-5 px-5 font-custom text-5xl leading-relaxed color-light" >
            D
            <Text className="color-secondary font-custom">
              ream
            </Text>
            S
            <Text className="color-secondary font-custom">
              cope
            </Text>
          </Text>

          <CustomButton
            title="Proceed app!"
            handlePress={() => {
              isLoggedIn ? router.push('/(tabs)/home') : router.push('/(auth)/sign_in');
            }

            }
          />

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}