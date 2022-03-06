import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import "../common/myStyle.css";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import MaterialTable from "material-table";
import { MyNewTitle, TableCellStyle } from "../common/Helper";


const SeniorList = ({ seniors, onDeleteClick }) => {
    const [filter, setFilter] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const x = seniors;
        debugger;
    })

    const columns = [
        {
            title: "Nazwisko",
            field: "lastName",
            cellStyle: TableCellStyle
        },
        {
            title: "Imię",
            field: "firstName",
            cellStyle: TableCellStyle
        },
        {
            title: "Adres",
            field: "address",
            cellStyle: TableCellStyle
        },
        {
            title: "Telefon",
            field: "phone",
            cellStyle: TableCellStyle
        },
        {
            title: "Formularze",
            field: "forms",
            cellStyle: TableCellStyle
        },
        {
            title: "Wykonane",
            field: "formsFinished",
            cellStyle: TableCellStyle
        },
        {
            title: "Oczekujące",
            field: "formsWaiting",
            cellStyle: TableCellStyle
        },
        {
            title: "Rezygnacja",
            field: "formsRejected",
            cellStyle: TableCellStyle
        },

    ];

    const actions = [
        {
            icon: 'edit',
            iconProps: { style: { color: '#feac10' } },
            tooltip: 'Edytuj Seniora',
            onClick: (event, rowData) => history.push("/senior/" + rowData.id)
        },
        {
            icon: 'delete',
            iconProps: { style: { color: 'red' } },
            tooltip: 'Usuń Seniora',
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
            tooltip: 'Dodaj Seniora',
            iconProps: { style: { color: 'blue', backgroundColor: '#deded5' } },
            isFreeAction: true,
            onClick: (event) => history.push("/senior")
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
        <div style={{ maxWidth: "1400px", margin: 'auto' }}>
            <MaterialTable
                title={<MyNewTitle text="Seniorzy" />}
                data={seniors}
                columns={columns}
                options={options}
                actions={actions}
                localization={localization} />
        </div>
    )
}

SeniorList.prototypes = {
    seniors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default SeniorList;