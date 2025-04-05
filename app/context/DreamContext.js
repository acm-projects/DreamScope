import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.2:5001'

const DreamContext = createContext();

const DreamProvider = ({}) => {
    const[dreamData, setDreamData] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const fetchDreamPostByDate = async (userId, date) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/user/${userId}/date/${date}`);
            setDreamData(response.data);
        } catch (err) {
            setError(err);
            console.error('Error fetching dream post by ID:', err);
        } finally {
            setLoading(false);
        }
    }

    return(
        <DreamContext.Provider value = {{dreamData, loading, error, fetchDreamPostByDate }}>
            {children}
        </DreamContext.Provider>
    )
}

export const useDream = () => useContext(DreamContext);