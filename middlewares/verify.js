const users = require('../models/users');
const HttpError = require('../helpers/HttpError');

const verify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isVerified = users.checkIfVerified(email);
        if (!isVerified) {
            throw HttpError(401, 'email is not verified');
        }
        next();
    } catch (error) {
        next(HttpError(401));
    }
}

module.exports = verify;