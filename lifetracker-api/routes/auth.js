const express = require("express");
const User = require("../models/user");
const router = express.Router();
const security = require("../middleware/security");
const { createdUserJwt } = require("../utils/tokens");

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body);
    const token = createdUserJwt(user);
    // localStorage.setItem("token",token)
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});
router.post("/register", async function (req, res, next) {
  try {
    //take from request body like postman
    // the user model or model in general is to interact with the data base (sql)
    const user = await User.register(req.body);
    console.log("NEW USER", user);
    const token = createdUserJwt(user);
    console.log("TOKEN", token);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/me",
  security.requireAuthenticationUser,
  async function (req, res, next) {
    try {
      console.log("HELLO");
      const { email } = res.locals.user;
      const user = await User.fetchUserByEmail(email);
      console.log("ME", user);
      const publicUser = await User.makePublicUser(user);
      console.log("/me pubuser", publicUser);
      return res.status(200).json({ user: publicUser });
    } catch (err) {
      console.log("Error".red);
      next(err);
    }
  }
);

module.exports = router;
