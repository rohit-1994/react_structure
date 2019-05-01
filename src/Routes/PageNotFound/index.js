import React from 'react';
import './styles.scss';

import Page from '../../Components/HOC/Page';

const PageNotFound = () => {
    return (
        <Page className={'page-not-found'}>
            <h1>404</h1>
            <h4>Page Not Found!</h4>
        </Page>
    )
}

export default PageNotFound;
