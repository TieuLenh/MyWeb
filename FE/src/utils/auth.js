// auth.js - utility functions for authentication management
// Lưu token và user vào localStorage
export const saveAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

// Xóa token khi logout
export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

// Lấy token
export const getToken = () => localStorage.getItem("token");

// Lấy user info
export const getUser = () => {
    try {
        const user = localStorage.getItem("user");

        if (!user || user === "undefined") return null;

        return JSON.parse(user);
    } catch (err) {
        console.error("Invalid user data in localStorage");
        return null;
    }
}

// Kiểm tra đã login chưa
export const isLoggedIn = () => !!getToken();