import { useState } from "react"
import { saveAuth } from "../utils/auth"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_BASE}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (!res.ok || !data) {
                alert(data?.message || "Login failed")
                return
            }

            // lưu token + user
            saveAuth(data.token, data)

            // redirect về Home
            window.location.href = "/"
        } catch (err) {
            console.error(err)
            alert("Error when login")
        }
    }

    return (
        <form onSubmit={login} className="authForm">
            <h1 className='text-red-500 text-3xl'>Login</h1>

            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="authCell"
            />

            <input
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