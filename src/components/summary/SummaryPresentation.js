import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "../common/myStyle.css";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery";
import 'moment/locale/pl';
import { Labels } from '../common/myGlobal';

const SummaryPresentation = ({ summaryRows, handymans, onHeaderClick }) => {
    useEffect(() => {
        const newDiv = `<h1 class='tableTitle'>${Labels.Summary}</h1>`;
        debugger;
        $(function () {
            const t = $('#dtDynamicVerticalScrollExample4').DataTable({
                "order": [],
                "scrollY": "60vh",
                "sScrollX": "100%",
                "scrollCollapse": true,
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
                ],
            });
            t.on('search.dt', function () {
                t.column(0, { search: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            $('#dtDynamicVerticalScrollExample4_length').addClass('tableSelectShow');
            $('#dtDynamicVerticalScrollExample4_filter').addClass('tableSearchBar');
            $('select[name ="dtDynamicVerticalScrollExample4_length"]').val(100);
            $('.dataTables_length').addClass('bs-select');
            $("#dtDynamicVerticalScrollExample4_length").after(newDiv);
            $('.dataTables_filter input').attr("placeholder", "Szukaj...");

            $('#thperiodDate').attr('class', 'sorting sorting_asc');
            $('#thforms').attr('class', 'sorting');
            $('#thformsFinished').attr('class', 'sorting');
            $('#thformsWaiting').attr('class', 'sorting');
            $('#thformsRejected').attr('class', 'sorting');
            $('#thhandymans0').attr('class', 'sorting');
            $('#thhandymans1').attr('class', 'sorting');
            $('#thamount').attr('class', 'sorting');
            $('#thamountAvg').attr('class', 'sorting');
        });
    }, [])

    const [thClasses] = useState({
        periodDate: 'sorting sorting_asc',
        forms: 'sorting',
        formsFinished: 'sorting',
        formsWaiting: 'sorting',
        formsRejected: 'sorting',
        handymans0: 'sorting',
        handymans1: 'sorting',
        amount: 'sorting',
        amountAvg: 'sorting'
    });

    const [lastSortedColumn, setLastSortedColumn] = useState("periodDate");

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
        <>
            {
                <div className="tableContainer">
                    <div className="tableBody">
                        <table id="dtDynamicVerticalScrollExample4" className="table table-hover table-bordered myTable" cellSpacing="0"
                            width="100%">
                            <thead>
                                <tr>
                                    <th>Nr</th>
                                    <th id="thperiodDate" onClick={(e) => thClicked(e, 'periodDate')}>{Labels.Period}</th>
                                    <th id="thforms" onClick={(e) => thClicked(e, 'forms')} title="Formularze z datą naprawy z danego miesiąca">{Labels.Forms}</th>
                                    <th id="thformsFinished" onClick={(e) => thClicked(e, 'formsFinished')}>{Labels.Finished}</th>
                                    <th id="thformsWaiting" onClick={(e) => thClicked(e, 'formsWaiting')}>{Labels.Waiting}</th>
                                    <th id="thformsRejected" onClick={(e) => thClicked(e, 'formsRejected')}>{Labels.Rejected}</th>
                                    <th id="thhandymans0" key={0} onClick={(e) => thClicked(e, 'handymans0')} title="Formularze wykonane przez TS w danym miesiącu">Tomasz Suchwalko</th>
                                    <th id="thhandymans1" key={1} onClick={(e) => thClicked(e, 'handymans1')} title="Formularze wykonane przez PK w danym miesiącu">Paweł Kuć</th>
                                    <th id="thamount" onClick={(e) => thClicked(e, 'amount')}>{Labels.Amount}</th>
                                    <th id="thamountAvg" onClick={(e) => thClicked(e, 'amountAvg')}>{Labels.AvgAmount}</th>
                                </tr>
                            </thead>
                            <tbody id="tb" >
                                {summaryRows.map((sr, i) => {
                                    return (
                                        <tr key={sr.key}>
                                            <td>{i + 1}</td>
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
                                            <td>{sr.amount} zł</td>
                                            <td>{sr.amountAvg} zł</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </>
    )
}

SummaryPresentation.prototypes = {
    summaryRows: PropTypes.array.isRequired,
}

export default SummaryPresentation;