import { Link } from 'react-router-dom';
import "./Header.css"
import React from "react";
const Header = () => {
    return (
        <div className="headerContainer">
            <div>
                <h1><Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Uba Riders</Link></h1>
            </div>
            <div>

                <ul>
                    <li>
                        <Link to="/home" className="header-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination" className="header-link">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog" className="header-link">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="header-link">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login" className="header-link" style={{ background: "orange", color: "#fff", padding: "12px 20px", borderRadius: "5px" }}>Login</Link>
                    </li>
                </ul>


            </div>
        </div>
    );
};

export default Header;