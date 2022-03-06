import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as billActions from "../../redux/actions/billActions";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import BillList from "./BillList";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { sortArray, toastError } from "../common/Helper";
import { Labels } from '../common/myGlobal';


function BillsPage({ actions, loading, ...props }) {
    const [sort, setSort] = useState({ col: 'date', descending: true });
    const [_bills, _setBills] = useState(props.bills);

    useEffect(() => {
        if (props.bills.length === 0) {
            actions.loadBills()
                //.then(() => _setBills(sortArray(props.bills, 'date', true)))
                .catch(error => toastError(toast, Labels.LoadingBillsFailed + error, props.history));
        } else {
            _setBills(sortArray(props.bills, 'date', true));
        }
    }, [props.bills.length])


    async function confirmedDelete(_bill) {
        toast.success(Labels.BillDeleted);
        try {
            await actions.deleteBill(_bill).then(() => props.history.push('/spinner/bills'));//without it table footer doesn't update

        } catch (error) {
            toast.error(Labels.DeleteFailed + error.message, { autoClose: false })
        }
    }

    function handleDeleteBill(_bill) {
        confirmAlert({
            title: Labels.ConfirmationTitle,
            message: Labels.ConfirmationMsg,
            buttons: [
                {
                    label: Labels.Yes,
                    onClick: () => confirmedDelete(_bill)
                },
                {
                    label: Labels.No,
                    onClick: () => { return; }
                }
            ]
        });
    }

    return (
        <>
            {loading
                ? <Spinner />
                : <BillList
                    onDeleteClick={handleDeleteBill}
                    bills={_bills}
                />
            }
        </>
    )
}

BillsPage.propTypes = {
    bills: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool
}

function mapStateToProps(state) {
    return {
        bills: state.bills.map(b => { return { ...b, amount: b.amount.toFixed(2) } }),
        loading: state.apiCallsInProgress > 0,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadBills: bindActionCreators(billActions.loadBills, dispatch),
            deleteBill: bindActionCreators(billActions.deleteBill, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillsPage);