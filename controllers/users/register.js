const users = require('../../models/users');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await users.addUser({
            email,
            password
        });
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