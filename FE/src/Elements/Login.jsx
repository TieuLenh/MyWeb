import { useState } from "react"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            // login thành công, backend trả token
            // 1. Lưu token
            localStorage.setItem("token", data.token)

            // 2. Lưu thông tin user
            localStorage.setItem("user", JSON.stringify(data.user))

            // 3. Chuyển hướng
            window.location.href = "/"
        } catch (err) {
            console.error(err)
            alert("error when login")
        }
    }

    return (

        <form onSubmit={login} className="authForm" >

            <h1 className='text-red-500 text-3xl'>Login</h1>

            <input
                id="1"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="authCell"
            />

            <input
                id="2"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="authCell"
            />

            <button onClick={login} className="confirmBtn">
                Login
            </button>
            
        </form>

    )
}

export default Login