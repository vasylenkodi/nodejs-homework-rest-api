const users = require('../../models/users');
const createAvatarUrl = require('../../helpers/createAvatarUrl');

const register = async (req, res, next) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const avatarURL = createAvatarUrl(email);
        console.log(avatarURL);
        const result = await users.addUser({
            email,
            password,
            avatarURL,
        });
        console.log(result);
        res.json({
            status: 'created',
            code: 201,
            data: {
                user: result
            }
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message,
            code: error.status,
        })
    }
}

module.exports = register;