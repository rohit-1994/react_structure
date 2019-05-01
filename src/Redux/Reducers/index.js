import { combineReducers } from 'redux';

import CommonReducer from './CommonReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    CommonReducer,
    AuthReducer
});