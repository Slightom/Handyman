import React from "react";
import PropTypes from "prop-types";
import "../common/myStyle.css";


const TextInput = ({ name, label, onChange, placeholder, value, error, password }) => {
  let wrapperClass = "form-control";
  if (error && error.length > 0) {
    wrapperClass += " " + "is-invalid";
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="labelTextInput">{label}</label>
      <div className="field has-warning">
        <input
          type={password ? "password" : "text"}
          name={name}
          className={wrapperClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={name === "username" ? "on" : "off"}
        />
        {error && <div className="errorMessage">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
