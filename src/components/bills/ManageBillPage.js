import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as billActions from "../../redux/actions/billActions";
import PropTypes from "prop-types";
import { newBill } from "../../tools/mockData";
import BillForm from "./BillForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { stringIsPropertyFloat, naviGateBack, isNumber, toastError } from "../common/Helper";
import { Labels } from '../common/myGlobal';

function ManageBillPage({
    loadBills,
    saveBill,
    history,
    bills,
    loading,
    ...props
}) {
    const [bill, setBill] = useState({ ...props.bill });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        debugger;
        if (bills.length === 0) {
            loadBills().catch(error => {
                toastError(toast, Labels.LoadingBillsFailed + error, props.history);
            });
        } else {
            setBill({ ...props.bill });
        }

    }, [props.bill]);


    function handleChange(event, dateName) {
        let name, value;
        if (dateName !== undefined) {
            name = dateName;
            value = new Date(event);
            value.setHours(12);
        } else {
            name = event.target.name;
            value = event.target.value;
        }

        setBill(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, amount, date } = bill;
        const errors = {};

        if (!name) errors.name = Labels.ErorNameRequired;
        if (!amount) errors.amount = Labels.ErrorAmountRequired;
        else if (!stringIsPropertyFloat(amount)) errors.amount = Labels.ErrorAmountMustBeNumber;
        if (!date) errors.date = Labels.ErrorDateRequired;

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        debugger;
        const parsedAmount = isNumber(bill.amount)
            ? bill.amount
            : parseFloat(bill.amount.replace(/,/, "."));

        saveBill({ ...bill, amount: parsedAmount }).then(() => {
            // eslint-disable-next-line no-restricted-globals
            toast.success(Labels.BillSaved);
            history.goBack();

        });
    }

    function check() {
        return loading;
    }

    return check()
        ? <Spinner />
        : (
            <BillForm
                bill={bill}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                goBack={event => naviGateBack(history, event)}
                saving={saving}
            />
        )
}

ManageBillPage.propTypes = {
    bills: PropTypes.array.isRequired,
    loadBills: PropTypes.func.isRequired,
    saveBill: PropTypes.func.isRequired,
    bill: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export function getBillById(bills, id) {
    const findedBill = bills.find(s => s.id == id) || null;
    return { ...findedBill, amount: findedBill.amount.toFixed(2) };
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const _bill = id && state.bills.length > 0 ? getBillById(state.bills, id) : newBill;
    return {
        bill: _bill,
        bills: state.bills,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {
    loadBills: billActions.loadBills,
    saveBill: billActions.saveBill,
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageBillPage);