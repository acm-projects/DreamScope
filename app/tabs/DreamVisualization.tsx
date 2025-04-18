
import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Button } from "../../components/ui/button";
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
                    backgroundColor: '#eadb8c', // Yellow solid circle
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
            selectedColor: '#94C9A9', // Optional selected override
            customStyles: {
                container: {
                    backgroundColor: '#94C9A9',
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

    const today = new Date().toISOString().split('T')[0];

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        validDate = true;
    };

    const checkValidDate = () => {
        if (validDate == true) {
            return router.push({
                pathname: '/logs/Image_pages',
                params: { date: selectedDate },
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
                    style={{ backgroundColor: "black", maxWidth: "150%", maxHeight: "100%", opacity: 0.5 }}
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
                        arrowColor: '#94C9A9',
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
        color: "#fc77a6",
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 50,
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
