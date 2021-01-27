import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import { generateDate, isEmpty } from "../common/Helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";

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
                <h2 className={headerClass}>{senior.id ? "Edit" : "Add"} Senior</h2>
                <div className="formBody">
                    <form onSubmit={onSave}>
                        {errors.onSave && (
                            <div className="alert alert-danger" role="alert">
                                {errors.onSave}
                            </div>
                        )}
                        <TextInput
                            name="firstName"
                            label="First Name"
                            value={senior.firstName}
                            onChange={onChange}
                            error={errors.firstName}
                        />

                        <TextInput
                            name="lastName"
                            label="Last Name"
                            value={senior.lastName}
                            onChange={onChange}
                            error={errors.lastName}
                        />

                        <TextInput
                            name="address"
                            label="Address"
                            value={senior.address}
                            onChange={onChange}
                            error={errors.address}
                        />

                        <TextInput
                            name="phone"
                            label="Phone"
                            value={senior.phone}
                            onChange={onChange}
                            error={errors.phone}
                        />

                        <div className="formFooter">
                            <div className="formButtonWrapper">
                                <button type="submit" disabled={saving} className="btn btn-primary">{saving ? "Saving..." : "Save"}</button>
                            </div>
                            <div className="formButtonWrapper">
                                <button disabled={saving} className="btn btn-secondary" onClick={goBack}> Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div className="tableContainer tableContainerTighter">
                {senior.id !== null &&
                    (senior.seniorForms.length === 0
                        ? <h3 className="formHeader">Senior does not have any related forms</h3>
                        :
                        <>
                            <h3 className="formHeader">Senior Forms History</h3>
                            <table className="table-hover table table-bordered myTable myTable2">
                                <thead>
                                    <tr>
                                        <th>Lp</th>
                                        <th>Senior</th>
                                        <th>Status</th>
                                        <th>Handyman</th>
                                        <th>Registration</th>
                                        <th>Repair</th>
                                        <th>Info</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {senior.seniorForms.map(form => {
                                        return (
                                            <tr key={form.id}>
                                                <td>{form.lp}</td>
                                                <td>{form.senior}</td>
                                                <td>{form.formStatus}</td>
                                                <td>{form.handyman}</td>
                                                <td>{generateDate(form.registrationDate)}</td>
                                                <td>{generateDate(form.repairDate)}</td>
                                                <td>{form.info}</td>
                                                <td>
                                                    <Link to={"/form/" + form.id}>
                                                        <button
                                                            class="btn btn-outline-warning"
                                                        >
                                                            <FontAwesomeIcon icon={faPencilAlt} />
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>)
                }
            </div>
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
