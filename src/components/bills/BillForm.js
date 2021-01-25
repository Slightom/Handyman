import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
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

        <div className="formContainer">
            <h2 className="formHeader">{bill.id ? "Edit" : "Add"} Bill</h2>
            <div className="formBody">
                <form onSubmit={onSave}>
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

                    <div className="formFooter">
                        <div className="formButtonWrapper">
                            <button type="submit" disabled={saving} className="btn btn-primary">{saving ? "Saving..." : "Save"}</button>
                        </div>
                        <div className="formButtonWrapper">
                            <button disabled={saving} className="btn btn-secondary" onClick={goBack}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

BillForm.propTypes = {
    bill: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default BillForm;
