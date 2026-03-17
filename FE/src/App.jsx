import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import HomeUser from "./pages/HomeUser"
import HomeAdmin from "./pages/HomeAdmin"
import Regist from "./pages/Register"

import "./styles/style.css"

function App() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<HomeUser/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Regist />} />
                <Route path="/user" element={<HomeUser />} />
                <Route path="/admin" element={<HomeAdmin />} />
            </Routes>

        </BrowserRouter>

    )
}

export default App