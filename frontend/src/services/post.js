import axios from "axios";
import {createUrl, parseCookie} from "@/utils/index.js";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1/posts"
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


export const createPost = async (title, description, is_published) => {
    try {
        const access_token = parseCookie("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`

            }
        }
        const response = await instance.post("/", {title, description, is_published}, config);
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