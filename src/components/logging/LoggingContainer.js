import React, { useEffect, useState } from 'react';
import LoggingForm from './LoggingForm';
import * as logApi from '../../api/logApi';
import { Labels } from '../common/myGlobal';

LoggingContainer.propTypes = {

};

function LoggingContainer({ history }) {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [logging, setLogging] = useState(false);

    const { serializeError, deserializeError } = require('serialize-error');

    function formIsValid() {
        const _errors = {};

        if (!user.username) _errors.username = Labels.ErrorUsernameRequired;
        if (!user.password) _errors.password = Labels.ErrorPasswordRequired;
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
        let error = {};

        error.message = e.includes("Failed to fetch")
            ? Labels.ErrorDbConnection
            : JSON.parse(e).message;

        setErrors(error);
        setLogging(false);
    }



    function handleLog(event) {
        event.preventDefault();
        if (!formIsValid()) return;

        setLogging(true);
        logApi.login(user).then((err) => {
            debugger;
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