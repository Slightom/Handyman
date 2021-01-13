import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const SeniorList = ({ seniors, onDeleteClick }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Forms</th>
                    <th>Finished</th>
                    <th>Waiting</th>
                    <th>Rejected</th>
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
                                        class="btn btn-outline-warning"
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                </Link>
                                {" "}
                                <button
                                    class="btn btn-outline-danger"
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