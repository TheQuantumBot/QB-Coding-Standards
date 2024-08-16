import axios from 'axios';
import { BASE_URL } from '../congif/api.config';

// Create an instance of axios with default configurations
const axiosClient = axios.create({
  baseURL: BASE_URL, // Base URL for all requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Add a request interceptor to include the authentication token in headers
axiosClient.interceptors.request.use(
  config => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If token exists, set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses and errors
axiosClient.interceptors.response.use(
  response => {
    // Simply return the response
    return response;
  },
  error => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosClient;
