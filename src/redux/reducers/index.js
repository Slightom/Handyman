import { combineReducers } from 'redux';
import forms from './formReducer';
import seniors from './seniorReducer';
import handymans from './handymanReducer';
import formStatuses from './formStatusReducer';

const rootReducer = combineReducers({
    forms,
    seniors,
    handymans,
    formStatuses
});

export default rootReducer;