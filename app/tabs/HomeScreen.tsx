import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 100;

// Moon phases in order
const moonPhases = [
    'NewMoon',           // 1-4
    'WaxingCrescent',    // 5-8
    'FirstQuarter',      // 9-12
    'WaxingGibbous',     // 13-16
    'FullMoon',          // 17-20
    'WaningGibbous',     // 21-24
    'ThirdQuarter',      // 25-28
    'WaningCrescent',    // 29-31
];

// Function to get moon phase for a specific day of the month
function getMoonPhaseForDay(day) {
    const normalizedDay = (day - 1) % 31 + 1; // Handle months with different days

    if (normalizedDay <= 4) return moonPhases[0];
    if (normalizedDay <= 8) return moonPhases[1];
    if (normalizedDay <= 12) return moonPhases[2];
    if (normalizedDay <= 16) return moonPhases[3];
    if (normalizedDay <= 20) return moonPhases[4];
    if (normalizedDay <= 24) return moonPhases[5];
    if (normalizedDay <= 28) return moonPhases[6];
    return moonPhases[7]; // 29-31
}

function generateCurrentMonthDates() {
    const dates = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Generate all days in the current month
    for (let i = 1; i <= daysInMonth - 2; i++) {
        const d = new Date(currentYear, currentMonth, i);
        const label = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        const dayOfMonth = d.getDate();
        const moonPhase = getMoonPhaseForDay(dayOfMonth);

        dates.push({
            label,
            moonPhase,
            dayOfMonth,
            isFuture: i > currentDay, // Mark days after today as future days
            // Use dayOfMonth as the unique identifier for each day
            uniqueId: dayOfMonth
        });
    }

    return dates;
}

function DateTimeline() {
    // Generate one set of current month dates initially
    const monthDates = generateCurrentMonthDates();
    const [allDates, setAllDates] = useState([...monthDates]);
    const [cyclePosition, setCyclePosition] = useState(0); // Track position of cycles (0 = original)
    const scrollRef = useRef(null);

    const now = new Date();
    const todayLabel = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    // Function to add another set of the current month's dates at the end
    const addCycleToBottom = () => {
        setAllDates(currentDates => {
            const newCycle = [...monthDates];
            return [...currentDates, ...newCycle];
        });
    };

    // Function to add another set of the current month's dates at the beginning
    const addCycleToTop = () => {
        setAllDates(currentDates => {
            const newCycle = [...monthDates];
            setCyclePosition(prevPosition => prevPosition + 1);

            // After adding to the top, maintain scroll position
            setTimeout(() => {
                const itemHeight = CIRCLE_SIZE + 80; // Approximate height of each item with margins
                scrollRef.current?.scrollTo({
                    y: monthDates.length * itemHeight,
                    animated: false,
                });
            }, 10);

            return [...newCycle, ...currentDates];
        });
    };

    useEffect(() => {
        // Initial scroll to today's date
        setTimeout(() => {
            const todayIndex = allDates.findIndex(date => date.label === todayLabel && !date.isFuture);
            if (todayIndex !== -1) {
                scrollRef.current?.scrollTo({
                    y: todayIndex * (CIRCLE_SIZE + 80),
                    animated: true,
                });
            }
        }, 300);
    }, []);

    const handleScroll = (event) => {
        // Get the scroll position
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const containerHeight = event.nativeEvent.layoutMeasurement.height;

        // Check if we're near the bottom of the ScrollView
        if (offsetY + containerHeight > contentHeight - 200) {
            addCycleToBottom();
        }

        // Check if we're near the top of the ScrollView
        if (offsetY < 100) {
            addCycleToTop();
        }
    };

    // Function to get the appropriate image source based on moon phase
    const getMoonPhaseImage = (moonPhase) => {
        switch (moonPhase) {
            case 'NewMoon':
                return require('../../Frontend/images/NewMoon.png');
            case 'WaxingCrescent':
                return require('../../Frontend/images/WaxingCrescent.png');
            case 'FirstQuarter':
                return require('../../Frontend/images/FirstQuarter.png');
            case 'WaxingGibbous':
                return require('../../Frontend/images/WaxingGibbous.png');
            case 'FullMoon':
                return require('../../Frontend/images/FullMoon.png');
            case 'WaningGibbous':
                return require('../../Frontend/images/WaningGibbous.png');
            case 'ThirdQuarter':
                return require('../../Frontend/images/ThirdQuarter.png');
            case 'WaningCrescent':
                return require('../../Frontend/images/WaningCrescent.png');
            default:
                return require('../../Frontend/images/NewMoon.png');
        }
    };

    return (
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.timelineContainer}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            {allDates.map((dateInfo, index) => {
                const isToday = dateInfo.label === todayLabel;
                const isFuture = dateInfo.isFuture;

                // Use center alignment for consistent pattern
                const alignmentStyle = styles.centerItem;

                const animationType = isToday ? 'pulse' : 'fadeInUp';
                const animationDelay = isToday ? 0 : Math.min(index, 20) * 10; // Cap delay for better performance

                // Add size variation for organic layout
                const sizeVariation = isToday ? 2.0 : 0.85 + Math.random() * 0.3;

                // Create a key using uniqueId (day of month) and index to prevent React key warnings
                const itemKey = `day-${dateInfo.uniqueId}-pos-${index}`;

                return (
                    <Animatable.View
                        key={itemKey}
                        animation={animationType}
                        delay={animationDelay}
                        duration={300}
                        easing="ease-out"
                        iterationCount={isToday ? 'infinite' : 1}
                        iterationDelay={5000}
                        useNativeDriver
                        style={[styles.dateItemWrapper, alignmentStyle]}
                    >
                        <View
                            style={[
                                styles.circle,
                                isToday && styles.todayCircle,
                                isFuture && styles.futureCircle,
                                { transform: [{ scale: sizeVariation }] },
                            ]}
                        >
                            <Image
                                source={getMoonPhaseImage(dateInfo.moonPhase)}
                                style={[
                                    styles.moonImage,
                                    isFuture && styles.futureMoonImage
                                ]}
                                resizeMode="contain"
                            />
                            <Text
                                style={[
                                    styles.dateText,
                                    isToday && styles.todayText,
                                    isFuture && styles.futureText
                                ]}
                            >
                                {dateInfo.label}
                            </Text>
                        </View>
                    </Animatable.View>
                );
            })}
        </ScrollView>
    );
}

