import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API_BASE_URL = 'http://localhost:5001'

    const fetchUserData = async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/email/${email}`);
            if (response.data) {
                setUserData(response.data);
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error); 
            setUserData(null);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    await fetchUserData(storedEmail);
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error fetching user data from storage:", error);
                setUserData(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const contextValue = {
        userData,
        setUserData,
        isLoading,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};