import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options
}) => {

  function setClass(formsl) {
    let c = "selectOption";
    if (formsl) {
      switch (formsl.toString()) {
        case '1':
          c += " senior1form";
          break;
        case '2':
          c += " senior2form";
          break;
        case '3':
          c += " senior3form";
          break;
        case '4':
          c += " senior4form";
          break;
        case '5':
          c += " senior5form";
          break;
        default:
      }
    }

    return c;
  }

  let wrapperClass = "form-control";
  if (error && error.length > 0) {
    wrapperClass += " " + "is-invalid selectError";
  }

  return (
    <div className="form-group">
      {name !== "seniorId"
        ? <label htmlFor={name} className="labelTextInput">{label}</label>
        :
        <div className="labelSelectSeniorContainer" style={{ display: 'flex' }}>
          <div className="selectLabelElementWrapper" style={{ width: '35%' }}></div>
          <div className="selectLabelElementWrapper" style={{ width: '30%' }}>  <label htmlFor={name} className="labelTextInput">{label}</label></div>
          <div className="selectLabelElementWrapper" style={{ width: '35%', textAlign: 'center' }}>
            <Link to={"/senior/" + "add-senior-and-back-to-adding-form"}>
              <button title="Dodaj nowego seniora" type="button" className="btn btn-success" style={{ display: 'inline-block', width: '80px', padding: '0px', marginBottom: '3px', textAlign: 'center' }}>
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </Link>
          </div>
        </div>}

      <div className="field" style={{ textAlign: 'center !important' }}>
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={wrapperClass}
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option className={setClass(option.formsl)} key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="errorMessage">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
