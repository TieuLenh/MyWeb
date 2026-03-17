import { useState } from "react"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {

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

            // Login thành công
            if (data.role === "ADMIN") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/user"
            }

        } catch (err) {
            console.error(err)
            alert("Cannot connect to server")
        }
    }

    return (

        <div>

            <h1>Login</h1>

            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button onClick={login}>
                Login
            </button>
            <h1 className="text-red-500 text-3xl">
                Test Tailwind
            </h1>
            <button onClick={() => window.location.href = "/register"}>Register</button>
        </div>

    )
}

export default Login