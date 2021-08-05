import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../common/myStyle.css";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery";
import Spinner from "../common/Spinner";
import { Labels } from '../common/myGlobal';


const SeniorList = ({ seniors, onDeleteClick, onHeaderClick }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const newDiv = `<h1 class='tableTitle'>${Labels.Seniors}</h1>`;
        debugger;
        $(function () {
            const t = $('#dtDynamicVerticalScrollExample2').DataTable({
                "scrollY": "60vh",
                "sScrollX": "100%",
                "order": [],
                "scrollCollapse": true,
                "lengthMenu": [[-1, 100, 25, 10,], ["All", 100, 25, 10]],
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
                ],
            });

            t.on('search.dt', function () {
                t.column(0, { search: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            $('#dtDynamicVerticalScrollExample2_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample2_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample2_length"]').val(-1);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample2_length").after(newDiv);
            $('.dataTables_filter input').attr("placeholder", "Szukaj...");

            $('#thlastName').attr('class', 'sorting sorting_asc');
            $('#thfirstName').attr('class', 'sorting');
            $('#thaddress').attr('class', 'sorting');
            $('#thphone').attr('class', 'sorting');
            $('#thforms').attr('class', 'sorting');
            $('#thformsFinished').attr('class', 'sorting');
            $('#thformsWaiting').attr('class', 'sorting');
            $('#thformsRejected').attr('class', 'sorting');

        });
        setLoading(false);
    }, [])

    const [thClasses] = useState({
        lastName: 'sorting sorting_asc',
        firstName: 'sorting',
        address: 'sorting',
        phone: 'sorting',
        forms: 'sorting',
        formsFinished: 'sorting',
        formsWaiting: 'sorting',
        formsRejected: 'sorting',
    });

    const [lastSortedColumn, setLastSortedColumn] = useState("lastName");

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

    function setColor(formsl) {
        debugger;
        switch (formsl.toString()) {
            case '1':
                return "senior1form";
            case '2':
                return "senior2form";
            case '3':
                return "senior3form";
            case '4':
                return "senior4form";
            case '5':
                return "senior5form";
            default:
        }
    }

    return (
        <>
            {loading
                ? <Spinner />
                : <div id="tc" className="tableContainer">
                    <div className="tableBody">
                        <table id="dtDynamicVerticalScrollExample2" className="table table-hover table-bordered myTable" cellSpacing="0"
                            width="100%">
                            <thead>
                                <tr>
                                    <th>Nr</th>
                                    <th id="thlastName" onClick={(e) => thClicked(e, 'lastName')}>{Labels.LastName}</th>
                                    <th id="thfirstName" onClick={(e) => thClicked(e, 'firstName')}>{Labels.FirstName}</th>
                                    <th id="thaddress" onClick={(e) => thClicked(e, 'address')}>{Labels.Address}</th>
                                    <th id="thphone" onClick={(e) => thClicked(e, 'phone')}>{Labels.Phone}</th>
                                    <th id="thforms" onClick={(e) => thClicked(e, 'forms')}>{Labels.Forms}</th>
                                    <th id="thformsFinished" onClick={(e) => thClicked(e, 'formsFinished')}>{Labels.Finished}</th>
                                    <th id="thformsWaiting" onClick={(e) => thClicked(e, 'formsWaiting')}>{Labels.Waiting}</th>
                                    <th id="thformsRejected" onClick={(e) => thClicked(e, 'formsRejected')}>{Labels.Rejected}</th>
                                    <th>
                                        <Link to={"/senior"}>
                                            <button
                                                style={{ margin: 0, padding: 8 }}
                                                className="btn btn-primary add-form"
                                            >
                                                {Labels.AddSenior}
                                            </button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="tb" >
                                {!loading && seniors.map((senior, i) => {
                                    return (
                                        <tr key={senior.id} className={setColor(senior.forms)}>
                                            <td>{i + 1}</td>
                                            <td>{senior.lastName}</td>
                                            <td>{senior.firstName}</td>
                                            <td>{senior.address}</td>
                                            <td>{senior.phone}</td>
                                            <td>{senior.forms}</td>
                                            <td>{senior.formsFinished}</td>
                                            <td>{senior.formsWaiting}</td>
                                            <td>{senior.formsRejected}</td>
                                            <td>
                                                <Link to={"/senior/" + senior.id}>
                                                    <button
                                                        className="btn btn-warning"
                                                    >
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </button>
                                                </Link>
                                                {" "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => onDeleteClick(senior)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </>
    )
}

SeniorList.prototypes = {
    seniors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default SeniorList;