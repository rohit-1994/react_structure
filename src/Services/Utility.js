class Utility {
    static isEmail = (email = '') => {
        let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(String(email).toLowerCase());
    }

    static isVlaidName = (name = '') => {
        let regex = /^[a-zA-Z]+/g;
        return regex.test(String(name));
    }
}

export default Utility;