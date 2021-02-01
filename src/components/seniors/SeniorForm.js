import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import { generateDate, isEmpty } from "../common/Helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";
import { Labels } from '../common/myGlobal';
import SeniorHistoryPresentation from "./SeniorHistoryPresentation";

const SeniorForm = ({
    senior,
    onSave,
    onChange,
    goBack,
    saving = false,
    errors = {}
}) => {

    let headerClass = "formHeader";
    let formContainerError = "formContainer";
    if (!isEmpty(errors)) {
        headerClass += " " + "headerError";
        formContainerError += " " + "formContainerError";
    }

    return (
        <>
            <div className={formContainerError}>
                <h2 className={headerClass}>{senior.id ? Labels.EditSeniorH : Labels.AddSeniorH}</h2>
                <div className="formBody">
                    <form onSubmit={onSave}>
                        {errors.onSave && (
                            <div className="alert alert-danger" role="alert">
                                {errors.onSave}
                            </div>
                        )}
                        <TextInput
                            name="firstName"
                            label={Labels.FirstName}
                            value={senior.firstName}
                            onChange={onChange}
                            error={errors.firstName}
                        />

                        <TextInput
                            name="lastName"
                            label={Labels.LastName}
                            value={senior.lastName}
                            onChange={onChange}
                            error={errors.lastName}
                        />

                        <TextInput
                            name="address"
                            label={Labels.Address}
                            value={senior.address}
                            onChange={onChange}
                            error={errors.address}
                        />

                        <TextInput
                            name="phone"
                            label={Labels.Phone}
                            value={senior.phone}
                            onChange={onChange}
                            error={errors.phone}
                        />

                        <div className="formFooter">
                            <div className="formButtonWrapper">
                                <button type="submit" disabled={saving} className="btn btn-primary">{saving ? Labels.Saving : Labels.Save}</button>
                            </div>
                            <div className="formButtonWrapper">
                                <button disabled={saving} className="btn btn-secondary" onClick={goBack}>{Labels.Cancel}</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <SeniorHistoryPresentation senior={senior} />
        </>
    );
};

SeniorForm.propTypes = {
    senior: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default SeniorForm;
