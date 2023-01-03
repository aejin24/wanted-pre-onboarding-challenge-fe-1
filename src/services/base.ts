import axios from "axios";
import failureHandler from "./failureHandler";

export const Axios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

const commonHandler = (error: any) => {
    if (error.code === "ECONNABORTED") {
        return Promise.reject(Error("요청이 만료되었습니다."));
    }

    if (error.code === "ERR_NETWORK") {
        return Promise.reject(Error("네트워크를 확인해주세요."));
    }

    throw failureHandler(error);
};

Axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        commonHandler(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        commonHandler(error);
    }
);