import React, { useEffect, useState } from 'react';
import LoggingForm from './LoggingForm';
import PropTypes from 'prop-types';
import * as logApi from '../../api/logApi';
import Spinner from '../common/Spinner';
import { Redirect } from 'react-router';

LoggingContainer.propTypes = {

};

function LoggingContainer({ history }) {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [logging, setLogging] = useState(false);

    const { serializeError, deserializeError } = require('serialize-error');

    function formIsValid() {
        const _errors = {};

        if (!user.username) _errors.username = "Name is required.";
        if (!user.password) _errors.password = "Password is required.";
        if (!user.password === "dupa") _errors.password = "Nie pisz 'dupa' łapserdaku.";

        setErrors(_errors);

        return Object.keys(_errors).length === 0;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }


    function handleErrorMessage(e) {
        //const err = JSON.parse(serializeError(e).message);
        let error = {};
        debugger;
        // if (err && err.status) {
        //     switch (err.status) {
        //         case 400:
        //             break;
        //         default:
        //     }
        // } else {
        //     error.message = "Sorry, couldn't connect to database server. Try login later.";
        // }
        error.message = e.includes("Failed to fetch")
            ? "Sorry, couldn't connect to database server. Try login later."
            : JSON.parse(e).message;

        setErrors(error);
        setLogging(false);
    }

    function handleLog(event) {
        event.preventDefault();
        if (!formIsValid()) return;

        setLogging(true);
        logApi.login(user).then((err) => {
            if (err) {
                handleErrorMessage(err);
            }
            history.push("/forms");
        });
    }

    return (
        <>
            <LoggingForm
                user={user}
                onChange={handleChange}
                onLog={handleLog}
                logging={logging}
                errors={errors} />
        </>
    );
}

export default LoggingContainer;