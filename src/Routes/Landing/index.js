import React, { PureComponent } from 'react';
import './styles.scss';

import { Col } from 'react-bootstrap';
import Page from '../../Components/HOC/Page';
import SearchBar from '../../Components/Molecule/SearchBar';

class Landing extends PureComponent {
    render() {
        return (
            <Page className={'landing-page'}>
                <Col className={'search-category-section'} sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <SearchBar />
                </Col>
            </Page>
        );
    }
}

export default Landing;
