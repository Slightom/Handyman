import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import SeniorList from "./SeniorList";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { sortArray, toastError } from "../common/Helper";
import { Labels } from '../common/myGlobal';


function SeniorsPage({ forms, formStatuses, actions, loading, ...props }) {
    const [sort, setSort] = useState({ col: 'lastName', descending: false });
    const [_seniors, _setSeniors] = useState([...props.seniors]);
    useEffect(() => {
        actions.loadForms()
            .catch(error => toastError(toast, Labels.LoadingFormsFailed + error, props.history))
        actions.loadSeniors()
            .then(() => _setSeniors(props.seniors))
            .catch(error => toastError(toast, Labels.LoadingSeniorsFailed + error, props.history))
        actions.loadFormStatuses()
            .catch(error => toastError(toast, Labels.LoadingFormStatusesFailed + error, props.history))
    }, [])

    useEffect(() => {
        _setSeniors(props.seniors);
    }, [props.seniors.length])

    async function confirmedDelete(_senior) {
        toast.success(Labels.SeniorDeleted);
        try {
            const relatedForms = forms.filter(form => form.seniorId == _senior.id);
            relatedForms.forEach(async f =>
                await actions.deleteForm(f)
            )
            actions.deleteSenior(_senior);
            props.history.push('/spinner/seniors');
        } catch (error) {
            toast.error(Labels.DeleteFailed + error.message, { autoClose: false })
        }
    }

    function handleDeleteSenior(_senior) {

        confirmAlert({
            title: Labels.ConfirmationTitle,
            message: Labels.ConfirmationMsgSenior,
            buttons: [
                {
                    label: Labels.Yes,
                    onClick: () => confirmedDelete(_senior)
                },
                {
                    label: Labels.No,
                    onClick: () => { return; }
                }
            ]
        });
    }

    function handleSort(event, col) {
        event.preventDefault();
        const descending = ((sort.col === col) ? !sort.descending : true);
        _setSeniors(sortArray(_seniors, col, descending));
        setSort({ col, descending });
    }

    return (
        <>
            {loading
                ? <Spinner />
                :
                <>
                    <SeniorList
                        onDeleteClick={handleDeleteSenior}
                        onHeaderClick={handleSort}
                        seniors={_seniors}
                    />
                </>
            }

        </>
    )
}

SeniorsPage.propTypes = {
    seniors: PropTypes.array.isRequired,
    forms: PropTypes.array.isRequired,
    formStatuses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool
}

function mapStateToProps(state) {

    return {
        seniors: (state.seniors.length === 0 || state.formStatuses.length === 0)
            ? []
            : state.seniors.map(senior => {
                const seniorForms = state.forms.filter(form => form.seniorId === senior.id);

                const finishedId = state.formStatuses.find(fs => fs.name === 'Wykonane').id;
                const waitingId = state.formStatuses.find(fs => fs.name === 'Oczekujące').id;
                const rejectedId = state.formStatuses.find(fs => fs.name === 'Rezygnacja').id;
                return {
                    ...senior,
                    forms: seniorForms.length,
                    formsWaiting: seniorForms.filter(form => form.formStatusId == waitingId).length,
                    formsFinished: seniorForms.filter(form => form.formStatusId == finishedId).length,
                    formsRejected: seniorForms.filter(form => form.formStatusId == rejectedId).length
                }
            }).sort((a, b) => a['lastName'].localeCompare(b['lastName'])),
        forms: state.forms,
        formStatuses: state.formStatuses,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadForms: bindActionCreators(formActions.loadForms, dispatch),
            loadSeniors: bindActionCreators(seniorActions.loadSeniors, dispatch),
            loadFormStatuses: bindActionCreators(formStatusActions.loadFormStatuses, dispatch),
            deleteSenior: bindActionCreators(seniorActions.deleteSenior, dispatch),
            deleteForm: bindActionCreators(formActions.deleteForm, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeniorsPage);