const users = require("../../models/users");
const renameAvatar = require("../../helpers/renameAvatar");
const resizeAvatar = require("../../helpers/resizeAvatar");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const changeAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const id = res.locals.user._id;
    const fileName = renameAvatar(originalname, id);
    const avatarPath = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, avatarPath);
    await resizeAvatar(avatarPath);
    const avatarURL = path.join("avatars", fileName);
    const result = await users.updateAvatar(res.locals.user._id, avatarURL);
    res.json({
      status: "OK",
      code: 200,
      ResponseBody: {
        avatarURL,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      code: error.status,
    });
  }
};

module.exports = changeAvatar;
