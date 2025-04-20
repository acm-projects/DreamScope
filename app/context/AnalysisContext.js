import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5001';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDreamPostById = useCallback(async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/post/${postId}`);
            setAnalysisData(response.data);
        } catch (err) {
            setError(err);
            console.error('AnalysisContext: Error fetching dream post by ID:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDreamPostsByUserAndDate = useCallback(async (userId, date) => {
        setLoading(true);
        setError(null);
        try {
            // Ensure the date is in a format your API expects (e.g., YYYY-MM-DD)
            const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/user/${userId}/date/${date}`);
            setAnalysisData(response.data); // Or handle multiple results differently
        } catch (err) {
            setError(err);
            console.error('AnalysisContext: Error fetching dream posts by user and date:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <AnalysisContext.Provider value={{ analysisData, loading, error, fetchDreamPostById, fetchDreamPostsByUserAndDate }}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = () => useContext(AnalysisContext);