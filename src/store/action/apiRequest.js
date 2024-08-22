import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppConfig from "../config";
import { Alert } from "react-native";

const apiUrl = AppConfig.apiUrl;

const getHeaders = async () => {
  const userData = await AsyncStorage.getItem("userData");
  const { token } = JSON.parse(userData);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
  };
};

export const apiRequest = async (endpoint, method, data, params = {}) => {
  const headers = await getHeaders();
  const config = {
    url: `${apiUrl}${endpoint}`,
    method,
    headers,
    params,
    data
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(`Error making ${method} request to ${endpoint}:`, error);
    throw error;
  }
};
