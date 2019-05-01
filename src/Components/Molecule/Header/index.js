import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import { showAuthModal } from '../../../Redux/Actions/AuthActions';
import { AuthTab } from '../../../Config';
import {
    Navbar,
    Nav,
    Dropdown
} from 'react-bootstrap';
import { IoIosBasket, IoIosHeartEmpty } from 'react-icons/io';
import { FaComment } from 'react-icons/fa';
import RouterService from '../../../Services/RouterService';
import { RouteConfig } from '../../../Config/RouteConfig';
import { AppConstants } from '../../../Shared/Constants';
import CustomButton from '../../Atom/CustomButton';
import AuthFirebase from '../../../Firebase/AuthFirebase';

class ProfileLink extends React.PureComponent {
    render() {
        return (
            <Nav.Link className={'profile-link'} onClick={this.props.onClick.bind(this)}>
                <span>{this.props.children}</span>
            </Nav.Link>
        );
    };
}

class Header extends React.PureComponent {
    onLogout() {
        AuthFirebase.logout();
    }

    onShowAuthModal(tabIndex) {
        this.props.showAuthModal(true, tabIndex);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="sm" className={'navbar justify-content-between'}>
                <Nav.Link className={'logo-link'} onClick={RouterService.pushRoute.bind(null, RouteConfig.LANDING)}>
                    <Navbar.Brand>
                        <span className={'name-title'}>{AppConstants.APP_NAME}</span>
                    </Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className={'nav-link-wrapper justify-content-end'}>
                    <Nav className={'align-items-center'}>
                        <Nav className={'normal-links'}>
                            {this.props.isLoggedIn &&
                                <Nav.Link style={{ borderRightWidth: 1 }}>
                                    <FaComment size={25} />
                                </Nav.Link>
                            }
                            <Nav.Link>
                                <IoIosBasket size={25} />
                            </Nav.Link>
                            <Nav.Link className={'last-link'}>
                                <IoIosHeartEmpty size={25} />
                            </Nav.Link>
                        </Nav>

                        {!this.props.isLoggedIn ?
                            <Nav.Link
                                className={'login-link'}
                                onClick={() => {
                                    if (this.props.isLoggedIn) {

                                    } else {
                                        this.onShowAuthModal(AuthTab.LOGIN.id);
                                    }
                                }}>
                                Login
                            </Nav.Link>
                            :
                            <Dropdown>
                                <Dropdown.Toggle as={ProfileLink}>{this.props.user.displayName}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => { }}>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.onLogout.bind(this)}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                        {!this.props.isLoggedIn &&
                            <CustomButton
                                onClick={this.onShowAuthModal.bind(this, AuthTab.SIGNUP.id)}
                            >
                                Signup
                            </CustomButton>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        );
    };
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn,
        user: state.AuthReducer.user
    };
}

export default connect(mapStateToProps, { showAuthModal })(Header);