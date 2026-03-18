import { useState } from "react"

import Login from "../Elements/Login"
import Register from "../Elements/Register"

function AuthPage() {
    const [availableAccount, setAvailableAccount] = useState(true)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            {availableAccount ? <Login /> : <Register />}

            <button onClick={() => setAvailableAccount(!availableAccount)} className='mt-4 text-blue-500'>
                {availableAccount ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
        </div>
    )
}

export default AuthPage