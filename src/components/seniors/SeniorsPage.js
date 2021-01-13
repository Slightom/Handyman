import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import * as myGlobal from "../common/myGlobal";
import SeniorList from "./SeniorList";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function SeniorsPage({ forms, formStatuses, actions, loading, ...props }) {
    const [redirectToAddSeniorPage, setRedirectToAddSeniorPage] = useState(false);
    useEffect(() => {
        if (forms.length === 0) {
            actions.loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        }
        if (props.seniors.length === 0) {
            actions.loadSeniors().catch(error => {
                alert("Loading seniors failed" + error);
            });
        }
        if (formStatuses.length === 0) {
            actions.loadFormStatuses().catch(error => {
                alert("Loading formStatuses failed" + error);
            });
        }
    }, [])

    async function confirmedDelete(_senior) {
        toast.success("Senior deleted.");
        try {
            const relatedForms = forms.filter(form => form.seniorId == _senior.id);
            relatedForms.forEach(async f =>
                await actions.deleteForm(f)
            )
            await actions.deleteSenior(_senior);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false })
        }
    }

    function handleDeleteSenior(_senior) {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this? If you remove senior, all forms related to him will be removed too.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => confirmedDelete(_senior)
                },
                {
                    label: 'No',
                    onClick: () => { return; }
                }
            ]
        });
    }


    return (
        <>
            {redirectToAddSeniorPage && <Redirect to="/senior" />}
            <h2>Seniors</h2>
            {loading
                ? <Spinner />
                :
                <>
                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary add-form"
                        onClick={() => setRedirectToAddSeniorPage(true)}
                    >
                        Add Senior
                    </button>

                    <SeniorList
                        onDeleteClick={handleDeleteSenior}
                        seniors={props.seniors}
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
        seniors: (state.seniors.length === 0 || state.forms.length === 0 || state.formStatuses.length === 0)
            ? []
            : state.seniors.map(senior => {
                const seniorForms = state.forms.filter(form => form.seniorId === senior.id);
                console.log(seniorForms);
                return {
                    ...senior,
                    forms: seniorForms.length,
                    formsWaiting: seniorForms.filter(form => form.formStatusId == state.formStatuses[0].id).length,
                    formsFinished: seniorForms.filter(form => form.formStatusId == state.formStatuses[1].id).length,
                    formsRejected: seniorForms.filter(form => form.formStatusId == state.formStatuses[2].id).length
                }
            }),
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