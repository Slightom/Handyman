import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { generateDate } from "../common/Helper";
import "../common/myStyle.css";

const FormList = ({ forms, onDeleteClick, onHeaderClick }) => {

    function check() {
        return forms.length > 0;
    }
    return (
        (check() &&
            <table className="table-hover table table-bordered myTable">
                <thead>
                    <tr>
                        <th onClick={(e) => onHeaderClick(e, 'lp')}>Lp</th>
                        <th onClick={(e) => onHeaderClick(e, 'senior')}>Senior</th>
                        <th onClick={(e) => onHeaderClick(e, 'address')}>Address</th>
                        <th onClick={(e) => onHeaderClick(e, 'phone')}>Phone</th>
                        <th onClick={(e) => onHeaderClick(e, 'status')}>Status</th>
                        <th onClick={(e) => onHeaderClick(e, 'handyman')}>Handyman</th>
                        <th onClick={(e) => onHeaderClick(e, 'registrationDate')}>Registration</th>
                        <th onClick={(e) => onHeaderClick(e, 'repairDate')}>Repair</th>
                        <th onClick={(e) => onHeaderClick(e, 'info')}>Info</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map(form => {
                        return (
                            <tr key={form.id}>
                                <td>{form.lp}</td>

                                <td><Link to={"/senior/" + form.seniorId}>{form.senior}</Link></td>

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
                                            className="btn btn-outline-warning"
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                    </Link>
                                    {" "}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDeleteClick(form)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>)
    )
}

FormList.prototypes = {
    forms: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default FormList;