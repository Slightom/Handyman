import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../common/myStyle.css'
import Moment from 'react-moment'
import 'moment/locale/pl'
import MaterialTable from 'material-table'
import { MyNewTitle, TableCellStyle } from '../common/Helper'

interface FormListProps {
  forms: any
  onDeleteClick: any
}

const FormList = ({ forms, onDeleteClick }: FormListProps) => {
  const [filter, setFilter] = useState(false)
  const history = useHistory()

  const determineColor = (status) => {
    if (status === 'Rezygnacja') return '#ffc4c4'
    if (status === 'Wykonane') return '#d5f6d5'
    return 'white'
  }

  const columns: any = [
    {
      title: 'Lp',
      field: 'lp',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Senior',
      field: 'senior',
      render: (rowData) => (
        <Link to={'/senior/' + rowData.seniorId}>{rowData.senior}</Link>
      ),
      cellStyle: TableCellStyle,
    },
    {
      title: 'Adres',
      field: 'address',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Telefon',
      field: 'phone',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Status',
      field: 'status',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Złota Rączka',
      field: 'handyman',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Data zgłoszenia',
      field: 'registrationDate',
      render: (rowData) => (
        <Moment format="D-MM-YY">{rowData.registrationDate}</Moment>
      ),
      type: 'string',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Data naprawy',
      field: 'repairDate',
      render: (rowData) => (
        <Moment format="D-MM-YY">{rowData.repairDate}</Moment>
      ),
      type: 'string',
      cellStyle: TableCellStyle,
    },
    {
      title: 'Info',
      field: 'info',
      cellStyle: TableCellStyle,
    },
  ]

  const actions = [
    {
      icon: 'edit',
      iconProps: { style: { color: '#feac10' } },
      tooltip: 'Edytuj formularz',
      onClick: (event, rowData) => history.push('/form/' + rowData.id),
    },
    {
      icon: 'delete',
      iconProps: { style: { color: 'red' } },
      tooltip: 'Usuń Formularz',
      onClick: (event, rowData) => onDeleteClick(rowData),
    },
    {
      icon: 'filter',
      tooltip: 'Pokaż/ukryj filtry',
      isFreeAction: true,
      onClick: (event) => {
        setFilter(!filter)
      },
    },
    {
      icon: 'add',
      tooltip: 'Dodaj Formularz',
      iconProps: { style: { color: 'blue', backgroundColor: '#deded5' } },
      isFreeAction: true,
      onClick: (event) => history.push('/form'),
    },
  ]

  const localization = {
    header: {
      actions: 'Akcje',
    },
    pagination: {
      labelRowsSelect: 'wierszy',
    },
  }

  const options: any = {
    actionsColumnIndex: -1,
    search: true,
    paging: true,
    pageSize: 100,
    pageSizeOptions: [10, 50, 100],
    sorting: true,
    maxBodyHeight: '600px',
    filtering: filter,
    headerStyle: {
      backgroundColor: '#bfbfbf',
      fontWeight: 'bold',
      borderRight: '2px solid #e5e5e5',
    },
    rowStyle: (rowData) => {
      return {
        backgroundColor: determineColor(rowData.status),
        border: '2px solid #e5e5e5',
      }
    },
  }

  return (
    <div style={{ maxWidth: '1800px', margin: 'auto' }}>
      <MaterialTable
        title={<MyNewTitle text="Formularze" />}
        data={forms}
        columns={columns}
        options={options}
        actions={actions}
        localization={localization}
      />
    </div>
  )
}

export default FormList
