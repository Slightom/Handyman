import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import { generateDate } from "../common/Helper";
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

    return (
        <>
            <form onSubmit={onSave} style={{ marginBottom: 20 }}>
                <h2>{senior.id ? "Edit" : "Add"} Senior</h2>
                {errors.onSave && (
                    <div className="alert alert-danger" role="alert">
                        {errors.onSave}
                    </div>
                )}
                <TextInput
                    name="firstName"
                    label="First Name"
                    placeholder="Janina"
                    value={senior.firstName}
                    onChange={onChange}
                    error={errors.firstName}
                />

                <TextInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Kowalska"
                    value={senior.lastName}
                    onChange={onChange}
                    error={errors.lastName}
                />

                <TextInput
                    name="address"
                    label="Address"
                    placeholder="Porzeczkowa 12/5"
                    value={senior.address}
                    onChange={onChange}
                    error={errors.address}
                />

                <TextInput
                    name="phone"
                    label="Phone"
                    placeholder="555 666 555"
                    value={senior.phone}
                    onChange={onChange}
                    error={errors.phone}
                />

                <button type="submit" disabled={saving} className="btn btn-primary">
                    {saving ? "Saving..." : "Save"}
                </button>
                {" "}
                <button disabled={saving} className="btn btn-secondary" onClick={goBack}>
                    Cancel
                </button>

            </form>
            {senior.id !== null &&
                (senior.seniorForms.length === 0
                    ? <h3>Senior does not have any related forms</h3>
                    :
                    <>
                        <h3>Senior Forms History</h3>
                        <table className="table-hover table table-bordered myTable2">
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
