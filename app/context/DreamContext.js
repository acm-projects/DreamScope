// import React, {createContext, useContext, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_BASE_URL = 'http://192.168.1.2:5001'

// const dreamContext = createContext();

// const DreamProvider = ({}) => {
//     const[dreamData, setDreamData] = useState(null);
//     const[loading, setLoading]
//     const fetchDreamPostByDate = async => (date, postId) {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`${API_BASE_URL}/api/dreamPosts/post/${postId}`);
//             setDreamData(response.data);
//         } catch (err) {
//             setError(err);
//             console.error('Error fetching dream post by ID:', err);
//         } finally {
//             setLoading(false);
//         }
//     }
// }

// export default DreamProvider;