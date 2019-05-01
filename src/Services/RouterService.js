let _browserHistory;

const scrollToTop = () => {
    window.scrollTo({ top: 0 });
}


const setBrowserHistoryRef = ref => {
    _browserHistory = (ref || {}).history;
}

const pushRoute = routeName => {
    _browserHistory.push(routeName);
    scrollToTop();
}

const goBack = () => {
    _browserHistory.goBack();
    scrollToTop();
}

const goForward = () => {
    _browserHistory.goForward();
    scrollToTop();
}
export default {
    setBrowserHistoryRef,
    pushRoute,
    goForward,
    goBack,
};