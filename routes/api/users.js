const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const verify = require('../../middlewares/verify');
const ctrls = require("../../controllers/index");
const upload = require("../../middlewares/upload");

const usersRouter = express.Router();

usersRouter.post("/register", ctrls.users.register);

usersRouter.post("/login", verify, ctrls.users.login);

usersRouter.post("/logout", authenticate, ctrls.users.logout);

usersRouter.get("/current", authenticate, ctrls.users.current);

usersRouter.patch("/", authenticate, ctrls.users.updateSubscription);

usersRouter.get('/verify/:verificationToken', ctrls.users.verification);

usersRouter.post('/verify', ctrls.users.resendVerification);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrls.users.changeAvatar
);

module.exports = usersRouter;
