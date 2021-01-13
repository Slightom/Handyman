import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const FormList = ({ forms, onDeleteClick }) => {

    function generateDate(s) {
        const date = new Date(s);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {forms.map(form => {
                    return (
                        <tr key={form.id}>
                            <td>{form.lp}</td>
                            <Link to={"/senior/" + form.seniorId}>
                                <td>{form.senior}</td>
                            </Link>
                            <td>{form.address}</td>
                            <td>{form.phone}</td>
                            <td>{form.status}</td>
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
                                {" "}
                                <button
                                    class="btn btn-outline-danger"
                                    onClick={() => onDeleteClick(form)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

FormList.prototypes = {
    forms: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default FormList;