import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as summaryActions from "../../redux/actions/summaryActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import * as billActions from "../../redux/actions/billActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import SummaryPresentation from "./SummaryPresentation";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getSummaryAdvanced, sortArray } from "../common/Helper";

function SummaryContainer({ handymans, bills, formStatuses, actions, loading, forms, ...props }) {
    const [sort, setSort] = useState({ col: 'periodDate', descending: true });
    const [_summaryRows, _setSummaryRows] = useState([...props.summaryRows]);

    useEffect(() => {
        if (forms.length === 0) {
            actions.loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        }
        if (handymans.length === 0) {
            actions.loadHandymans().catch(error => {
                alert("Loading handymans failed" + error);
            });
        }
        if (bills.length === 0) {
            actions.loadBills().catch(error => {
                alert("Loading bills failed" + error);
            });
        }
        if (formStatuses.length === 0) {
            actions.loadFormStatuses().catch(error => {
                alert("Loading formStatuses failed" + error);
            });
        }
        debugger;
        if (props.summaryRows.length === 0 && !(forms.length === 0 || handymans.length === 0 || bills.length === 0 || formStatuses.length === 0)) {
            const sRows = generateSummaryRows();
            _setSummaryRows(sRows);
        }

    }, [bills.length, formStatuses.length, forms.length, handymans.length]);

    function generateSummaryRows() {
        let summaryRows = [];
        let handyRows = [];

        const finishedId = formStatuses.find(fs => fs.name === 'Wykonane').id;
        const waitingId = formStatuses.find(fs => fs.name === 'Oczekujące').id;
        const rejectedId = formStatuses.find(fs => fs.name === 'Rezygnacja').id;

        //#region generate row for total
        handymans.forEach((h) => {
            handyRows.push({
                name: h.name,
                forms: forms.filter(f => f.handymanId === h.id && f.formStatusId !== rejectedId).length
            })
        });
        const sum = bills.reduce((acc, cur) => acc + cur.amount, 0);

        const rowAll = {
            periodDate: new Date(1970, 1, 1, 1, 1, 1),
            period: 'Całość',
            forms: forms.length,
            formsFinished: forms.filter(f => f.formStatusId === finishedId).length,
            formsWaiting: forms.filter(f => f.formStatusId === waitingId).length,
            formsRejected: forms.filter(f => f.formStatusId === rejectedId).length,
        }

        rowAll['billsAmount'] = Math.round(sum * 100) / 100;
        rowAll['billsAmountAvg'] = Math.round((sum / (rowAll.formsFinished + rowAll.formsWaiting)) * 100) / 100;
        rowAll['handymans'] = handyRows;

        summaryRows.push(rowAll);
        //#endregion

        let formsByMonth = [];
        let billsByMonth = [];

        forms.forEach(f => {
            const date = new Date(f.registrationDate);
            const key = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();

            if (formsByMonth[key] === undefined) {
                formsByMonth[key] = [];
            }

            formsByMonth[key].push(f);
        });

        bills.forEach(b => {
            const date = new Date(b.date);
            const key = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();

            if (billsByMonth[key] === undefined) {
                billsByMonth[key] = [];
            }

            billsByMonth[key].push(b);
        })

        //#region generate rows for months
        for (const [key, value] of Object.entries(formsByMonth)) {
            let handyRows = [];
            debugger;
            const row = {
                periodDate: value[0].registrationDate,
                period: key,
                forms: value.length,
                formsFinished: value.filter(f => f.formStatusId === finishedId).length,
                formsWaiting: value.filter(f => f.formStatusId === waitingId).length,
                formsRejected: value.filter(f => f.formStatusId === rejectedId).length,
            }
            handymans.forEach((h) => {
                handyRows.push({
                    name: h.name,
                    forms: value.filter(f => f.handymanId === h.id && f.formStatusId !== rejectedId).length
                })
            });

            let sum = 0;
            if (billsByMonth.hasOwnProperty(key)) {
                sum = billsByMonth[key].reduce((acc, cur) => acc + cur.amount, 0);
            }
            row['billsAmount'] = Math.round(sum * 100) / 100;
            row['billsAmountAvg'] = Math.round((sum / (row.formsWaiting + row.formsFinished)) * 100) / 100;
            row['handymans'] = handyRows;

            summaryRows.push(row);
        }
        //#endregion

        return summaryRows;
    }

    function handleSort(event, col) {
        event.preventDefault();
        const descending = ((sort.col === col) ? !sort.descending : false);
        _setSummaryRows(sortArray(_summaryRows, col, descending));
        setSort({ col, descending });
    }


    return (
        <>
            <h2>Summary</h2>
            {loading || _summaryRows.length === 0
                ? <Spinner />
                :
                <>
                    <SummaryPresentation
                        onHeaderClick={handleSort}
                        summaryRows={_summaryRows}
                    />
                </>

            }
        </>
    )
}

SummaryContainer.propTypes = {
    forms: PropTypes.array.isRequired,
    summaryRows: PropTypes.array.isRequired,
    handymans: PropTypes.array.isRequired,
    bills: PropTypes.array.isRequired,
    formStatuses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        summaryRows: state.summaryRows,
        forms: state.forms,
        handymans: state.handymans,
        bills: state.bills,
        formStatuses: state.formStatuses,
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(formActions, dispatch)
        actions: {
            setSummaryRows: bindActionCreators(summaryActions.setSummaryRows, dispatch),
            loadForms: bindActionCreators(formActions.loadForms, dispatch),
            loadHandymans: bindActionCreators(handymanActions.loadHandymans, dispatch),
            loadBills: bindActionCreators(billActions.loadBills, dispatch),
            loadFormStatuses: bindActionCreators(formStatusActions.loadFormStatuses, dispatch),
            deleteForm: bindActionCreators(formActions.deleteForm, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(SummaryContainer);