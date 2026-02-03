const DEV_URL = "http://192.168.8.101:3000";
const PROD_URL= "https://api.quietspace.com";//just exemple

export const API_BASE_URL= __DEV__ ? DEV_URL: PROD_URL;