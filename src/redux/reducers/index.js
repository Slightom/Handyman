import { combineReducers } from 'redux';
import forms from './formReducer';
import seniors from './seniorReducer';
import handymans from './handymanReducer';
import formStatuses from './formStatusReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    forms,
    seniors,
    handymans,
    formStatuses,
    apiCallsInProgress
});

export default rootReducer;