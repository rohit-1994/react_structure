export const AuthActionTypes = {
    SHOW_AUTH_MODAL: 'SHOW_AUTH_MODAL',
    AUTH_CHANGED: 'AUTH_CHANGED',
    SIGNING_IN: 'SIGNING_IN',
    SIGNING_UP: 'SIGNING_UP',
    SIGNIN_FAIL: 'SIGNIN_FAIL',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    SENDING_FORGOT_PASSWORD_EMAIL: 'SENDING_FORGOT_PASSWORD_EMAIL',
    FORGOT_PASSWORD_EMAIL_FAIL: 'FORGOT_PASSWORD_EMAIL_FAIL'
}

export const showAuthModal = (status, activeId) => {
    return {
        type: AuthActionTypes.SHOW_AUTH_MODAL,
        status,
        activeId
    };
}

export const authChanged = (user = null) => {
    return {
        type: AuthActionTypes.AUTH_CHANGED,
        user
    };
}