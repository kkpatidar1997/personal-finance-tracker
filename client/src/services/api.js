// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust if different
//   withCredentials: true, // for cookie-based auth if used
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
import axios from 'axios';

const API = axios.create({
  baseURL: ' https://personal-finance-tracker-1-wtpn.onrender.com/api', // Change if your backend is hosted elsewhere
});

// Register user
export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};
// Login user
export const loginUser = async (userData) => {
  const response = await API.post('/auth/login', userData);
  return response.data;
};


// Add transaction
export const addTransaction = async (transactionData, token) => {
  const response = await API.post('/transactions', transactionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all transactions
export const getTransactions = async (token) => {
  const response = await API.get('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a transaction
export const deleteTransaction = async (id, token) => {
  const response = await API.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

