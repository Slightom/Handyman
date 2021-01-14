import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";

const SeniorList = ({ seniors, onDeleteClick, onHeaderClick }) => {

    return (
        <table className="table table-hover table-bordered myTable">
            <thead>
                <tr>
                    <th onClick={(e) => onHeaderClick(e, 'firstName')}>First Name</th>
                    <th onClick={(e) => onHeaderClick(e, 'lastName')}>Last Name</th>
                    <th onClick={(e) => onHeaderClick(e, 'address')}>Address</th>
                    <th onClick={(e) => onHeaderClick(e, 'phone')}>Phone</th>
                    <th onClick={(e) => onHeaderClick(e, 'forms')}>Forms</th>
                    <th onClick={(e) => onHeaderClick(e, 'formsFinished')}>Finished</th>
                    <th onClick={(e) => onHeaderClick(e, 'formsWaiting')}>Waiting</th>
                    <th onClick={(e) => onHeaderClick(e, 'formsRejected')}>Rejected</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {seniors.map(senior => {
                    return (
                        <tr key={senior.id}>
                            <td>{senior.firstName}</td>
                            <td>{senior.lastName}</td>
                            <td>{senior.address}</td>
                            <td>{senior.phone}</td>
                            <td>{senior.forms}</td>
                            <td>{senior.formsFinished}</td>
                            <td>{senior.formsWaiting}</td>
                            <td>{senior.formsRejected}</td>
                            <td>
                                <Link to={"/senior/" + senior.id}>
                                    <button
                                        className="btn btn-outline-warning"
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                </Link>
                                {" "}
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteClick(senior)}
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

SeniorList.prototypes = {
    seniors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default SeniorList;