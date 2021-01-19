import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as billActions from "../../redux/actions/billActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import BillList from "./BillList";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { sortArray } from "../common/Helper";


function BillsPage({ actions, loading, ...props }) {
    const [sort, setSort] = useState({ col: 'id', descending: true });
    const [_bills, _setBills] = useState(props.bills);

    useEffect(() => {
        debugger;
        if (props.bills.length === 0) {
            actions.loadBills().catch(error => {
                alert("Loading bills failed" + error);
            });
        } else {
            _setBills(props.bills);
        }
    }, [props.bills.length])

    async function confirmedDelete(_bill) {
        toast.success("Bill deleted.");
        try {
            await actions.deleteBill(_bill);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false })
        }
    }

    function handleDeleteBill(_bill) {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => confirmedDelete(_bill)
                },
                {
                    label: 'No',
                    onClick: () => { return; }
                }
            ]
        });
    }

    function handleSort(event, col) {
        event.preventDefault();
        const descending = ((sort.col === col) ? !sort.descending : false);
        _setBills(sortArray(_bills, col, descending));
        setSort({ col, descending });
    }

    return (
        <>
            <h2>Bills</h2>
            {loading
                ? <Spinner />
                :
                <>
                    <Link to={"/bill"}>
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-form"
                        >
                            Add Bill
                    </button>
                    </Link>

                    <BillList
                        onDeleteClick={handleDeleteBill}
                        onHeaderClick={handleSort}
                        bills={_bills}
                    />
                </>
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
        bills: state.bills,
        loading: state.apiCallsInProgress > 0
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