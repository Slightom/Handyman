import PropTypes from 'prop-types';
import "../common/myStyle.css";
import 'moment/locale/pl';

import MaterialTable from "material-table";
import { MyNewTitle, TableCellStyle } from "../common/Helper";
import { useEffect, useState } from 'react';

const SummaryPresentation = ({ summaryRows, handymans }) => {

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        let _columnsPart1 = [
            {
                title: "Okres",
                field: "period",
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
            }];

        let _columnsPart2 =
            handymans.map((handyman, i) => {
                return {
                    title: handyman.name,
                    field: `handymans[${i}].forms`,
                    cellStyle: TableCellStyle
                }
            }
            );

        let _columnsPart3 = [
            {
                title: "Kwota",
                field: "amount",
                render: rowData => <span>{rowData.amount} zł</span>,
                cellStyle: TableCellStyle
            },
            {
                title: "Średnia kwota / naprawę",
                field: "amountAvg",
                render: rowData => <span>{rowData.amountAvg} zł</span>,
                cellStyle: TableCellStyle
            },
        ];


        setColumns([..._columnsPart1, ..._columnsPart2, ..._columnsPart3]);
    }, [handymans])

    const localization = {
        pagination: {
            labelRowsSelect: 'wierszy'
        }
    };

    const options =
    {
        actionsColumnIndex: -1,
        search: true,
        paging: true,
        pageSize: 12,
        pageSizeOptions: [12, 50, 100],
        sorting: true,
        maxBodyHeight: "600px",
        headerStyle: {
            backgroundColor: '#bfbfbf',
            fontWeight: 'bold',
            borderRight: '2px solid #e5e5e5'
        },
        rowStyle: (rowData) => {
            return {
            }
        }
    };

    return (
        <div style={{ maxWidth: "1400px", margin: 'auto' }}>
            {columns.length > 0 &&
                <MaterialTable
                    title={<MyNewTitle text="Podsumowanie" />}
                    data={summaryRows}
                    columns={columns}
                    options={options}
                    localization={localization} />}
        </div>
    )
}

SummaryPresentation.prototypes = {
    summaryRows: PropTypes.array.isRequired,
}

export default SummaryPresentation;




