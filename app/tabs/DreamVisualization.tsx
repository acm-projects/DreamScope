import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import userDreamData from '../../Frontend/assets/dummyJson/multipleDreamLogsExampleForTimeline.json';

let validDate = true;

let dreamLoggedDates = userDreamData.map(entry => entry.DayMonthYear);

for (let i = 0; i < userDreamData.length; i++) {
    dreamLoggedDates[i] = userDreamData[i].DayMonthYear;
}

const getMarkedDates = (selectedDate: string, today: string) => {
    const marks: any = {};

    dreamLoggedDates.forEach(date => {
        marks[date] = {
            marked: true,
            dotColor: 'transparent',
            customStyles: {
                container: {
                    backgroundColor: '#E2CF65', // Yellow solid circle
                    borderRadius: 20,
                },
                text: {
                    color: '#180723', // Dark purple text on yellow
                    fontWeight: 'bold',
                },
            },
        };
    });

    if (selectedDate) {
        marks[selectedDate] = {
            ...marks[selectedDate],
            selected: true,
            dotColor: 'transparent', // Remove the dot color for selected date
            selectedColor: '#d57f90', // Optional selected override
            customStyles: {
                container: {
                    backgroundColor: '#d57f90',
                    borderRadius: 20,
                },
                text: {
                    color: '#180723',
                    fontWeight: 'bold',
                },
            },
        };
    }

    if (!marks[today]) {
        marks[today] = {
            marked: true,
            dotColor: 'transparent',
            customStyles: {
                container: {
                    backgroundColor: '#D7C9E3',
                    borderRadius: 20,
                },
                text: {
                    color: '#180723',
                    fontWeight: 'bold',
                },
            },
        };
    }

    return marks;
};

const MonthViewCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const router = useRouter();

    const a = new Date().toISOString().split('T')[0];

    let today = ""

    const currentMonth = new Date().toLocaleDateString("en-US", {
        month: "numeric",

    });
    const currentDay = new Date().toLocaleDateString("en-US", {
        day: "numeric",



    });
    const currentYear = new Date().toLocaleDateString("en-US", {
        year: "numeric",

    });


    if (currentDay.length == 1) {

        today = currentYear + "-" + currentMonth + "-0" + currentDay


    }
    else if (currentMonth.length == 1) {
        today = currentYear + "-0" + currentMonth + "-" + currentDay


    }
    else if (currentMonth.length == 1 && currentDay.length == 1) {
        today = currentYear + "-0" + currentMonth + "-0" + currentDay

    }
    else {

        today = currentDay + "-" + currentMonth + "-" + currentYear

    }






    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        validDate = true;
    };

    const checkValidDate = () => {
        if (validDate == true) {
            return router.push({
                pathname: '/logs/Image_pages',
                params: { date: selectedDate.toString() },
            });
        } else {
            //create an alert that the date the user picked is invalid
        }
    };



    return (
        <LinearGradient colors={['#180723', '#2C123F', '#3d1865']} style={styles.container}>
            <View style={{ position: "absolute", top: 0, right: 0, opacity: 0.2 }}>
                <Image
                    source={require("../../Frontend/images/dreamCatcherBackground.png")}
                    style={{ backgroundColor: "#180723", maxWidth: "150%", maxHeight: "100%", opacity: 0.4 }}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.headerText}>DREAM VISUALIZATION</Text>
            <Text style={{ color: "white", opacity: .5, fontSize: 18, marginBottom: 50 }}>
                Choose a date to bring a dream to life!
            </Text>


            <View style={styles.calendarWrapper}>
                <Calendar
                    current={today}
                    onDayPress={handleDayPress}
                    markedDates={getMarkedDates(selectedDate, today)}
                    markingType={'custom'}
                    theme={{
                        backgroundColor: '#94C9A9',
                        calendarBackground: 'transparent',
                        selectedDayTextColor: '#180723',
                        todayTextColor: '#94C9A9',
                        dayTextColor: '#D7C9E3',
                        textDisabledColor: '#5A3E6F',
                        monthTextColor: '#D7C9E3',
                        arrowColor: '#eadb8c',
                        textSectionTitleColor: '#D7C9E3',
                        textMonthFontSize: 30, // Increased font size for the month
                    }}
                />
            </View>

            <View style={{ marginTop: 20, marginBottom: 5 }}>
                <TouchableOpacity
                    onPress={checkValidDate}
                    style={styles.visualizeDreamButton}
                >
                    <Text style={styles.visualizeDreamButtonText}>
                        Visualize Dream
                    </Text>
                </TouchableOpacity>
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
        color: "#D7C9E3",
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 20,
    },
    calendarWrapper: {
        width: '100%',
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
        backgroundColor: "#eadb8c",
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
        color: "#2C123F",
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
    },
});

export default MonthViewCalendar;