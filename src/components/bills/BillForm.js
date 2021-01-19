import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";
import DatePickerInput from "../common/DatePickerInput";

const BillForm = ({
    bill,
    onSave,
    onChange,
    goBack,
    saving = false,
    errors = {}
}) => {

    return (

        <form onSubmit={onSave} style={{ marginBottom: 20 }}>
            <h2>{bill.id ? "Edit" : "Add"} Bill</h2>
            {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                </div>
            )}
            <TextInput
                name="name"
                label="Name"
                placeholder="Benmar..."
                value={bill.name}
                onChange={onChange}
                error={errors.name}
            />

            <TextInput
                name="amount"
                label="Amount"
                placeholder="50..."
                value={bill.amount}
                onChange={onChange}
                error={errors.amount}
            />

            <DatePickerInput
                name="date"
                label="Date"
                value={bill.date === null ? null : new Date(bill.date)}
                onChange={onChange}
                error={errors.date}
            />

            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
            {" "}
            <button disabled={saving} className="btn btn-secondary" onClick={goBack}>
                Cancel
                </button>

        </form>
    );
};

BillForm.propTypes = {
    bill: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default BillForm;
