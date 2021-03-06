import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import "../common/myStyle.css";
import { Labels, Lables } from '../common/myGlobal';

const LoggingForm = ({
    user,
    onChange,
    onLog,
    logging,
    errors
}) => {

    let wrapperClass = "logContainer";
    if (errors) {
        wrapperClass += " " + "has-error";
    }

    return (

        <div>
            <div>s</div>
            <div class={wrapperClass}>
                {errors.message && !errors.password && !errors.username && <div className="headerLogError">{errors.message}</div>}
                <img src='/handymanLogo.PNG' alt="Logo" style={{ width: 300 }} />
                <div id="logForm">
                    <form onSubmit={onLog} style={{ marginBottom: 20 }}>
                        <TextInput
                            name="username"
                            label={Labels.Username}
                            value={user.username}
                            onChange={onChange}
                            error={errors.username}
                        />

                        <TextInput
                            name="password"
                            label={Labels.Password}
                            value={user.password}
                            onChange={onChange}
                            password={true}
                            error={errors.password}
                        />

                        <button type="submit" disabled={logging} className="btn btn-primary">
                            {logging ? Labels.Logging : Labels.Log}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

LoggingForm.propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    onLog: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    logging: PropTypes.bool
};

export default LoggingForm;
