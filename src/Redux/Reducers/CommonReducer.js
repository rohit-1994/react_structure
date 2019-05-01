import { CommonActionTypes } from '../Actions/CommonActions';

const defaultCommonState = {
    loading: false,
    loadingMessage: ''
}

const CommonReducer = (state = { ...defaultCommonState }, action) => {
    switch (action.type) {
        case CommonActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.status || false,
                loadingMessage: action.message || ''
            };

        default:
            return { ...state };
    }
}

export default CommonReducer;