// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/movies';

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
};

export const searchMovieByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?title=${title}`);
    return response.data;
  } catch (error) {
    throw new Error('Error searching movie');
  }
};
