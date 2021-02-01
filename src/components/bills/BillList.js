import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery";
import Moment from 'react-moment';
import 'moment/locale/pl';
import { Labels } from '../common/myGlobal';

const BillList = ({ bills, onDeleteClick, onHeaderClick }) => {
    useEffect(() => {
        const newDiv = `<h1 class='tableTitle'>${Labels.Bills}</h1>`;
        $(function () {
            $('#dtDynamicVerticalScrollExample3').DataTable({
                "scrollY": "60vh",
                "scrollCollapse": true,
                "order": [[2, "desc"]],
                "lengthMenu": [[100, 25, 10, -1], [100, 25, 10, "All"]],
                "language": {
                    "lengthMenu": "Pokaż _MENU_ rekordów",
                    "search": "Szukaj:",
                    "zeroRecords": "Nie znaleziono rekordów",
                    "info": "Wyświetla _START_-_END_ z _TOTAL_",
                    "infoEmpty": "Nie ma rekordów",
                    //"infoFiltered": "(filtered from _MAX_ total records)",
                    "paginate": {
                        "previous": "<<",
                        "next": ">>"
                    }
                },
                "columnDefs": [
                    { "orderSequence": ["desc", "asc"], "targets": [1] },
                    { "orderSequence": ["desc", "asc"], "targets": [2] },
                    { type: 'date-dd-mmm-yyyy', targets: 2 },
                    { targets: 3, orderable: 'false' }
                ]
            });
            $('#dtDynamicVerticalScrollExample3_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample3_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample3_length"]').val(100);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample3_length").after(newDiv);

        });
    }, [])

    return (
        <div className="tableContainer">
            <div className="tableBody">
                <table id="dtDynamicVerticalScrollExample3" className="table table-hover table-bordered myTable" cellSpacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th>{Labels.Name}</th>
                            <th>{Labels.Amount}</th>
                            <th>{Labels.Date}</th>
                            <th>
                                <Link to={"/bill"}>
                                    <button
                                        style={{ marginBottom: 0 }}
                                        className="btn btn-primary add-form"
                                    >
                                        {Labels.AddBill}
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tb" >
                        {bills.map(bill => {
                            return (
                                <tr key={bill.id}>
                                    <td>{bill.name}</td>
                                    <td>{bill.amount} zł</td>
                                    <td ><Moment format="D MMM YYYY">{bill.date}</Moment></td>
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
        </div>
    )
}

BillList.prototypes = {
    bills: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onHeaderClick: PropTypes.func.isRequired
}

export default BillList;