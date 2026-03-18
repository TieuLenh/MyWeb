import { useEffect, useState } from "react"
import { isLoggedIn, getUser } from "../utils/auth"
import Account from "../Elements/Account"

function HomePage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (isLoggedIn()) setUser(getUser())
        return () => setUser(null) 
    }, [])

    return (
        <div>
            <h1>Home Page</h1>
            <Account userInfor={user} />
        </div>
    )
}

export default HomePage