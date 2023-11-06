// api.js
import axios from "axios";
import axiosRetry from "axios-retry";

const apiClient = axios.create({
  baseURL: "https://fromandtable-default-rtdb.firebaseio.com/details.json",
  timeout: 10000,
});


axiosRetry(apiClient, { retries: 3, retryDelay: axiosRetry.exponentialDelay });


// apiClient.defaults.headers.common["Authorization"] = "Bearer token"; 


export const get = (url, params = {}) => {
  return apiClient.get(url, { params });
};


export const post = (url, data) => {
  return apiClient.post(url, data);
};

export const put = (url, data) => {
  return apiClient.put(url, data);
};


export const patch = (url, data) => {
  return apiClient.patch(url, data);
};


export const remove = (url) => {
  return apiClient.delete(url);
};


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // API response errors
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // network errors
      console.error("Network Error:", error.message);
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
