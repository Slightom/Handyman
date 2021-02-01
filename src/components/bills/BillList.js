import React, { useEffect, useState } from "react";
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
            const t = $('#dtDynamicVerticalScrollExample3').DataTable({
                "scrollY": "60vh",
                "order": [],
                "scrollCollapse": true,
                "lengthMenu": [[100, 25, 10, -1], [100, 25, 10, "All"]],
                "language": {
                    "lengthMenu": "Pokaż _MENU_ rekordów",
                    "search": "",
                    "zeroRecords": "Nie znaleziono rekordów",
                    "info": "Wyświetla _START_-_END_ z _TOTAL_",
                    "infoEmpty": "Nie ma rekordów",
                    "paginate": {
                        "previous": "<<",
                        "next": ">>"
                    }
                },
                "columnDefs": [
                    {
                        "searchable": false,
                        "orderable": false,
                        "targets": 0
                    },
                    { orderable: false, targets: 0 },
                    { orderable: false, targets: 1 },
                    { orderable: false, targets: 2 },
                    { orderable: false, targets: 3 },
                    { orderable: false, targets: 4 },
                ]
            });
            t.on('search.dt', function () {
                t.column(0, { search: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            $('#dtDynamicVerticalScrollExample3_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample3_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample3_length"]').val(100);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample3_length").after(newDiv);
            $('.dataTables_filter input').attr("placeholder", "Szukaj...");

            $('#thname').attr('class', 'sorting');
            $('#thamount').attr('class', 'sorting');
            $('#thdate').attr('class', 'sorting sorting_desc');

        });
    }, [])

    const [thClasses] = useState({
        name: 'sorting',
        amount: 'sorting',
        date: 'sorting sorting_desc',
    });

    const [lastSortedColumn, setLastSortedColumn] = useState("date");

    function thClicked(e, col) {
        onHeaderClick(e, col);
        const actualClass = thClasses[col];
        // eslint-disable-next-line default-case
        switch (actualClass) {
            case 'sorting sorting_desc':
                thClasses[col] = 'sorting sorting_asc';
                $('#th' + col).attr('class', 'sorting sorting_asc');
                break;
            default:
                thClasses[col] = 'sorting sorting_desc';
                $('#th' + col).attr('class', 'sorting sorting_desc');
                break;
        }

        debugger;
        if (lastSortedColumn !== "" && lastSortedColumn !== col) {
            thClasses[lastSortedColumn] = 'sorting';
            $('#th' + lastSortedColumn).attr('class', 'sorting');
        }

        setLastSortedColumn(col);
    }

    return (
        <div className="tableContainer" style={{ width: '60%' }}>
            <div className="tableBody">
                <table id="dtDynamicVerticalScrollExample3" className="table table-hover table-bordered myTable" cellSpacing="0"
                    width="100%" >
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th id="thname" onClick={(e) => thClicked(e, 'name')}>{Labels.Name}</th>
                            <th id="thamount" onClick={(e) => thClicked(e, 'amount')}>{Labels.Amount}</th>
                            <th id="thdate" onClick={(e) => thClicked(e, 'date')}>{Labels.Date}</th>
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
                        {bills.map((bill, i) => {
                            return (
                                <tr key={bill.id}>
                                    <td>{i + 1}</td>
                                    <td id="thname">{bill.name}</td>
                                    <td id="thamount">{bill.amount} zł</td>
                                    <td id="thdate"><Moment format="D MMM YYYY">{bill.date}</Moment></td>
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