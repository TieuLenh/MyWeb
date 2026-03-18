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
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

// Kiểm tra đã login chưa
export const isLoggedIn = () => !!getToken();