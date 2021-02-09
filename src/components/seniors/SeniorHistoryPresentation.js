import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Labels } from '../common/myGlobal';
import { generateDate } from '../common/Helper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

SeniorHistoryPresentation.propTypes = {

};

function SeniorHistoryPresentation({ senior, ...props }) {

    let classesNames = "tableContainer tableContainerTighter";
    let tableClasses = "table-hover table table-bordered myTable myTable2";
    if (props.addingForm) {
        classesNames += ' seniorFormsHistoryCompact';
        tableClasses += ' seniorFormsHistoryCompactTable'
    }

    function helperCheck(s) {
        debugger;
        return s.forms == null || s.forms.length === 0;
    }

    return (
        <div className={classesNames}>
            {senior.id != null &&
                (helperCheck(senior)
                    ? <h3 className="formHeader">{Labels.SeniorDoesntHaveForms}</h3>
                    :
                    <>
                        <h3 className="formHeader">{Labels.SeniorHistoryForms}</h3>
                        <table className={tableClasses}>
                            <thead>
                                <tr>
                                    <th>{Labels.Lp}</th>
                                    <th>{Labels.Senior}</th>
                                    <th>{Labels.Status}</th>
                                    <th>{Labels.Handyman}</th>
                                    <th>{Labels.Registration}</th>
                                    <th>{Labels.Repair}</th>
                                    <th>{Labels.Info}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {senior.forms.map(form => {
                                    return (
                                        <tr key={form.id}>
                                            <td>{form.lp}</td>
                                            <td>{form.senior}</td>
                                            <td>{form.formStatus}</td>
                                            <td>{form.handyman}</td>
                                            <td>{generateDate(form.registrationDate)}</td>
                                            <td>{generateDate(form.repairDate)}</td>
                                            <td>{form.info}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>)
            }
        </div>
    );
}

export default SeniorHistoryPresentation;



// <div className="tableContainer tableContainerTighter">
//             {senior.id !== null &&
//                 (senior.forms.length === 0
//                     ? <h3 className="formHeader">Senior does not have any related forms</h3>
//                     :
//                     <>
//                         <h3 className="formHeader">Senior Forms History</h3>
//                         <table className="table-hover table table-bordered myTable myTable2">
//                             <thead>
//                                 <tr>
//                                     <th>{Labels.Lp}</th>
//                                     <th>{Labels.Senior}</th>
//                                     <th>{Labels.Status}</th>
//                                     <th>{Labels.Handyman}</th>
//                                     <th>{Labels.Registration}</th>
//                                     <th>{Labels.Repair}</th>
//                                     <th>{Labels.Info}</th>
//                                     <th>&nbsp;</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {senior.forms.map(form => {
//                                     return (
//                                         <tr key={form.id}>
//                                             <td>{form.lp}</td>
//                                             <td>{form.senior}</td>
//                                             <td>{form.formStatus}</td>
//                                             <td>{form.handyman}</td>
//                                             <td>{generateDate(form.registrationDate)}</td>
//                                             <td>{generateDate(form.repairDate)}</td>
//                                             <td>{form.info}</td>
//                                             <td>
//                                                 <Link to={"/form/" + form.id}>
//                                                     <button
//                                                         class="btn btn-outline-warning"
//                                                     >
//                                                         <FontAwesomeIcon icon={faPencilAlt} />
//                                                     </button>
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </>)
//             }
//         </div>