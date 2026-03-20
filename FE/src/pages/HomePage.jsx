import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { clearAuth, getUser, isLoggedIn } from "../utils/auth"

function HomePage() {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = isLoggedIn()
        setIsAuth(loggedIn)

        if (loggedIn) {
            setUser(getUser())
        } else {
            setUser(null)
        }
    }, [])

    const handleLogout = () => {
        clearAuth()
        setUser(null)
        setIsAuth(false)
        navigate("/auth")
    }

    return (
        <div>
            <h1>Home</h1>

            {isAuth ? (
                <>
                    <p>Welcome, {getUser()?.name || "User"}!</p>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <button
                    onClick={() => navigate("/auth")}
                    className="btn btn-primary"
                >
                    Login
                </button>
            )}
        </div>
    )
}

export default HomePage