import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach bearer token from storage if present
apiClient.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem("roomly_auth_token");
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: unwrap standard ApiResponse and normalize errors
apiClient.interceptors.response.use(
  (response) => {
    // Backend wraps payloads in { success: true, statusCode, message, data }
    return response.data;
  },
  (error) => {
    let normalizedError = {
      success: false,
      statusCode: 500,
      message: "An unexpected error occurred. Please try again.",
      errors: [],
    };

    if (error.response && error.response.data) {
      normalizedError = {
        success: false,
        statusCode: error.response.status,
        message: error.response.data.message || normalizedError.message,
        errors: error.response.data.errors || [],
      };
    } else if (error.code === "ECONNABORTED") {
      normalizedError.message = "The request timed out. Please check your connection.";
      normalizedError.statusCode = 408;
    } else if (error.request) {
      normalizedError.message = "Unable to connect to Roomly backend server.";
      normalizedError.statusCode = 503;
    }

    return Promise.reject(normalizedError);
  }
);

export const checkHealth = async () => {
  return apiClient.get("/health");
};

export default apiClient;
