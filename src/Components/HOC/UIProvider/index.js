import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Spinner from '../../Atom/Spinner';
import { LOADING_MESSAGES } from '../../../Shared/Messages';

const UIProvider = ({
    loading,
    loadingMessage,
    children
}) => {
    return (
        <div>
            {children}
            <Modal
                show={loading}
                size={'sm'}
                centered
                onHide={() => { }}
                dialogAs={() => (
                    <div className={'loader-container'}>
                        <div className={'loader-wrapper'}>
                            <Spinner className={'spinner'} />
                            <span className={'message'}>{loadingMessage || LOADING_MESSAGES.LOADING}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.CommonReducer.loading,
        loadingMessage: state.CommonReducer.loadingMessage
    };
}

export default connect(mapStateToProps)(UIProvider);