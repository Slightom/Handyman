import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";
import { generateDate } from "../common/Helper";

const BillList = ({ bills, onDeleteClick, onHeaderClick }) => {

    return (
        <div className="tableContainer">
            <h3 className="formHeader">Bills</h3>
            <table className="table table-hover table-bordered myTable">
                <thead>
                    <tr>
                        <th onClick={(e) => onHeaderClick(e, 'name')}>Name</th>
                        <th onClick={(e) => onHeaderClick(e, 'amount')}>Amount</th>
                        <th onClick={(e) => onHeaderClick(e, 'date')}>Date</th>
                        <th>
                            <Link to={"/bill"}>
                                <button
                                    style={{ marginBottom: 0 }}
                                    className="btn btn-primary add-form"
                                >
                                    Add Bill
                            </button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map(bill => {
                        return (
                            <tr key={bill.id}>
                                <td>{bill.name}</td>
                                <td>{bill.amount} zł</td>
                                <td>{generateDate(bill.date)}</td>
                                <td>
                                    <Link to={"/bill/" + bill.id}>
                                        <button
                                            className="btn btn-outline-warning"
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                    </Link>
                                    {" "}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDeleteClick(bill)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

BillList.prototypes = {
    bills: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onHeaderClick: PropTypes.func.isRequired
}

export default BillList;