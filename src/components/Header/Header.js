import { Link } from 'react-router-dom';
import "./Header.css"
import React, { useContext } from "react";
import { UserContext } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser)

    return (
        <div className="headerContainer">
            <div>
                <h1><Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Pathao Riders</Link></h1>
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
                    {
                        loggedInUser.email ? <h5>{loggedInUser.displayName}</h5> :
                            <li>
                                <Link to="/login" className="header-link" style={{ background: "orange", color: "#fff", padding: "12px 20px", borderRadius: "5px" }}>
                                    Login
                                </Link>
                            </li>
                    }

                </ul>


            </div>
        </div>
    );
};

export default Header;