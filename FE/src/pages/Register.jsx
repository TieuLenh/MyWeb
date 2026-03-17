import { useState } from "react"

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const register = async () => {

        try {

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            })
            const text = await res.text()

            alert(text)

            // chuyển về login
            window.location.href = "/"

        } catch (err) {

            console.error(err)
            alert("Have an error when register")

        }

    }

    return (

        <div>

            <h1>Register</h1>

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

            <button onClick={register}>
                Register
            </button>

            <h1 className="text-red-500 text-3xl">
                Test Tailwind
            </h1>

        </div>

    )
}

export default Register