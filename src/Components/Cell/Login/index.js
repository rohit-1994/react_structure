import React, { PureComponent } from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import CustomButton from '../../../Components/Atom/CustomButton';
import CustomInput from '../../../Components/Atom/CustomInput';
import Spinner from '../../../Components/Atom/Spinner';
import SocialButtonGroup from '../../../Components/Molecule/SocialButtonGroup';
import {
    Form,
    FormGroup,
    Nav,
    Alert
} from 'react-bootstrap';
import AuthFirebase from '../../../Firebase/AuthFirebase';
import { ValidationMessages } from '../../../Shared/Messages';
import Utility from '../../../Services/Utility';
import { AuthTab } from '../../../Config';
import { showAuthModal } from '../../../Redux/Actions/AuthActions';

const invalidMessages = {
    email: '',
    password: ''
}

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            signingIn: false,
            invalidMessages: {
                ...invalidMessages
            }
        }
        this.checkLogin();
    }

    componentDidUpdate() {
        this.checkLogin();
    }

    checkLogin() {
        if (this.props.isLoggedIn) {
            this.props.showAuthModal(false);
        }
    }

    onLogin(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            window.scrollTo({ top: 0 });
            this.setState({
                signingIn: true
            });
            AuthFirebase.signInWithEmail(this.state.email, this.state.password)
                .catch(({ message }) => {
                    this.setState({
                        signingIn: false,
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
        if (!this.state.email) {
            this.setInvalidMessage('email', ValidationMessages.ENTER_EMAIL);
            return false;
        } else if (!Utility.isEmail(this.state.email)) {
            this.setInvalidMessage('email', ValidationMessages.ENTER_VALID_EMAIL);
            return false;
        } else if (!this.state.password) {
            this.setInvalidMessage('password', ValidationMessages.ENTER_PASSWORD);
            return false;
        }

        this.setInvalidMessage();
        return true;
    }


    onForgotPassword(e) {
        e.preventDefault();
        this.props.showAuthModal(true, AuthTab.FORGOT_PASSWORD.id);
    }

    render() {
        return (
            <div className={'login-page'}>
                <h4>Welcome to MK:q!:</h4>
                <p>Enter your details below.</p>
                {this.state.errorMessage &&
                    <Alert variant={'danger'}>
                        {this.state.errorMessage}
                    </Alert>
                }
                <Form onSubmit={this.onLogin.bind(this)}>
                    <CustomInput
                        formText={this.state.invalidMessages.email}
                        type={'email'}
                        placeholder={'Enter email'}
                        autoCorrect={'none'}
                        autoCapitalize={'none'}
                        onChange={(event) => {
                            this.setState({
                                email: event.target.value
                            });
                        }}
                    />
                    <CustomInput
                        formText={this.state.invalidMessages.password}
                        type={'password'}
                        placeholder={'Enter password'}
                        onChange={(event) => {
                            this.setState({
                                password: event.target.value
                            });
                        }}
                    />
                    <FormGroup>
                        {this.state.signingIn ?
                            <Spinner />
                            :
                            <CustomButton
                                className={'login-button'}
                                onClick={this.onLogin.bind(this)}
                            >
                                Login
                            </CustomButton>
                        }
                    </FormGroup>
                    <Nav.Link
                        onClick={this.onForgotPassword.bind(this)}
                    >
                        Forgot Password?
                    </Nav.Link>
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

export default connect(mapStateToProps, { showAuthModal })(Login);
