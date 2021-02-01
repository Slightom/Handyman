import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import "../common/myStyle.css";
import { isEmpty } from "../common/Helper";
import DatePickerInput from "../common/DatePickerInput";
import { Labels } from '../common/myGlobal';

const BillForm = ({
    bill,
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

        <div className={formContainerError}>
            <h2 className={headerClass}>{bill.id ? Labels.EditBillH : Labels.AddBillH}</h2>
            <div className="formBody">
                <form onSubmit={onSave}>
                    {errors.onSave && (
                        <div className="alert alert-danger" role="alert">
                            {errors.onSave}
                        </div>
                    )}

                    <TextInput
                        name="name"
                        label={Labels.Name}
                        value={bill.name}
                        onChange={onChange}
                        error={errors.name}
                    />

                    <TextInput
                        name="amount"
                        label={Labels.Amount}
                        value={bill.amount}
                        onChange={onChange}
                        error={errors.amount}
                    />

                    <DatePickerInput
                        name="date"
                        label={Labels.Date}
                        value={bill.date === null ? null : new Date(bill.date)}
                        onChange={onChange}
                        error={errors.date}
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
