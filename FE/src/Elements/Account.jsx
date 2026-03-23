import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Account({isAuth = false, user = {}, logout = () => {}, className = 'Account', ...props}){
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={`${className}`} {...props}>
            {isAuth ? (
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="account-avatar"
                    >
                        <span>
                            {(user.username || "U").charAt(0).toUpperCase()}
                        </span>
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="account-dropdown">

                            <div className="account-dropdown-item">
                                <p>Welcome, {user.username || "unknown user"}!</p>
                                <p>Role: {user.role || "USER"}</p>
                            </div>

                            <div className="account-dropdown-divider"></div>

                            <button
                                onClick={() => {
                                    logout();
                                    setIsDropdownOpen(false);
                                }}
                                className="account-logout-btn"
                            >
                                Logout
                            </button>
                            
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => navigate("/auth")}
                    className="account-login-btn"
                >
                    Login
                </button>
            )}
        </div>
    )
}

export default Account
