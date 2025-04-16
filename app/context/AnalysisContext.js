import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDreamPostById = async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/post/${postId}`);
            setAnalysisData(response.data.analysis);
        } catch (err) {
            setError(err);
            console.error('Error fetching dream post by ID:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnalysisContext.Provider value={{ analysisData, loading, error, fetchDreamPostById }}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = () => useContext(AnalysisContext);