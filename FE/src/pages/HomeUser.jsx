var isLogin = localStorage.getItem("isLogin")


function HomeUser() {

    return (
        <>
            <h1>Client Home</h1>
            <button onClick={() => window.location.href = "/login"}>{isLogin ? 'Logout' : 'Login'}</button>
        </>
    )

}

export default HomeUser