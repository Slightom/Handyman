import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import DatePickerInput from "../common/DatePickerInput";
import { sortArray } from "../common/Helper";
import "../common/myStyle.css";

const FormForm = ({
    form,
    seniors,
    handymans,
    formStatuses,
    onSave,
    onChange,
    goBack,
    saving = false,
    errors = {}
}) => {
    return (
        <div className="formContainer">
            <h2 className="formHeader">{form.id ? "Edit" : "Add"} Form</h2>
            <div className="formBody">
                <form onSubmit={onSave}>
                    {errors.onSave && (
                        <div className="alert alert-danger" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                    <TextInput
                        name="lp"
                        label="Lp"
                        value={form.lp}
                        onChange={onChange}
                        error={errors.lp}
                    />

                    <SelectInput
                        name="seniorId"
                        label="Senior"
                        value={form.seniorId || ""}
                        defaultOption="Select Senior"
                        options={sortArray(seniors, 'lastName').map(senior => ({
                            value: senior.id,
                            text: senior.lastName + ' ' + senior.firstName + ', ' + senior.address
                        }))}
                        onChange={onChange}
                        error={errors.senior}
                    />

                    <SelectInput
                        name="handymanId"
                        label="Handyman"
                        value={form.handymanId || ""}
                        defaultOption="Select Handyman"
                        options={handymans.map(handyman => ({
                            value: handyman.id,
                            text: handyman.name
                        }))}
                        onChange={onChange}
                        error={errors.handyman}
                    />

                    <SelectInput
                        name="formStatusId"
                        label="Form Status"
                        value={form.formStatusId || ""}
                        defaultOption="Select Form Status"
                        options={formStatuses.map(formStatus => ({
                            value: formStatus.id,
                            text: formStatus.name
                        }))}
                        onChange={onChange}
                        error={errors.formStatus}
                    />

                    <div className="formPickersContainer">
                        <div className="datePickerWrapper">
                            <DatePickerInput
                                name="registrationDate"
                                label="Registration"
                                value={form.registrationDate === null ? null : new Date(form.registrationDate)}
                                onChange={onChange}
                                error={errors.registrationDate}
                            />
                        </div>

                        <div className="datePickerWrapper">
                            <DatePickerInput
                                name="repairDate"
                                label="Repair"
                                value={form.repairDate === null ? null : new Date(form.repairDate)}
                                onChange={onChange}
                                error={errors.repairDate}


                            />
                        </div>
                    </div>

                    <TextInput
                        name="info"
                        label="Info"
                        value={form.info}
                        onChange={onChange}
                        error={errors.info}
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

FormForm.propTypes = {
    form: PropTypes.object.isRequired,
    seniors: PropTypes.array.isRequired,
    handymans: PropTypes.array.isRequired,
    formStatuses: PropTypes.array.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default FormForm;
