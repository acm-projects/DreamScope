import { Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router'
import { useFonts } from 'expo-font'


const RootLayout = () => {
  const [fontsloaded, error] = useFonts({
    "pregular": require("../assets/fonts/PlaywriteITModerna-VariableFont_wght.ttf")
  })
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout