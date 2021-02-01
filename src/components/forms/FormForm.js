import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import DatePickerInput from "../common/DatePickerInput";
import { sortArray, isEmpty, getRelatedFormsAdvanced } from "../common/Helper";
import "../common/myStyle.css";
import { Labels } from '../common/myGlobal';
import SeniorHistoryPresentation from "../seniors/SeniorHistoryPresentation";

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

    let headerClass = "formHeader";
    let formContainerError = "formContainer";
    if (!isEmpty(errors)) {
        headerClass += " " + "headerError";
        formContainerError += " " + "formContainerError";
    }

    function selectedSenior() {
        return form.seniorId && findSenior(form.seniorId).forms.length > 0;
    }

    function findSenior(seniorId) {
        return seniors.find(x => x.id === seniorId);
    }

    return (
        <div className="formAddFormContainer">
            <div className={formContainerError}>
                <h2 className={headerClass}>{form.id ? Labels.EditFormH : Labels.AddFormH}</h2>
                <div className="formBody">
                    <form onSubmit={onSave}>
                        {errors.onSave && (
                            <div className="alert alert-danger" role="alert">
                                {errors.onSave}
                            </div>
                        )}
                        <TextInput
                            name="lp"
                            label={Labels.Lp}
                            value={form.lp}
                            onChange={onChange}
                            error={errors.lp}
                        />

                        <SelectInput
                            name="seniorId"
                            label={Labels.Senior}
                            value={form.seniorId || ""}
                            defaultOption={Labels.SelectSenior}
                            options={sortArray(seniors, 'lastName').map(senior => ({
                                value: senior.id,
                                text: senior.lastName + ' ' + senior.firstName + ', ' + senior.address + ', ' + `Naprawy (${senior.forms.length}/5)`
                            }))}
                            onChange={onChange}
                            error={errors.senior}
                        />

                        <SelectInput
                            name="handymanId"
                            label={Labels.Handyman}
                            value={form.handymanId || ""}
                            defaultOption={Labels.SelectHandyman}
                            options={handymans.map(handyman => ({
                                value: handyman.id,
                                text: handyman.name
                            }))}
                            onChange={onChange}
                            error={errors.handyman}
                        />

                        <SelectInput
                            name="formStatusId"
                            label={Labels.Status}
                            value={form.formStatusId || ""}
                            defaultOption={Labels.SelectStatus}
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
                                    label={Labels.Registration}
                                    value={form.registrationDate === null ? null : new Date(form.registrationDate)}
                                    onChange={onChange}
                                    error={errors.registrationDate}
                                />
                            </div>

                            <div className="datePickerWrapper">
                                <DatePickerInput
                                    name="repairDate"
                                    label={Labels.Repair}
                                    value={form.repairDate === null ? null : new Date(form.repairDate)}
                                    onChange={onChange}
                                    error={errors.repairDate}


                                />
                            </div>
                        </div>

                        <TextInput
                            name="info"
                            label={Labels.Info}
                            value={form.info}
                            onChange={onChange}
                            error={errors.info}
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

            {selectedSenior() &&
                <SeniorHistoryPresentation
                    senior={{
                        ...seniors.find(x => x.id === form.seniorId),
                        forms: getRelatedFormsAdvanced(findSenior(form.seniorId), findSenior(form.seniorId).forms, handymans, formStatuses)
                    }}
                    addingForm
                />}
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
