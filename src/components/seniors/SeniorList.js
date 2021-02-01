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
import Spinner from "../common/Spinner";
import { Labels } from '../common/myGlobal';


const SeniorList = ({ seniors, onDeleteClick, onHeaderClick }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const newDiv = `<h1 class='tableTitle'>${Labels.Seniors}</h1>`;
        debugger;
        $(function () {
            $('#dtDynamicVerticalScrollExample2').DataTable({
                "scrollY": "60vh",
                "scrollCollapse": true,
                "order": [[1, "asc"]],
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
                    { "orderSequence": ["desc", "asc"], "targets": [4] },
                    { "orderSequence": ["desc", "asc"], "targets": [5] },
                    { "orderSequence": ["desc", "asc"], "targets": [6] },
                    { "orderSequence": ["desc", "asc"], "targets": [7] },
                ]
            });
            $('#dtDynamicVerticalScrollExample2_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample2_filter').addClass('tableSearchBar');
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample2_length").after(newDiv);


        });
        setLoading(false);
    }, [])


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
                                    <th>{Labels.FirstName}</th>
                                    <th>{Labels.LastName}</th>
                                    <th>{Labels.Address}</th>
                                    <th>{Labels.Phone}</th>
                                    <th>{Labels.Forms}</th>
                                    <th>{Labels.Finished}</th>
                                    <th>{Labels.Waiting}</th>
                                    <th>{Labels.Rejected}</th>
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
                                {!loading && seniors.map(senior => {
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