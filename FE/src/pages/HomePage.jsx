import { useState } from "react"
function HomePage() {
    const [isLoggedin, setIsLoggedin] = useState(false)
    // try {
    //     const token = localStorage.getItem("token")
    //     const user = JSON.parse(localStorage.getItem("user"))
    //     if (token) {
    //         setIsLoggedin(true)
    //         console.log("User info:", user)
    //     } else {
    //         setIsLoggedin(false)
    //     }  
    // } catch (err) {
    //     console.error("Error checking login status:", err)
    //     setIsLoggedin(false)
    // }
    return (
        <>
            <h1>Home</h1>
            {isLoggedin}
            <button onClick={() => window.location.href = "/auth"}>Logout</button>
        </>

    )

}

export default HomePage