import { NavLink, useLocation } from "react-router-dom";
import "./header.css";

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header>
            <h2>User Management System</h2>
            <nav>
                {currentPath === "/" && (
                    <NavLink to="/add-user" className="header-button">
                        Add User
                    </NavLink>
                )}
                {currentPath === "/add-user" && (
                    <NavLink to="/" className="header-button">
                        Users List
                    </NavLink>
                )}
            </nav>
        </header >
    )
}
export default Header;