import Firebase from 'firebase/app';
import FirebaseApp from './config';
import 'firebase/auth';

import DataFirebase from './DataFirebase';

import { dispatchAction } from '../Redux/Store';
import {
    authChanged
} from '../Redux/Actions/AuthActions';
import { setLoading } from '../Redux/Actions/CommonActions';
import { LOADING_MESSAGES } from '../Shared/Messages';

class AuthFirebase {
    constructor() {
        this.auth = FirebaseApp.auth();
        this.googleProvider = new Firebase.auth.GoogleAuthProvider();
        this.facebookProvider = new Firebase.auth.FacebookAuthProvider();

        this.listenChanges();
        this.getRedirectResult();
    }

    _updateUserInfo = (user, callback) => {
        DataFirebase.updateUserInfo(user.uid, {
            ...user,
            name: user.displayName
        }).then(callback);
    }

    _updateAuthReducer = (user) => {
        let {
            email,
            emailVerified,
            displayName,
            uid,
            phoneNumber,
            photoURL
        } = user || {};

        dispatchAction(authChanged(
            user ?
                ({
                    email,
                    emailVerified,
                    displayName,
                    uid,
                    phoneNumber,
                    photoURL
                })
                :
                null
        ));
    }

    _isRedirected(status) {
        let key = 'reDirected';
        if (status === undefined) {
            return eval(localStorage.getItem(key));
        } else if (status) {
            localStorage.setItem(key, status);
        } else {
            localStorage.removeItem(key);
        }
    }

    getRedirectResult = () => {
        if (this._isRedirected()) {
            dispatchAction(setLoading(true));
            this.auth.getRedirectResult()
                .then(result => {
                    this._isRedirected(false);
                    dispatchAction(setLoading(false));
                    if (result.credential) {
                        this._updateAuthReducer(result.user);
                        this._updateUserInfo(result.user);
                    }
                });
        }
    }

    listenChanges = () => {
        this.auth.onAuthStateChanged((user) => {
            this._updateAuthReducer(user);
        });
    }

    signInWithEmail = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then(resolve)
                .catch(reject);
        });
    }

    signUpWithEmail = (fullName, email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this._updateUserInfo(this.auth.currentUser, () => {
                        this._updateAuthReducer({
                            ...this.auth.currentUser,
                            displayName: fullName
                        });
                        this.auth.currentUser.updateProfile({
                            displayName: fullName
                        })
                        resolve();
                    });
                })
                .catch(reject);
        });
    }

    signInWithGoogle = () => {
        this._isRedirected(true);
        this.auth.signInWithRedirect(this.googleProvider);
    }

    signInWithFacebook = () => {
        this._isRedirected(true);
        this.auth.signInWithRedirect(this.facebookProvider);
    }

    sendForgotPasswordEmail = (email) => {
        return new Promise((resolve, reject) => {
            this.auth.sendPasswordResetEmail(email)
                .then(resolve)
                .catch(reject);
        });
    }

    logout = () => {
        this.auth.signOut();
    }
}

export default new AuthFirebase();