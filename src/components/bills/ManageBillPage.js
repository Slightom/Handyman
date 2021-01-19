import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as billActions from "../../redux/actions/billActions";
import PropTypes from "prop-types";
import { newBill } from "../../tools/mockData";
import BillForm from "./BillForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { saveBill } from "../../api/billApi";
import { stringIsPropertyFloat, naviGateBack, isNumber } from "../common/Helper";

function ManageBillPage({
    loadBills,
    saveForm,
    history,
    bills,
    ...props
}) {
    const [bill, setBill] = useState(props.bill);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (bills.length === 0) {
            loadBills().catch(error => {
                alert("Loading bills failed" + error);
            });
        } else {
            setBill(props.bill);
        }

    }, [props.bill, bills.length]);


    function handleChange(event, dateName) {
        let name, value;
        if (dateName !== undefined) {
            name = dateName;
            value = new Date(event);
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

        if (!name) errors.name = "Name is required.";
        if (!amount) errors.amount = "Amount is required.";
        else if (!stringIsPropertyFloat(amount)) errors.amount = "Amount must be a number."
        if (!date) errors.date = "Date is required.";

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
            toast.success("Bill Saved.");
            history.push("/bills");
        });
    }

    function check() {
        return (bills.length === 0)
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
    history: PropTypes.object.isRequired
};

export function getBillById(bills, id) {
    const findedBill = bills.find(s => s.id == id) || null;
    return findedBill;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const _bill = id && state.bills.length > 0 ? getBillById(state.bills, id) : newBill;
    return {
        bill: _bill,
        bills: state.bills
    };
}

const mapDispatchToProps = {
    loadBills: billActions.loadBills,
    saveBill: billActions.saveBill,
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageBillPage);