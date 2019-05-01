import React from 'react';
import './styles.scss';

import { Row, Col } from 'react-bootstrap';
import CustomInput from '../../Atom/CustomInput';
import CustomButton from '../../Atom/CustomButton';

const SearchBar = () => {
    return (
        <Row className={'search-bar'}>
            <Col className={'column'} sm={12} md={5}>
                <CustomInput
                    type={'text'}
                    placeholder={'Try to find ...'}
                />
            </Col>
            <Col className={'column'} sm={12} md={4}>
                <CustomInput
                    type={'text'}
                    placeholder={'Location'}
                />
            </Col>
            <Col className={'column'} sm={12} md={3}>
                <CustomButton

                >
                    Search
                </CustomButton>
            </Col>
        </Row>
    )
}

export default SearchBar;
