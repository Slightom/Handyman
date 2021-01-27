import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerInput = ({
    name,
    label,
    onChange,
    value,
    error,
}) => {
    let wrapperClass = "form-control";
    if (error && error.length > 0) {
        wrapperClass += " " + "is-invalid";
    }
    return (
        <>
            <div className="form-group" >
                <label htmlFor={name} className="labelTextInput">{label}</label>
                <div className="field">
                    <DatePicker
                        name={name}
                        className={wrapperClass}
                        selected={value}
                        onChange={(selected) => onChange(selected, name)}
                        dateFormat="yyyy MMM dd"
                        autoComplete="off"
                    />
                    {error && <div className="errorMessage">{error}</div>}
                </div>
            </div>
        </>
    );
};

DatePickerInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string
};

export default DatePickerInput;
