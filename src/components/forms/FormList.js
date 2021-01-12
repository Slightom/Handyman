import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

const FormList = ({ forms }) => {

    function generateDate(s) {
        const date = new Date(s);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Lp</th>
                    <th>Senior</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Handyman</th>
                    <th>Registration</th>
                    <th>Repair</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                {forms.map(form => {
                    return (
                        <tr key={form.id}>
                            <td>{form.lp}</td>
                            <td>{form.senior}</td>
                            <td>{form.address}</td>
                            <td>{form.phone}</td>
                            <td>{form.status}</td>
                            <td>{form.handyman}</td>
                            <td>{generateDate(form.registrationDate)}</td>
                            <td>{generateDate(form.repairDate)}</td>
                            <td>{form.info}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

FormList.prototypes = {
    forms: PropTypes.array.isRequired
}

export default FormList;