import React from 'react';
import './styles.scss';

import { Row, Col } from 'react-bootstrap';
import CustomButton from '../../Atom/CustomButton';
import AuthFirebase from '../../../Firebase/AuthFirebase';

const onSignInWithGoogle = () => {
    AuthFirebase.signInWithGoogle();
}

const onSignInWithFacebook = () => {
    AuthFirebase.signInWithFacebook();
}

const SocialButtonGroup = ({ withOR = true }) => {
    return (
        <div className={'social-login'}>
            {withOR &&
                <p>Or Login with</p>
            }
            <Row>
                <Col sm={12} md={6}>
                    <CustomButton
                        outline
                        className={'facebook-button border-facebook text-facebook'}
                        onClick={onSignInWithFacebook}>
                        Facebook
                    </CustomButton>
                </Col>
                <Col sm={12} md={6}>
                    <CustomButton
                        outline
                        className={'border-google text-google'}
                        onClick={onSignInWithGoogle}>
                        Google
                    </CustomButton>
                </Col>
            </Row>
        </div>
    );
}

export default SocialButtonGroup;
