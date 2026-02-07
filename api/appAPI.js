import axios from "axios";
import { API_BASE_URL } from "../config/api.config";
import storageService from "../services/storageService";

const appAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Augmenté pour les uploads d'images
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token
appAPI.interceptors.request.use(
  async (config) => {
    // Ne pas modifier les headers pour FormData (axios le fait automatiquement)
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    
    const token = await storageService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
appAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Gérer les erreurs d'authentification (401)
    if (error.response && error.response.status === 401) {
      // Optionnel: Rafraîchir le token ou rediriger vers login
      await storageService.removeToken();
   
    } 
    return Promise.reject(error);
  }
);
export default appAPI;