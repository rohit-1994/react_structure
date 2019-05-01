import { AuthActionTypes } from '../Actions/AuthActions';
import { REHYDRATE } from 'redux-persist';
import { AuthTab } from '../../Config';

const nonPersistedState = {
    authModalVisible: false,
    activeAuthTabId: AuthTab.LOGIN.id
};

const defaultAuthState = {
    isLoggedIn: false,
    user: null,
    ...nonPersistedState
};

const AuthReducer = (state = { ...defaultAuthState }, action) => {
    switch (action.type) {
        case AuthActionTypes.SHOW_AUTH_MODAL:
            return {
                ...state,
                authModalVisible: action.status || false,
                activeAuthTabId: action.activeId || AuthTab.LOGIN.id
            };

        case AuthActionTypes.AUTH_CHANGED:
            return {
                ...state,
                isLoggedIn: !!action.user,
                user: action.user
            };

        case REHYDRATE:
            let oldState = (action.payload || {}).AuthReducer;
            return {
                ...oldState,
                ...nonPersistedState
            };


        default:
            return { ...state };
    }
}

export default AuthReducer;