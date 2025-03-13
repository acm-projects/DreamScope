import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import CustomButton from "../../../Frontend/components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeLayout = () => {
    return (
        <>
        <CustomButton
            title="Logout"
            handlePress={() => {
                AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                router.back();
                router.back();
                
            }
        
            }
          />
            
        </>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})