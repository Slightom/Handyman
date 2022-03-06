import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as formActions from '../../redux/actions/formActions'
import * as seniorActions from '../../redux/actions/seniorActions'
import * as handymanActions from '../../redux/actions/handymanActions'
import * as formStatusActions from '../../redux/actions/formStatusActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import FormList from './FormList'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { getFormsAdvanced, sortArray, toastError } from '../common/Helper'
import { Labels } from '../common/myGlobal'
import { History } from 'history'

interface FormsPageProps {
  forms: any
  seniors: any
  handymans: any
  formStatuses: any
  actions: any
  loading: boolean
  history: History
}

const FormsPage = ({
  seniors,
  handymans,
  formStatuses,
  actions,
  loading,
  forms,
  history,
}: FormsPageProps) => {
  useEffect(() => {
    if (forms.length === 0) {
      actions
        .loadForms()
        .catch((error: any) =>
          toastError(toast, Labels.LoadingFormsFailed + error, history),
        )
    }
    if (seniors.length === 0) {
      actions
        .loadSeniors()
        .catch((error: any) =>
          toastError(toast, Labels.LoadingSeniorsFailed + error, history),
        )
    }
    if (handymans.length === 0) {
      actions
        .loadHandymans()
        .catch((error: any) =>
          toastError(toast, Labels.LoadingHandymansFailed + error, history),
        )
    }
    if (formStatuses.length === 0) {
      actions
        .loadFormStatuses()
        .catch((error: any) =>
          toastError(toast, Labels.LoadingFormStatusesFailed + error, history),
        )
    }
  }, [forms.length])

  async function confirmedDelete(_form: any) {
    toast.success(Labels.FormDeleted)
    try {
      await actions.deleteForm(_form).then(() => history.push('/spinner/forms'))
    } catch (_error) {
      const error: any = _error
      toast.error(Labels.DeleteFailed + error.message, { autoClose: false })
    }
  }

  function handleDeleteForm(_form: any) {
    confirmAlert({
      title: Labels.ConfirmationTitle,
      message: Labels.ConfirmationMsg,
      buttons: [
        {
          label: Labels.Yes,
          onClick: () => confirmedDelete(_form),
        },
        {
          label: Labels.No,
          onClick: () => {
            return
          },
        },
      ],
    })
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <FormList onDeleteClick={handleDeleteForm} forms={forms} />
      )}
    </>
  )
}

FormsPage.propTypes = {
  forms: PropTypes.array.isRequired,
  seniors: PropTypes.array.isRequired,
  handymans: PropTypes.array.isRequired,
  formStatuses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    forms:
      state.forms.length === 0 ||
      state.seniors.length === 0 ||
      state.handymans.length === 0 ||
      state.formStatuses.length === 0
        ? []
        : getFormsAdvanced(
            state.forms,
            state.seniors,
            state.handymans,
            state.formStatuses,
          ).sort((a, b) => b.lp - a.lp),
    seniors: state.seniors,
    handymans: state.handymans,
    formStatuses: state.formStatuses,
    loading: state.apiCallsInProgress > 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(formActions, dispatch)
    actions: {
      loadForms: bindActionCreators(formActions.loadForms, dispatch),
      loadSeniors: bindActionCreators(seniorActions.loadSeniors, dispatch),
      loadHandymans: bindActionCreators(
        handymanActions.loadHandymans,
        dispatch,
      ),
      loadFormStatuses: bindActionCreators(
        formStatusActions.loadFormStatuses,
        dispatch,
      ),
      deleteForm: bindActionCreators(formActions.deleteForm, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage)

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(FormsPage);
