import FirebaseApp from './config';
import 'firebase/database';

class DataFirebase {
    constructor() {
        this.database = FirebaseApp.database();
    }

    setOnline(uid, status) {
        this.database.ref('online/' + uid);
    }

    updateUserInfo(uid, { email,refreshToken, name }) {
        return this.database.ref().update({
            [`users/${uid}`]: {
                uid,
                email,
                name,
                token: refreshToken
            }
        });
    }
}

export default new DataFirebase();