export default function HomeScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const checkIfDayIsDivisibleBy7 = () => {
        const justTheDay = new Date().toLocaleDateString('en-US', {
            day: 'numeric'
        });

        if (Number(justTheDay) % 17 == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        setModalVisible(checkIfDayIsDivisibleBy7);
    }, []);

    const handleProfilePress = () => {
        router.push("../Settings&ProfilePages/Profile");
    };

    const handleSettingsPress = () => {
        router.push("../Settings&ProfilePages/Settings");
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Weekly Check-in!</Text>
                            <Text style={{ color: "white", marginBottom: 25 }}>Is there any updates you like to share from this week?</Text>

                            <TextInput placeholder="Enter an update!" placeholderTextColor={"grey"} style={{ fontSize: 20, backgroundColor: "#212121", borderRadius: 12, borderWidth: 4, borderColor: "#212121", color: "white", width: "100%" }}>
                            </TextInput>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                                marginTop: 45
                            }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Complete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../Frontend/images/pine-tree-background.png')}
                        style={styles.image}
                        resizeMode="stretch"
                    />
                </View>

                <View style={styles.profileButtonContainer}>
                    <Pressable onPress={handleProfilePress} style={styles.profileButton}>
                        <Fontisto name="person" size={24} color="#D7C9E3" />
                    </Pressable>
                </View>

                <DateTimeline />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    profileButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 10,
    },
    settingsButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 10,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2C123F',
        borderWidth: 2,
        borderColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2C123F',
        borderWidth: 2,
        borderColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 800,
        zIndex: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    moonImage: {
        width: '70%',
        height: '70%',
        borderWidth: 0.25,
        borderColor: "#e9f59d",
        borderStyle: "dotted",
        borderRadius: 50
    },
    futureMoonImage: {
        opacity: 0.5,
    },
    timelineContainer: {
        paddingVertical: 100,
        position: 'relative',
    },
    dateItemWrapper: {
        marginVertical: 40,
        position: 'relative',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 22,
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    todayCircle: {
        backgroundColor: '#94C9A9',
        shadowColor: '#74a589',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
    },
    todayText: {
        color: 'black',
        fontSize: 16,
    },
    futureCircle: {
        backgroundColor: '#D7C9E3',
        opacity: 0.5,
    },
    futureText: {
        color: 'black',
    },
    leftItem: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    rightItem: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    centerItem: {
        alignSelf: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 7, 63, 0.5)",
    },
    modalContainer: {
        width: "90%",
        height: "35%",
        backgroundColor: "#180723",
        padding: 15,
        borderRadius: 11,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D7C9E3",
    },
    modalText: {
        color: "#D7C9E3",
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#2C123F",
        alignItems: "center",
        paddingVertical: 10,
        width: "45%",
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#D7C9E3",
    },
    modalButtonText: {
        color: "#D7C9E3",
        fontSize: 16,
        fontWeight: "bold",
    },
});