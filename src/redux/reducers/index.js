import { combineReducers } from 'redux';
import forms from './formReducer';
import seniors from './seniorReducer';
import handymans from './handymanReducer';
import formStatuses from './formStatusReducer';
import apiCallsInProgress from './apiStatusReducer';
import bills from './billReducer';
import summaryRows from './summaryReducer';

const rootReducer = combineReducers({
    forms,
    seniors,
    handymans,
    formStatuses,
    bills,
    summaryRows,
    apiCallsInProgress
});

export default rootReducer;