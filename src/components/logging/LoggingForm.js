import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import "../common/myStyle.css";

const LoggingForm = ({
    user,
    onChange,
    onLog,
    logging,
    error
}) => {

    return (

        <div>
            <div>s</div>
            <div id="logContainer">
                <img src='/handymanLogo.png' alt="Logo" style={{ width: 300 }} />
                <div id="logForm">
                    <form onSubmit={onLog} style={{ marginBottom: 20 }}>
                        <TextInput
                            name="username"
                            label="Username"
                            value={user.username}
                            onChange={onChange}
                        />

                        <TextInput
                            name="password"
                            label="Password"
                            value={user.password}
                            onChange={onChange}
                            password={true}
                        />

                        <button type="submit" disabled={logging} className="btn btn-primary">
                            {logging ? "Logging..." : "Log in"}
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
