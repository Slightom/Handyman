import React from "react";
import PropTypes from "prop-types";

const NumberInput = ({ name, label, onChange, placeholder, value, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    function handleKeyPress(event) {

        console.log(event.charCode);
        return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? "" : event.charCode >= 48 && event.charCode <= 57;
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyPress={(event) => handleKeyPress}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default NumberInput;
