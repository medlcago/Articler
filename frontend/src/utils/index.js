export const createPostUrl = (post) => {
    return `/post/${post.id}/`
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

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
    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}