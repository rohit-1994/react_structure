import React, { Component } from 'react';
import './styles.scss';

import { Col } from 'react-bootstrap';
import Page from '../../Components/HOC/Page';
import CustomInput from '../../Components/Atom/CustomInput';
import CustomButton from '../../Components/Atom/CustomButton';

class ResetPassword extends Component {
    render() {
        return (
            <Page className={'reset-password-page'}>
                <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <h2>Reset Password</h2>
                    <CustomInput
                        placeholder={'Old Password'}
                    />
                    <CustomInput
                        placeholder={'New Password'}
                    />
                    <CustomInput
                        placeholder={'Confirm Password'}
                    />
                    <CustomButton>
                        Reset
                    </CustomButton>
                </Col>
            </Page>
        )
    }
}

export default ResetPassword;
