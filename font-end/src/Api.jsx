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

export const insertMovie = async (movie) => {
  try {
    const response = await axios.post(`${BASE_URL}/insert`, movie);
    return response.data;
  } catch (error) {
    throw new Error('Error inserting movie');
  }
};

export const UpdateMovie = async (movie) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${movie.id}`, movie);
    return response.data;
  } catch (error) {
    throw new Error('Error updating movie');
  }
}

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Kiểm tra xem phản hồi có chứa tên file không
    if (!response.data.fileName) {
      throw new Error('Tên file không có trong phản hồi');
    }

    return response.data; 
  } catch (error) {
    throw new Error('Error uploading file: ' + error);
  }
};

