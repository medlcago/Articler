import {BACKEND_URL} from "@/config.js";

export const getAvatarUrl = (avatarPath) => {
    return `${BACKEND_URL}${avatarPath}`;
};
export const parseCookie = (cookieName) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
};
export const setCookie = (name, value, daysToExpire) => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + currentDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

export const deleteCookies = (...values) => {
    values.forEach(value => {
        setCookie(value, "", -1)
    });
}

export const createUrl = (filters = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        params.append(key, value);
    }
    return `/?${params.toString()}`;
}

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}