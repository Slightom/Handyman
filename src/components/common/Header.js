import { Button } from "bootstrap";
import React from "react";
import { Link, NavLink, Redirect } from 'react-router-dom';
import currentUser from './Helper';
import * as logApi from '../../api/logApi';
import { useHistory } from "react-router-dom";

const Header = (props) => {
    const activeStyle = { color: "#F15B2A" };
    const history = useHistory();

    function handleLogOut() {
        logApi.logout();
        history.push('/logging');
    }
    return (
        // <nav>
        //     <NavLink to="/forms" activeStyle={activeStyle} exact>Forms</NavLink> {" | "}
        //     <NavLink to="/seniors" activeStyle={activeStyle}>Seniors</NavLink> {" | "}
        //     <NavLink to="/bills" activeStyle={activeStyle}>Bills</NavLink> {" | "}
        //     <NavLink to="/summary" activeStyle={activeStyle}>Summary</NavLink>
        // </nav>
        <nav>
            <ul>
                <li>
                    <NavLink to="/forms" activeClassName="active">Forms</NavLink>
                </li>
                <li>
                    <NavLink to="/seniors" activeClassName="active">Seniors</NavLink>
                </li>
                <li>
                    <NavLink to="/bills" activeClassName="active">Bills</NavLink>
                </li>
                <li>
                    <NavLink to="/summary" activeClassName="active">Summary</NavLink>
                </li>

                <li style={{ float: 'right' }}>
                    <div>
                        <p style={{ float: 'left' }}>Użytkownik: {currentUser().username}</p>
                        <button onClick={handleLogOut} className="btn btn-info" style={{ float: 'left' }}>Wyloguj</button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header;