import React, { useState } from 'react';
import LoggingForm from './LoggingForm';
import PropTypes from 'prop-types';
import * as logApi from '../../api/logApi';
import Spinner from '../common/Spinner';
import { Redirect } from 'react-router';

LoggingContainer.propTypes = {

};

function LoggingContainer({ history }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [logging, setLogging] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function handleLog(event) {
        event.preventDefault();

        setLogging(true);
        logApi.login(user).then(() => {
            history.push("/forms");
        })
    }

    return (
        <>
            <LoggingForm
                user={user}
                onChange={handleChange}
                onLog={handleLog}
                logging={logging} />
        </>
    );
}

export default LoggingContainer;