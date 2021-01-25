import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";

const SummaryPresentation = ({ summaryRows, onHeaderClick }) => {

    return (
        <>
            {summaryRows.length > 0 &&
                <div className="tableContainer">
                    <h3 className="formHeader">Summary</h3>
                    <table className="table table-hover table-bordered myTable">
                        <thead>
                            <tr>
                                <th onClick={(e) => onHeaderClick(e, 'periodDate')}>Period</th>
                                <th onClick={(e) => onHeaderClick(e, 'forms')}>Forms</th>
                                <th onClick={(e) => onHeaderClick(e, 'formsFinished')}>Finished</th>
                                <th onClick={(e) => onHeaderClick(e, 'formsWaiting')}>Waiting</th>
                                <th onClick={(e) => onHeaderClick(e, 'formsRejected')}>Rejected</th>
                                {summaryRows[0].handymans.map((h, i) => {
                                    return (
                                        <th onClick={(e) => onHeaderClick(e, 'handymans' + i)}>{h.name}</th>
                                    )
                                })}
                                <th onClick={(e) => onHeaderClick(e, 'billsAmount')}>Amount</th>
                                <th onClick={(e) => onHeaderClick(e, 'billsAmountAvg')}>Avg amount/form</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryRows.map(sr => {
                                return (
                                    <tr key={sr.key}>
                                        <td>{sr.period}</td>
                                        <td>{sr.forms}</td>
                                        <td>{sr.formsFinished}</td>
                                        <td>{sr.formsWaiting}</td>
                                        <td>{sr.formsRejected}</td>
                                        {sr.handymans.map(h => {
                                            return (
                                                <td>{h.forms}</td>
                                            )
                                        })}
                                        <td>{sr.billsAmount} zł</td>
                                        <td>{sr.billsAmountAvg} zł</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>}
        </>
    )
}

SummaryPresentation.prototypes = {
    summaryRows: PropTypes.array.isRequired,
}

export default SummaryPresentation;