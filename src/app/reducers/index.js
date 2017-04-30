import {combineReducers} from 'redux';
import requiredProvider from './requiredProviderReducer';

const rootReducer   = combineReducers({
    requiredProvider
});

export default rootReducer;
