import React, { PureComponent } from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import AuthFirebase from '../../../Firebase/AuthFirebase';
import Spinner from '../../../Components/Atom/Spinner';
import CustomButton from '../../../Components/Atom/CustomButton';
import CustomInput from '../../../Components/Atom/CustomInput';
import SocialButtonGroup from '../../../Components/Molecule/SocialButtonGroup';

import {
    Alert,
    Form,
    FormGroup
} from 'react-bootstrap';
import { ValidationMessages } from '../../../Shared/Messages';
import Utility from '../../../Services/Utility';
import { showAuthModal } from '../../../Redux/Actions/AuthActions';

const invalidMessages = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

class Signup extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            signingUp: false,
            errorMessage: null,
            invalidMessages: {
                ...invalidMessages
            }
        }

        this.checkSignIn();
    }

    componentDidUpdate() {
        this.checkSignIn();
    }

    checkSignIn() {
        if (this.props.isLoggedIn) {
            this.props.showAuthModal(false);
        }
    }

    onSignUp(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            window.scrollTo({ top: 0 });
            this.setState({
                signingUp: true
            });
            AuthFirebase.signUpWithEmail(this.state.fullName, this.state.email, this.state.password)
                .catch(({ message }) => {
                    this.setState({
                        signingUp: false,
                        errorMessage: message
                    });
                });
        }
    }


    setInvalidMessage(key, message) {
        this.setState({
            invalidMessages: {
                ...invalidMessages,
                [key]: message
            }
        });
    }

    isFormValid() {
        if (!this.state.fullName) {
            this.setInvalidMessage('fullName', ValidationMessages.ENTER_FULL_NAME);
            return false;
        } else if (!Utility.isVlaidName(this.state.fullName)) {
            this.setInvalidMessage('fullName', ValidationMessages.ENTER_VALID_FULL_NAME);
            return false;
        } else if (!this.state.email) {
            this.setInvalidMessage('email', ValidationMessages.ENTER_EMAIL);
            return false;
        } else if (!this.state.password) {
            this.setInvalidMessage('password', ValidationMessages.ENTER_PASSWORD_TO_CREATE);
            return false;
        } else if (!this.state.confirmPassword) {
            this.setInvalidMessage('confirmPassword', ValidationMessages.ENTER_CONFIRM_PASSWORD);
            return false;
        }

        this.setInvalidMessage();
        return true;
    }

    render() {
        return (
            <div className={'signup-page'}>
                <h4>Welcome to MK</h4>
                <p>Get started absolutely free.</p>
                {this.state.errorMessage &&
                    <Alert variant={'danger'}>
                        {this.state.errorMessage}
                    </Alert>
                }
                <Form onSubmit={this.onSignUp.bind(this)}>
                    <CustomInput
                        formText={this.state.invalidMessages.fullName}
                        type={'text'}
                        autoCorrect={'none'}
                        placeholder={'Enter full name'}
                        onChange={event => {
                            if (event.target.value) {
                                this.setInvalidMessage('fullName');
                            }

                            this.setState({
                                fullName: event.target.value
                            });
                        }}
                    />
                    <CustomInput
                        formText={this.state.invalidMessages.email}
                        type={'email'}
                        autoCorrect={'none'}
                        placeholder={'Enter email'}
                        onChange={event => {
                            if (event.target.value) {
                                this.setInvalidMessage('email');
                            }

                            this.setState({
                                email: event.target.value
                            });
                        }}
                    />
                    <CustomInput
                        formText={this.state.invalidMessages.password}
                        type={'password'}
                        placeholder={'Enter password'}
                        onChange={event => {
                            if (event.target.value) {
                                this.setInvalidMessage('password');
                            }

                            this.setState({
                                password: event.target.value
                            });
                        }}
                    />
                    <CustomInput
                        formText={this.state.invalidMessages.confirmPassword}
                        type={'password'}
                        placeholder={'Re-enter password'}
                        onChange={event => {
                            if (!this.state.password) {
                                this.setInvalidMessage('password', ValidationMessages.ENTER_PASSWORD_TO_CREATE);
                            } else if (this.state.password !== event.target.value) {
                                this.setInvalidMessage('confirmPassword', ValidationMessages.NO_MATCH_CONFIRM_PASSWORD);
                            } else {
                                this.setInvalidMessage('password');
                                this.setInvalidMessage('confirmPassword');
                            }

                            this.setState({
                                confirmPassword: event.target.value
                            });
                        }}
                    />
                    {this.state.signingUp ?
                        <Spinner />
                        :
                        <CustomButton className={'signup-button'} onClick={this.onSignUp.bind(this)}>
                            Signup
                        </CustomButton>
                    }
                </Form>
                <SocialButtonGroup />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn
    };
}

export default connect(mapStateToProps, { showAuthModal })(Signup);
