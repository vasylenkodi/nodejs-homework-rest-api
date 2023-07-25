const Jimp = require('jimp');

const resizeAvatar = async (avatarPath) => {
    console.log(avatarPath);
    Jimp.read(avatarPath, (err, avatar) => {
      if (err) throw err;
      avatar.cover(250, 250).write(avatarPath);
    });
}

module.exports = resizeAvatar;