import axios from "axios";
import {parseCookie} from "@/utils/index.js";
import {BACKEND_URL} from "@/config.js";


const instance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/users`
});

export const checkEmail = async (email) => {
    try {
        const response = await instance.post("/email_available/", {
            email: email
        });
        return response.status === 200
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getUser = async () => {
    try {
        const accessToken = parseCookie("access_token");
        const response = await instance.get("/me/", {
            headers: {
                Authorization: `Bearer ${accessToken}`

            }
        });
        return response.data;
    } catch (error) {
        console.log("Failed to get user");
    }
}

export const registerUser = async (email, password) => {
    try {
        const response = await instance.post("/", {
            email: email,
            password: password
        });
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to register user");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}

export const changeUserData = async (userId, data) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {}
        config.headers = {
            Authorization: `Bearer ${access_token}`
        }
        const response = await instance.patch(`/${userId}/`, data, config);
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to change user data");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}

export const resetPassword = async (email) => {
    try {
        const response = await instance.post("/reset-password/", {
            email: email
        });
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to send reset password email");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}

export const validateToken = async (token) => {
    try {
        const response = await instance.post("/reset-password/validate_token/", {
            token: token
        });
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to validate token");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}

export const resetPasswordConfirm = async (token, password) => {
    try {
        const response = await instance.post("/reset-password/confirm/", {
            token: token,
            password: password
        });
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to reset password");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}