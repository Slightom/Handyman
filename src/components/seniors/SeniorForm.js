import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";

const SeniorForm = ({
    senior,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form onSubmit={onSave}>
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
            <Link to="/seniors">
                <button disabled={saving} className="btn btn-secondary">
                    Cancel
                </button>
            </Link>
        </form>
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
