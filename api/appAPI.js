import axios from "axios";
import { API_BASE_URL } from "../config/api.config";
import storageService from "../services/storageService";
const appAPI= axios.create(
    {
        // baseURL: "http://localhost:3000",
        baseURL: API_BASE_URL,
        timeout:5000,
        headers:
        {
            "Content-Type": "application/json",
        },
    }
);

appAPI.interceptors.request.use(
  async (config) => {
  const token = await storageService.getToken(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

},(error)=>{
  return Promise.reject(error);
}
);

export default appAPI;