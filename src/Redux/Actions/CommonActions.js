export const CommonActionTypes = {
    SET_LOADING: 'SET_LOADING'
}

export const setLoading = (status, message) => {
    return {
        type: CommonActionTypes.SET_LOADING,
        status,
        message
    };
}