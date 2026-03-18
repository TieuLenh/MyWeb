import { useEffect, useState } from "react"
import { isLoggedIn, getUser, clearAuth } from "../utils/auth"

function Account({userInfor}) {
    const handleLogout = () => {
        clearAuth()
        window.location.href = "/auth"
    }
    return userInfor ? (
                <div>
                    <p>Welcome, {userInfor.username}!</p>
                    <p>Role: {userInfor.role}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                    <button onClick={() => window.location.href = "/auth"}>Login</button>
                </div>
            )
}

export default Account