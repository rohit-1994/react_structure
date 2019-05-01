import React, { PureComponent } from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import CustomButton from '../../../Components/Atom/CustomButton';
import CustomInput from '../../../Components/Atom/CustomInput';
import Spinner from '../../../Components/Atom/Spinner';
import {
    Form,
    FormGroup,
    Alert,
    Nav
} from 'react-bootstrap';
import AuthFirebase from '../../../Firebase/AuthFirebase';
import { ValidationMessages } from '../../../Shared/Messages';
import Utility from '../../../Services/Utility';
import { AuthTab } from '../../../Config';
import { showAuthModal } from '../../../Redux/Actions/AuthActions';

const invalidMessages = {
    email: ''
}

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isSent: false,
            isSending: false,
            errorMessage: null,
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

    onSendEmail(e) {
        e.preventDefault();
        if (this.isFormValid()) {
            window.scrollTo({ top: 0 });
            this.setState({
                isSending: true
            });
            AuthFirebase.sendForgotPasswordEmail(this.state.email)
                .then(() => {
                    this.setState({
                        isSent: true,
                        isSending: false,
                        errorMessage: null
                    });
                })
                .catch(({ message }) => {
                    this.setState({
                        isSending: false,
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
        }

        this.setInvalidMessage();
        return true;
    }


    onGoToLogin(e) {
        e.preventDefault();
        this.props.showAuthModal(true, AuthTab.LOGIN.id);
    }

    render() {
        return (
            <div className={'forgot-password'}>
                {this.state.isSent ?
                    <div className={'success-info'}>
                        <h4>Password rest link sent!</h4>
                        <p>
                            Password reset link has been sent to the registered email address <span>{this.state.email}</span>.
                            <br /><br />
                            Please check your mail box.
                            <br />
                            <br />
                            If you still haven't received email, click 'Send Again'.
                         </p>
                    </div>
                    :
                    <div>
                        <h4>Forgot Password?</h4>
                        <p>Enter your email address and we will get you back in track.</p>
                    </div>
                }

                {this.state.errorMessage &&
                    <Alert variant={'danger'}>
                        {this.state.errorMessage}
                    </Alert>
                }
                <Form onSubmit={this.onSendEmail.bind(this)}>
                    {!this.state.isSent &&
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
                    }
                    <FormGroup>
                        {this.state.isSending ?
                            <Spinner />
                            :
                            <CustomButton
                                className={'send-button'}
                                onClick={this.onSendEmail.bind(this)}
                            >
                                {this.state.isSent ?
                                    'Send Again'
                                    :
                                    'Send'
                                }
                            </CustomButton>
                        }
                    </FormGroup>

                    <Nav.Link
                        className={'back-link'}
                        onClick={this.onGoToLogin.bind(this)}
                    >
                        Back To Login
                    </Nav.Link>
                </Form>
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
