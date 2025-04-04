import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ScrollView, } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 100;

function generatePastDates(count: number) {
    const dates = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const label = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        dates.push(label);
    }
    return dates;
}

function DateTimeline() {
    const scrollRef = useRef<ScrollView>(null);
    const dates = generatePastDates(90);
    const todayLabel = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: false });
        }, 300);
    }, []);

    return (
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.timelineContainer}
            showsVerticalScrollIndicator={false}
        >
            {dates.map((date, index) => {
                const isToday = date === todayLabel;
                const reverseIndex = dates.length - 1 - index;

                let alignmentStyle;
                if (isToday) {
                    alignmentStyle = styles.centerItem;
                } else if (reverseIndex % 4 === 1) {
                    alignmentStyle = styles.leftItem;
                } else if (reverseIndex % 4 === 2) {
                    alignmentStyle = styles.centerItem;
                } else if (reverseIndex % 4 === 3) {
                    alignmentStyle = styles.rightItem;
                } else {
                    alignmentStyle = styles.centerItem;
                }

                const animationType = isToday ? 'pulse' : 'fadeInUp';
                const animationDelay = isToday ? 0 : index * 10;

                // Add size variation for organic layout
                const sizeVariation = isToday ? 2.0 : 0.85 + Math.random() * 0.3;

                return (
                    <Animatable.View
                        key={index}
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
                                { transform: [{ scale: sizeVariation }] },
                            ]}
                        >
                            <Text style={[styles.dateText, isToday && styles.todayText]}>
                                {date}
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

    const handleProfilePress = () => {
        router.push("../Settings&ProfilePages/Profile");
    };

    return (
        <LinearGradient colors={['#180723', '#2C123F', '#2C123F', '#3d1865']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../Frontend/images/treeforeground.png')}
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
        backgroundColor: '#D7C9E3',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2C123F',
    },
    todayCircle: {
        backgroundColor: '#94C9A9',
        shadowColor: '#74a589',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
    },
    todayText: {
        color: '#180723',
        fontSize: 16,
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
});