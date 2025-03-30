
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

export const vote = async (placeName) => {
  try {
    const response = await axios.get(`${API_URL}/vote`, {
      params: { place_name: placeName }, // Automatically encodes special characters
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error voting:', error);
    throw error;
  }
}