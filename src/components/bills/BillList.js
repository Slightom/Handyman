import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import "../common/myStyle.css";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Moment from 'react-moment';
import 'moment/locale/pl';
import { MyNewTitle, TableCellStyle } from "../common/Helper";
import MaterialTable from "material-table";

const BillList = ({ bills, onDeleteClick, onHeaderClick }) => {
    const [filter, setFilter] = useState(false);
    const history = useHistory();

    const columns = [
        {
            title: "Nazwa",
            field: "name",
            cellStyle: TableCellStyle
        },
        {
            title: "Kwota",
            field: "amount",
            render: rowData => <span>{rowData.amount} zł</span>,
            cellStyle: TableCellStyle
        },
        {
            title: "Data",
            field: "date",
            render: rowData => <Moment format="D-MM-YY">{rowData.date}</Moment>,
            cellStyle: TableCellStyle
        }
    ];

    const actions = [
        {
            icon: 'edit',
            iconProps: { style: { color: '#feac10' } },
            tooltip: 'Edytuj formularz',
            onClick: (event, rowData) => history.push("/bill/" + rowData.id)
        },
        {
            icon: 'delete',
            iconProps: { style: { color: 'red' } },
            tooltip: 'Usuń Formularz',
            onClick: (event, rowData) => onDeleteClick(rowData)
        },
        {
            icon: 'filter',
            tooltip: 'Pokaż/ukryj filtry',
            isFreeAction: true,
            onClick: (event) => { setFilter(!filter); }
        },
        {
            icon: 'add',
            tooltip: 'Dodaj Fakturę',
            iconProps: { style: { color: 'blue', backgroundColor: '#deded5' } },
            isFreeAction: true,
            onClick: (event) => history.push("/bill")
        }
    ];

    const localization = {
        header: {
            actions: 'Akcje'
        },
        pagination: {
            labelRowsSelect: 'wierszy'
        }
    };

    const options =
    {
        actionsColumnIndex: -1,
        search: true,
        paging: true,
        pageSize: 100,
        pageSizeOptions: [10, 50, 100],
        sorting: true,
        maxBodyHeight: "600px",
        filtering: filter,
        headerStyle: {
            backgroundColor: '#bfbfbf',
            fontWeight: 'bold',
            borderRight: '2px solid #e5e5e5'
        },
        rowStyle: (rowData) => {
            return {
                border: '2px solid #e5e5e5'
            }
        }
    };

    return (
        <div style={{ maxWidth: "1000px", margin: 'auto' }}>
            <MaterialTable
                title={<MyNewTitle text="Faktury" />}
                data={bills}
                columns={columns}
                options={options}
                actions={actions}
                localization={localization} />
        </div>
    )
}

BillList.prototypes = {
    bills: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onHeaderClick: PropTypes.func.isRequired
}

export default BillList;