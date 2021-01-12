import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = { color: "#F15B2A" };

    return (
        <nav>
            <NavLink to="/forms" activeStyle={activeStyle} exact>Forms</NavLink> {" | "}
            <NavLink to="/seniors" activeStyle={activeStyle}>Seniors</NavLink> {" | "}
        </nav>
    )
}

export default Header;