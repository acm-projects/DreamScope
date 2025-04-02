import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';

const MonthViewCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const router = useRouter();

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        router.push({
            pathname: '../Visualization/Image_pages',
            params: { date: day.dateString },
        });
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#3d1865']} style={styles.container}>
            <Text style={styles.headerText}>Your Dream Visualizations</Text>

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
                        selectedDayBackgroundColor: '#94C9A9',
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
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
});

export default MonthViewCalendar;
