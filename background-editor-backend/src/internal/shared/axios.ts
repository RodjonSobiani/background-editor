import axios from "axios";

export const ML_URL = process.env.ML_URL;


export const ML_HTTPS_SERVICES = axios.create({
    baseURL: ML_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
});

