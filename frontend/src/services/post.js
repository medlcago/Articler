import axios from "axios";
import {createUrl, parseCookie} from "@/utils/index.js";
import {BACKEND_URL} from "@/config.js";

const instance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1/posts`
});


export const getPost = async (id) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {};
        if (access_token) {
            config.headers = {
                Authorization: `Bearer ${access_token}`
            }
        }
        const response = await instance.get(`/${id}/`, config);
        return response.data;
    } catch (error) {
        console.log("Failed to get post");
    }
}

export const getPosts = async (filters = {}) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {};
        if (access_token) {
            config.headers = {
                Authorization: `Bearer ${access_token}`,
            };
        }
        const url = createUrl(filters);
        const response = await instance.get(url, config);
        return response.data;
    } catch (error) {
        console.log("Failed to get posts");
    }
}


export const createPost = async (data) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`

            }
        }
        const response = await instance.post("/", data, config);
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        console.log("Failed to create post");
        return {
            data: error.response.data,
            status: error.response.status
        }
    }
}

export const deletePost = async (id) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        const response = await instance.delete(`/${id}/`, config);
        return {
            status: response.status
        }
    } catch (error) {
        console.log("Failed to delete post");
        return {
            status: error.response.status
        }
    }
}