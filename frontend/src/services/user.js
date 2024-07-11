import axios from "axios";
import {parseCookie} from "@/utils/index.js";


const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/v1/users'
});

export const checkEmail = async (email) => {
    try {
        const response = await instance.post("/email_available/", {
            email: email
        });
        return response.status;
    } catch (error) {
        console.log(error);
        return error.status
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

export const changeProfile = async (userId, data) => {
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
        console.log("Failed to edit profile");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}