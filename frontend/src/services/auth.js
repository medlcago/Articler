import axios from "axios";
import {deleteCookies, parseCookie, setCookie} from "@/utils/index.js";
import {BACKEND_URL} from "@/config.js";

const instance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/auth/token`
});


export const loginUser = async (email, password) => {
    try {
        const response = await instance.post("/", new URLSearchParams({
            email: email,
            password: password
        }));

        console.log("Login successful!");
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const user = response.data.user;

        setCookie("access_token", accessToken);
        setCookie("refresh_token", refreshToken, 1);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: user
        };
    } catch (error) {
        console.log("Login failed. Invalid email or password.");
    }
}

export const logoutUser = async () => {
    deleteCookies("access_token", "refresh_token");
    console.log("Logout successful!");
}


export const verifyAccessToken = async () => {
    try {
        const token = parseCookie("access_token");
        if (!token) {
            return false;
        }
        const response = await instance.post("/verify/", {
            token: token
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

export const refreshAccessToken = async () => {
    try {
        const refreshToken = parseCookie("refresh_token");
        if (!refreshToken) {
            return false;
        }
        const response = await instance.post("/refresh/", {
            refresh: refreshToken
        });
        const accessToken = response.data.access;
        setCookie("access_token", accessToken);
        return true;
    } catch (error) {
        return false;
    }
}