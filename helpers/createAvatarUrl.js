const gravatar = require('gravatar');

const createAvatarUrl = (email) => {
    return gravatar.url(email, {protocol: 'https'});
}

module.exports = createAvatarUrl;