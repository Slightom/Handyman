import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import NumberInput from "../common/NumberInput";
import SelectInput from "../common/SelectInput";
import DatePickerInput from "../common/DatePickerInput";
import DatePicker from "react-datepicker";

const FormForm = ({
    form,
    seniors,
    handymans,
    formStatuses,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form onSubmit={onSave}>
            <h2>{form.id ? "Edit" : "Add"} Form</h2>
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
                options={seniors.map(senior => ({
                    value: senior.id,
                    text: senior.shortcut
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

            <DatePickerInput
                name="registrationDate"
                label="Registration"
                value={form.registrationDate === null ? null : new Date(form.registrationDate)}
                onChange={onChange}
                error={errors.registrationDate}
            />

            <DatePickerInput
                name="repairDate"
                label="Repair"
                value={form.repairDate === null ? null : new Date(form.repairDate)}
                onChange={onChange}
                error={errors.repairDate}
            />

            <TextInput
                name="info"
                label="Info"
                value={form.info}
                onChange={onChange}
                error={errors.info}
            />

            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

// FormForm.propTypes = {
//   authors: PropTypes.array.isRequired,
//   course: PropTypes.object.isRequired,
//   errors: PropTypes.object,
//   onSave: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   saving: PropTypes.bool
// };

export default FormForm;
