import React from "react";
import { NavLink } from 'react-router-dom';
import { currentUser, logout } from './Helper';
import { useHistory } from "react-router-dom";
import { Labels } from './myGlobal';

const Header = (props) => {
    const history = useHistory();

    function handleLogOut() {
        logout();
        history.push('/logging');
    }
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/forms" activeClassName="active">{Labels.Forms}</NavLink>
                </li>
                <li>
                    <NavLink to="/seniors" activeClassName="active">{Labels.Seniors}</NavLink>
                </li>
                <li>
                    <NavLink to="/bills" activeClassName="active">{Labels.Bills}</NavLink>
                </li>
                <li>
                    <NavLink to="/summary" activeClassName="active">{Labels.Summary}</NavLink>
                </li>

                <li style={{ float: 'right' }}>
                    <div>
                        <p style={{ float: 'left', paddingRight: '10px' }}>{Labels.User}: {currentUser().username}</p>
                        <button onClick={handleLogOut} className="btn btn-info" style={{ float: 'left' }}>{Labels.Logout}</button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header;