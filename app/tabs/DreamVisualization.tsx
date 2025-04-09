import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Button } from "@/components/ui/button";
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import userDreamData from '../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json';

let validDate = true;

let dreamLoggedDates = [];

for (let i = 0; i < userDreamData.length; i++) {
    dreamLoggedDates[i] = userDreamData[i].DayMonthYear;
}


const MonthViewCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const router = useRouter();

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        validDate = true;
    };

    const checkValidDate = () => {
        if (validDate == true) {
            return router.push({
                pathname: '../Visualization/Image_pages',
                params: { date: selectedDate.toString() },
            });

        }
        else {
            //create an alert that the date the user picked is invalid
        }
    }

    return (


        <LinearGradient colors={['#180723', '#2C123F', '#3d1865']} style={styles.container}>

            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/dreamCatcherBackground.png")}
                    style={{ backgroundColor: "black", maxWidth: "150%", maxHeight: "100%" }}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.headerText}>DREAM VISUALIZATION</Text>
            <Text style={{ color: "white", fontStyle: "italic", opacity: .5 }}>
                Choose a date to bring a dream to life!

            </Text>
            <Text style={{ color: "white", fontStyle: "italic", opacity: .5, marginBottom: 50 }}>
                (Note: you can only visualize dreams that you've previously logged)
            </Text>

            <View style={styles.calendarWrapper}>
                <Calendar
                    current={new Date().toISOString().split('T')[0]}
                    onDayPress={handleDayPress}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            marked: true,
                            selectedColor: '#94C9A9', // Soft glowing green
                        },

                    }}
                    theme={{
                        backgroundColor: '#94C9A9',
                        calendarBackground: 'transparent',
                        selectedDayBackgroundColor: 'white',
                        selectedDayTextColor: '#180723',
                        todayTextColor: '#94C9A9',
                        dayTextColor: '#D7C9E3',
                        textDisabledColor: '#5A3E6F',
                        monthTextColor: '#D7C9E3',
                        arrowColor: '#5A3E6F',
                        textSectionTitleColor: '#D7C9E3',
                    }}
                />




            </View>

            <View style={{ marginTop: 20, marginBottom: 5 }}>
                <Button
                    onPress={checkValidDate}
                    style={styles.visualizeDreamButton}
                >
                    <Text style={styles.visualizeDreamButtonText}>
                        Visualize Dream
                    </Text>
                </Button>
            </View>


        </LinearGradient>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: "#00BFFF",
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 50,


    },
    calendarWrapper: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle overlay effect
        shadowColor: 'white',
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 20,
    },
    profileButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2C123F',
        borderWidth: 2,
        borderColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    visualizeDreamButton: {
        backgroundColor: "#0000ff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 54,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginTop: 25,
    },
    visualizeDreamButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default MonthViewCalendar;