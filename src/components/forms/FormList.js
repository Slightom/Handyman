import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { generateDate } from "../common/Helper";
import "../common/myStyle.css";
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery";
import Moment from 'react-moment';
import 'moment/locale/pl';

const FormList = ({ forms, onDeleteClick, onHeaderClick }) => {

    useEffect(() => {
        const newDiv = "<h1 class='tableTitle'>Forms</h1>";
        debugger;
        $(function () {
            $('#dtDynamicVerticalScrollExample').DataTable({
                "scrollY": "60vh",
                "scrollCollapse": true,
                "order": [[6, "desc"]],
                "lengthMenu": [[100, 25, 10, -1], [100, 25, 10, "All"]],
                // "column": [[6, { 'type': 'date' }]
                "columnDefs": [
                    { type: 'date-dd-mmm-yyyy', targets: 6 },
                    { type: 'date-dd-mmm-yyyy', targets: 7 },
                    { targets: 9, orderable: 'false' }
                ]
            });
            $('#dtDynamicVerticalScrollExample_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample_length"]').val(100);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample_length").after(newDiv);


        });
    }, [])

    return (
        <div className="tableContainer">
            <div className="tableBody">
                <table id="dtDynamicVerticalScrollExample" className="table table-hover table-bordered myTable" cellspacing="0"
                    width="100%">
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
                            <th style={{ minWidth: '200px' }}>Info</th>
                            <th style={{ minWidth: '100px' }}>
                                <Link to={"/form"}>
                                    <button
                                        style={{ marginBottom: 0 }}
                                        className="btn btn-primary add-form"
                                    >
                                        Add Form
                                </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {forms.map(form => {
                            return (
                                <tr key={form.id}>
                                    <td >{form.lp}</td>

                                    <td ><Link to={"/senior/" + form.seniorId}>{form.senior}</Link></td>

                                    <td >{form.address}</td>
                                    <td >{form.phone}</td>
                                    <td >{form.status}</td>
                                    <td >{form.handyman}</td>
                                    <td ><Moment format="D MMM YYYY">{form.registrationDate}</Moment></td>
                                    <td ><Moment format="D MMM YYYY">{form.repairDate}</Moment></td>
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
                </table>
            </div>

        </div>

    )
}

FormList.prototypes = {
    forms: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default FormList;