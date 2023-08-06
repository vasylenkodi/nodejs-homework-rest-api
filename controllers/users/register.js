const users = require('../../models/users');
const nanoid = require('nanoid');
const createAvatarUrl = require('../../helpers/createAvatarUrl');
const sendEmails = require('../../helpers/sendEmails');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const avatarURL = createAvatarUrl(email);
        const result = await users.addUser({
            email,
            password,
            avatarURL,
            verificationToken:`${nanoid()}`
        });
        await sendEmails(result);
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