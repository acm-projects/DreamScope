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
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
    Easing,
    FadeIn,
    interpolate,
    Extrapolate,
    runOnJS,
} from 'react-native-reanimated';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = 100;
// Fixed item height for precise snapping
const ITEM_HEIGHT = 200;

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
            isFuture: i > currentDay,
            isToday: i === currentDay,
            uniqueId: `${currentMonth}-${dayOfMonth}`
        });
    }

    return dates;
}

function DateCarousel() {
    // Generate dates with padding for infinite scroll effect
    const monthDates = generateCurrentMonthDates();
    const [allDates, setAllDates] = useState(() => {
        // Add previous and next month dates for continuous scrolling experience
        return [...monthDates, ...monthDates, ...monthDates];
    });

    const scrollRef = useRef(null);
    const scrollY = useSharedValue(0);
    const activeIndex = useSharedValue(0);
    const [currentDateIndex, setCurrentDateIndex] = useState(0);

    // Shared value for glow animation
    const glowPosition = useSharedValue(0);

    // Find today's index in the original month dates
    const todayIndex = monthDates.findIndex(date => date.isToday);

    // Calculate the starting index including the padding month
    const initialScrollIndex = monthDates.length + todayIndex;

    // Function to handle index changes for custom effects
    const handleIndexChange = (index) => {
        setCurrentDateIndex(index);
        // Animate the glow position whenever active index changes
        glowPosition.value = withTiming(index * ITEM_HEIGHT - ITEM_HEIGHT / 2, { duration: 100 });
    };

    useEffect(() => {
        // Scroll to today's date initially with the middle set of data
        // This allows scrolling backward and forward
        if (scrollRef.current) {
            const initialOffset = initialScrollIndex * ITEM_HEIGHT;

            // Small delay to ensure layout is complete
            setTimeout(() => {
                scrollRef.current.scrollTo({
                    y: initialOffset,
                    animated: false
                });

                // Set the active index and glow position
                activeIndex.value = initialScrollIndex;
                glowPosition.value = initialScrollIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2;
                setCurrentDateIndex(initialScrollIndex);
            }, 100);
        }
    }, []);

    // Reset the scroll position when reaching the end of data to create infinite scroll
    const handleScrollEndReached = () => {
        const middleMonthStart = monthDates.length;
        const totalItems = allDates.length;

        if (activeIndex.value < middleMonthStart - 5) {
            // If scrolled too far back, reset to the middle set
            if (scrollRef.current) {
                const newIndex = activeIndex.value + monthDates.length;
                scrollRef.current.scrollTo({
                    y: newIndex * ITEM_HEIGHT,
                    animated: false
                });
                activeIndex.value = newIndex;
                glowPosition.value = newIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2;
            }
        } else if (activeIndex.value > middleMonthStart * 2 + 5) {
            // If scrolled too far forward, reset to the middle set
            if (scrollRef.current) {
                const newIndex = activeIndex.value - monthDates.length;
                scrollRef.current.scrollTo({
                    y: newIndex * ITEM_HEIGHT,
                    animated: false
                });
                activeIndex.value = newIndex;
                glowPosition.value = newIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2;
            }
        }
    };

    // Handle scroll events
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;

            // Calculate current active index
            const newIndex = Math.round(scrollY.value / ITEM_HEIGHT);
            if (newIndex !== activeIndex.value) {
                activeIndex.value = newIndex;
                // Update glow position
                glowPosition.value = newIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2;
                runOnJS(handleIndexChange)(newIndex);
            }
        },
        onMomentumEnd: (event) => {
            // Check if we need to reset position for infinite scroll
            runOnJS(handleScrollEndReached)();
        },
    });

    // Animated style for the glow effect
    const glowAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: glowPosition.value }
            ]
        };
    });

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

    // Render a single carousel item
    const CarouselItem = ({ item, index }) => {
        const isActive = activeIndex.value === index;

        // Create animated styles based on position relative to active item
        const animatedStyle = useAnimatedStyle(() => {
            // Calculate the offset from current position
            const inputRange = [
                (index - 2) * ITEM_HEIGHT,
                (index - 1) * ITEM_HEIGHT,
                index * ITEM_HEIGHT,
                (index + 1) * ITEM_HEIGHT,
                (index + 2) * ITEM_HEIGHT,
            ];

            // Enhanced scale for active item - make it bigger
            const scale = interpolate(
                scrollY.value,
                inputRange,
                [0.7, 0.9, 1.2, 0.9, 0.7], // Increased center scale from 1.1 to 1.2
                Extrapolate.CLAMP
            );

            // Opacity based on distance from center
            const opacity = interpolate(
                scrollY.value,
                inputRange,
                [0.5, 0.7, 1, 0.7, 0.5],
                Extrapolate.CLAMP
            );

            // Subtle vertical translation for 3D effect
            const translateY = interpolate(
                scrollY.value,
                inputRange,
                [60, 30, 0, -30, -60],
                Extrapolate.CLAMP
            );

            return {
                transform: [
                    { scale },
                    { translateY }
                ],
                opacity,
                zIndex: isActive ? 2 : 0,
            };
        });

        // Animated style for the circle itself to add glow effects
        const circleAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = [
                (index - 1) * ITEM_HEIGHT,
                index * ITEM_HEIGHT,
                (index + 1) * ITEM_HEIGHT,
            ];

            // Enhanced shadow effect for active item
            const shadowOpacity = interpolate(
                scrollY.value,
                inputRange,
                [0.2, 0.8, 0.2],
                Extrapolate.CLAMP
            );

            // Background color shift for active item
            const backgroundColor = isActive
                ? item.isToday
                    ? '#94C9A9'
                    : item.isFuture
                        ? 'rgba(215, 201, 227, 1)'
                        : 'rgba(215, 201, 227, 1)'
                : item.isToday
                    ? '#94C9A9'
                    : item.isFuture
                        ? 'rgba(215, 201, 227, 0.8)'
                        : '#D7C9E3';

            return {
                shadowOpacity: shadowOpacity,
                shadowRadius: isActive ? 15 : 4,
                backgroundColor,
                borderWidth: isActive ? 3 : 2,
            };
        });

        // Determine if this is truly today (compensating for the repeated data)
        const normalizedIndex = index % monthDates.length;
        const normalizedTodayIndex = todayIndex;
        const isTrueToday = normalizedIndex === normalizedTodayIndex;

        return (
            <Animated.View
                style={[
                    styles.carouselItem,
                    animatedStyle
                ]}
            >
                <Animated.View
                    style={[
                        styles.moonCircle,
                        isTrueToday && styles.todayCircle,
                        item.isFuture && styles.futureCircle,
                        circleAnimatedStyle,
                        isActive && styles.activeCircle
                    ]}
                >
                    <Image
                        source={getMoonPhaseImage(item.moonPhase)}
                        style={[
                            styles.moonImage,
                            item.isFuture && styles.futureMoonImage
                        ]}
                        resizeMode="contain"
                    />

                    <Text
                        style={[
                            styles.dateText,
                            isTrueToday && styles.todayText,
                            item.isFuture && styles.futureText,
                            isActive && styles.activeDateText
                        ]}
                    >
                        {item.label}
                    </Text>

                    {/* Add indicator for active item */}
                    {isActive && (
                        <View style={styles.activeIndicator} />
                    )}
                </Animated.View>

                {/* Add a subtle glow around active item */}
                {isActive && (
                    <Animated.View style={styles.activeItemLocalGlow} />
                )}
            </Animated.View>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.carouselContainer}>
                {/* Background glow effect for active item - FIXED HERE */}
                <Animated.View
                    style={[
                        styles.activeItemGlow,
                        glowAnimatedStyle
                    ]}
                />

                <Animated.ScrollView
                    ref={scrollRef}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    snapToAlignment="center"
                    pagingEnabled={false}
                >
                    {/* Add padding at top and bottom for a better scroll experience */}
                    <View style={{ height: height / 2 - ITEM_HEIGHT / 2 }} />

                    {allDates.map((item, index) => (
                        <CarouselItem
                            key={`item-${item.uniqueId}-${index}`}
                            item={item}
                            index={index}
                        />
                    ))}

                    <View style={{ height: height / 2 - ITEM_HEIGHT / 2 }} />
                </Animated.ScrollView>

                {/* Swipe indicator */}
                <View style={styles.swipeIndicatorContainer}>
                    <Fontisto name="angle-up" size={18} color="#D7C9E3" style={{ marginBottom: 5 }} />
                    <Fontisto name="angle-down" size={18} color="#D7C9E3" />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default function HomeScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    // Check if weekly check-in should appear
    const checkIfDayIsDivisibleBy7 = () => {
        const justTheDay = new Date().toLocaleDateString('en-US', {
            day: 'numeric'
        });

        return Number(justTheDay) % 20 === 0;
    }

    useEffect(() => {
        setModalVisible(checkIfDayIsDivisibleBy7());
    }, []);

    const handleProfilePress = () => {
        router.push("../Settings&ProfilePages/Profile");
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
                        <Animated.View
                            style={styles.modalContainer}
                            entering={FadeIn.duration(400).delay(300)}
                        >
                            <Text style={styles.modalText}>Weekly Check-in!</Text>
                            <Text style={{ color: "white", marginBottom: 25 }}>
                                Is there any updates you like to share from this week?
                            </Text>

                            <TextInput
                                placeholder="Enter an update!"
                                placeholderTextColor={"grey"}
                                style={styles.modalInput}
                            />

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalButtonText}>Complete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalButtonText}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>

                <Animated.View
                    style={styles.imageContainer}
                    entering={FadeIn.duration(800)}
                >
                    <Image
                        source={require('../../Frontend/images/pine-tree-background.png')}
                        style={styles.image}
                        resizeMode="stretch"
                    />
                </Animated.View>

                <Animated.View
                    style={styles.profileButtonContainer}
                    entering={FadeIn.duration(500).delay(300)}
                >
                    <Pressable onPress={handleProfilePress} style={styles.profileButton}>
                        <Fontisto name="person" size={24} color="#D7C9E3" />
                    </Pressable>
                </Animated.View>

                <DateCarousel />
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
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2C123F',
        borderWidth: 2,
        borderColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#D7C9E3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
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
    // Carousel styles
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    scrollContent: {
        alignItems: 'center',
    },
    carouselItem: {
        height: ITEM_HEIGHT,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moonCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
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
        opacity: 0.7,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
    },
    todayCircle: {
        backgroundColor: '#94C9A9',
        shadowColor: '#74a589',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 8,
        borderColor: '#4A7A5B',
        borderWidth: 2,
    },
    todayText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    futureCircle: {
        backgroundColor: '#D7C9E3',
        opacity: 0.8,
        borderColor: '#6E3A8E',
    },
    futureText: {
        color: 'black',
    },
    // Active item indicator
    activeIndicator: {
        position: 'absolute',
        top: -8,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#D7C9E3',
        borderWidth: 2,
        borderColor: '#3d1865',
    },
    // Enhanced styles for active item
    activeCircle: {
        borderColor: '#8A4FBC', // More vibrant border
        shadowColor: '#D7C9E3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 10,
    },
    activeDateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#180723', // Darker text for contrast
    },
    activeItemLocalGlow: {
        position: 'absolute',
        width: CIRCLE_SIZE + 30,
        height: CIRCLE_SIZE + 30,
        borderRadius: (CIRCLE_SIZE + 30) / 2,
        backgroundColor: 'transparent',
        borderColor: 'rgba(215, 201, 227, 0.4)',
        borderWidth: 2,
        shadowColor: '#D7C9E3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
    },
    // Glow effect for active item
    activeItemGlow: {
        position: 'absolute',
        width: 180, // Increased from 150
        height: 180, // Increased from 150
        borderRadius: 90,
        backgroundColor: 'rgba(84, 40, 130, 0.25)', // Slightly more opaque
        shadowColor: '#6E3A8E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7, // Increased from 0.6
        shadowRadius: 50, // Increased from 40
        zIndex: -1,
    },
    // Swipe indicator
    swipeIndicatorContainer: {
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(40, 18, 63, 0.7)',
        padding: 10,
        borderRadius: 20,
        zIndex: 100,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 7, 63, 0.5)",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#180723",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D7C9E3",
        shadowColor: "#D7C9E3",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    modalText: {
        color: "#D7C9E3",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalInput: {
        fontSize: 20,
        backgroundColor: "#212121",
        borderRadius: 12,
        borderWidth: 4,
        borderColor: "#212121",
        color: "white",
        width: "100%",
        padding: 12,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 45,
    },
    modalButton: {
        backgroundColor: "#2C123F",
        alignItems: "center",
        paddingVertical: 12,
        width: "45%",
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D7C9E3",
        shadowColor: "#D7C9E3",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    modalButtonText: {
        color: "#D7C9E3",
        fontSize: 16,
        fontWeight: "bold",
    },
});