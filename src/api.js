
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchChoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/choices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching choices:', error);
    throw error;
  }
};