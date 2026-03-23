// src/Elements/Login.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveAuth } from "../utils/auth"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const login = async (e) => {
        e.preventDefault()
        
        try {

            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const data = await res.json()
            // Nếu backend trả lỗi
            if (!res.ok || !data) {
                alert(data?.message || "Login failed")
                return
            }
            saveAuth(data.token, data)
            navigate("/")
        } catch (err) {
            console.error(err)
            alert("error: " + err.message)
        }
    }

    return (

        <form onSubmit={login} className="authForm" >

            <h1 className='login-title'>Login</h1>

            <input
                key="1"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="authCell"
            />

            <input
                key="2"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="authCell"
            />

            <button type="submit" className="confirmBtn">
                Login
            </button>
            
        </form>

    )
}

export default Login