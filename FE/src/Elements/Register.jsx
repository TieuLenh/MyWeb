// src/Elements/Register.jsx
import { useState } from "react"

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = async (e) => {
        e.preventDefault()
        try {
            const checkValid = !username || !password || password !== confirmPassword
            if (checkValid) {
                alert("Invalid input")
                return
            }

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
            const status = await res.json()
            if (status) {
                // chuyển về login
                alert("Register successful")
                window.location.href = "/"
            }
            else{
                alert("Can not register with these information")
                setUsername("")
                setPassword("")
                setConfirmPassword("")
            }

        } catch (err) {
            console.error(err)
            alert("Have an error during register process: " + err.message)
        }

    }

    return (

        <form onSubmit={register} className="authForm">

            <h1 className='register-title'>Register</h1>

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

            <input
                key="3"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="authCell"
            />


            <button type="submit" className="confirmBtn">
                Register
            </button>

        </form>

    )
}

export default Register