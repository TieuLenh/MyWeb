import { useState, useEffect } from "react"
import Account from "../Elements/Account"
import { useNavigate } from "react-router-dom"

import { clearAuth, getUser, isLoggedIn } from "../utils/auth"

import Header from "../Elements/Header"

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
        navigate("/")
    }
    return (
        <div>
            <Header >
                <Account isAuth={isAuth} user={user} logout={handleLogout}/>
            </Header>
        </div>
    )
}

export default HomePage