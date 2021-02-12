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

const FormList = ({ forms, onDeleteClick, onHeaderClick }) => {

    useEffect(() => {
        const newDiv = `<h1 class='tableTitle'>${Labels.Forms}</h1>`;
        debugger;
        $(function () {
            const t = $('#dtDynamicVerticalScrollExample').DataTable({
                "scrollY": "60vh",
                "scrollCollapse": true,
                "scrollX": "100%",
                "order": [],
                "lengthMenu": [[100, 25, 10, -1], [100, 25, 10, "All"]],
                "language": {
                    "lengthMenu": "Pokaż _MENU_ rekordów",
                    "search": "",
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
                    { orderable: false, targets: 0 },
                    { orderable: false, targets: 1 },
                    { orderable: false, targets: 2 },
                    { orderable: false, targets: 3 },
                    { orderable: false, targets: 4 },
                    { orderable: false, targets: 5 },
                    { orderable: false, targets: 6 },
                    { orderable: false, targets: 7 },
                    { orderable: false, targets: 8 },
                    { orderable: false, targets: 9 },
                    { orderable: false, targets: 10 },

                ]
            });
            t.on('search.dt', function () {
                t.column(0, { search: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            $('#dtDynamicVerticalScrollExample_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample_length"]').val(100);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample_length").after(newDiv);
            $('.dataTables_filter input').attr("placeholder", "Szukaj...");

            $('#thlp').attr('class', 'sorting sorting_desc');
            $('#thsenior').attr('class', 'sorting');
            $('#thaddress').attr('class', 'sorting');
            $('#thphone').attr('class', 'sorting');
            $('#thstatus').attr('class', 'sorting');
            $('#thhandyman').attr('class', 'sorting');
            $('#thregistrationDate').attr('class', 'sorting');
            $('#threpairDate').attr('class', 'sorting');
            $('#thinfo').attr('class', 'sorting');

        });
    }, [])

    const [thClasses] = useState({
        lp: 'sorting sorting_desc',
        senior: 'sorting',
        address: 'sorting',
        phone: 'sorting',
        status: 'sorting',
        handyman: 'sorting',
        registrationDate: 'sorting',
        repairDate: 'sorting',
        info: 'sorting',
    });

    const [lastSortedColumn, setLastSortedColumn] = useState("lp");

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

    function setColor(status) {
        switch (status) {
            case 'Wykonane':
                return "rowFinished";
            case 'Oczekujące':
                //return "rowWaiting";
                break;
            case 'Rezygnacja':
                return "rowRejected";
            default:
        }
    }

    return (
        <div className="tableContainer">
            <div className="tableBody">
                <table id="dtDynamicVerticalScrollExample" className="table table-hover table-bordered myTable" cellSpacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th id="thlp" onClick={(e) => thClicked(e, 'lp')}>{Labels.Lp}</th>
                            <th id="thsenior" onClick={(e) => thClicked(e, 'senior')}>{Labels.Senior}</th>
                            <th id="thaddress" onClick={(e) => thClicked(e, 'address')}>{Labels.Address}</th>
                            <th id="thphone" onClick={(e) => thClicked(e, 'phone')}>{Labels.Phone}</th>
                            <th id="thstatus" onClick={(e) => thClicked(e, 'status')}>{Labels.Status}</th>
                            <th id="thhandyman" onClick={(e) => thClicked(e, 'handyman')}>{Labels.Handyman}</th>
                            <th id="thregistrationDate" onClick={(e) => thClicked(e, 'registrationDate')}>{Labels.Registration}</th>
                            <th id="threpairDate" onClick={(e) => thClicked(e, 'repairDate')}>{Labels.Repair}</th>
                            <th id="thinfo" onClick={(e) => thClicked(e, 'info')} style={{ minWidth: '200px' }}>{Labels.Info}</th>
                            <th style={{ minWidth: '100px' }}>
                                <Link to={"/form"}>
                                    <button
                                        style={{ marginBottom: 0 }}
                                        className="btn btn-primary add-form"
                                    >
                                        {Labels.AddForm}
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        {forms.map((form, i) => {
                            return (
                                <tr key={form.id} className={setColor(form.status)}>
                                    <td>{i + 1}</td>
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
                                                className="btn btn-warning"
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </button>
                                        </Link>
                                        {" "}
                                        <button
                                            className="btn btn-danger"
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