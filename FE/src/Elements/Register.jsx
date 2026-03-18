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

            const res = await fetch(`${API_BASE}/api/register`, {
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

        <form onSubmit={register} className="authForm">

            <h1 className='text-red-500 text-3xl'>Register</h1>

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

            <input
                id="3"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="authCell"
            />


            <button onClick={register} className="confirmBtn">
                Register
            </button>

        </form>

    )
}

export default Register