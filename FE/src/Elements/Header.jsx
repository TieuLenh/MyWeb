import { useState } from "react"
import { useNavigate } from "react-router-dom"

import NavBar from "./NavBar"
import SearchBox from "./SearchBox";


const menuItems = [
    { label: "Storage", href: "#storage" },
    { label: "Feature", href: "#feature" },
    { label: "Library", href: "#library" },
];

function Header({className = 'header', ...props}){
    const navigate = useNavigate()
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // const toggleMobileMenu = () => {
    //     setMobileMenuOpen(!mobileMenuOpen)
    // }

    return(
        <header className="header-container">
            <div
                onClick={() => navigate('/')}
                className="home-logo"
            >
                HOME
            </div>
            <NavBar items={menuItems} />
            <SearchBox />
            {props.children}
        </header>
    )
}

export default Header