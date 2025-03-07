import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from 'expo-router';
import "../global.css"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";



export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className=" w-full min-h-[85vh] justify-center items-center  px-4">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-52 h-52"
            resizeMode="contain"
          />

          <Text className="mt-5 px-5 font-custom text-5xl leading-relaxed color-light" >
            D
            <Text className="color-secondary">
              ream
            </Text>
            S
            <Text className="color-secondary">
              cope
            </Text>
          </Text>

          <CustomButton
            title="Proceed to app"
            handlePress={() => {
              router.push('/sign_in')
            }
            }
          />

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
