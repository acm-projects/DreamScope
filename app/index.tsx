import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '../components/ui/button';
import React from 'react';
import { ScrollView, Text, View, Image } from "react-native";
import { Link, Redirect, router } from 'expo-router';
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component'
]);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
export default function Index() {
  const [value, setValue] = React.useState(30);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at index.tsx');
    setIsLoggedIn(data == 'true');
  }
  useEffect(() => {
    getData();
  }, []);
  return <SafeAreaView className="bg-primary h-full">

    <ScrollView contentContainerStyle={{
      height: '100%'
    }}>

      <View className=" w-full min-h-[85vh] justify-center items-center  px-4">

        <Image source={require('../Frontend/assets/images/logo.png')} className="w-52 h-52" resizeMode="contain" />

        <Text className="mt-5 px-5 font-custom text-5xl leading-relaxed color-light">
          D
          <Text className="color-secondary font-custom">
            ream
          </Text>
          S
          <Text className="color-secondary font-custom">
            cope
          </Text>
        </Text>


        <Button action={"primary"} variant={"link"} size={"lg"} isDisabled={false}
          className='p-3 bg-light rounded-3xl top-5 active:opacity-75'
          onPress={() => isLoggedIn ? router.push('/(tabs)/home') : router.push('/(auth)/sign_in')}
        >
          <ButtonText>Proceed to app</ButtonText>
        </Button>


      </View>
    </ScrollView>

  </SafeAreaView>;
}