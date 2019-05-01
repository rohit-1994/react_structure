import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import { showAuthModal } from '../../../Redux/Actions/AuthActions';
import { AuthTab } from '../../../Config';
import Login from '../../Cell/Login';
import Signup from '../../Cell/Signup';
import ForgotPassword from '../../Cell/ForgotPassword';
import {
    Col,
    Modal,
    Tabs,
    Tab
} from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const AuthUIProvider = ({
    authModalVisible,
    activeTabId,
    showAuthModal,
    children
}) => {

    let activeTabKey = Object.keys(AuthTab).find(key => AuthTab[key].id === activeTabId);
    let activeTab = AuthTab[activeTabKey];

    const onHide = () => {
        showAuthModal(false);
    }

    return (
        <div>
            {children}
            <Modal
                style={{ padding: 0 }}
                centered
                show={authModalVisible}
                onHide={onHide}
                dialogClassName={'auth-modal-wrapper'}
                dialogAs={() => (
                    <div className={'auth-modal'}>
                        <Col className={'modal-content'} xs={12} sm={8} md={6} lg={4}>
                            <div className={'close-btn-wrapper'}>
                                <button className={'close-btn'} onClick={onHide}>
                                    <FaTimes className={'close-btn-icon'} />
                                </button>
                            </div>
                            {activeTabId === AuthTab.FORGOT_PASSWORD.id ?
                                <ForgotPassword />
                                :
                                <Tabs defaultActiveKey={activeTab.event}>
                                    <Tab tabClassName={'tab'} eventKey={AuthTab.LOGIN.event} title={AuthTab.LOGIN.title}>
                                        <Login />
                                    </Tab>
                                    <Tab tabClassName={'tab'} eventKey={AuthTab.SIGNUP.event} title={AuthTab.SIGNUP.title}>
                                        <Signup />
                                    </Tab>
                                </Tabs>
                            }
                        </Col>
                    </div>
                )}
            >
            </Modal>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authModalVisible: state.AuthReducer.authModalVisible,
        activeTabId: state.AuthReducer.activeAuthTabId
    };
}

export default connect(mapStateToProps, { showAuthModal })(AuthUIProvider);