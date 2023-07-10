const express = require("express");
const security = require("../middleware/security");
const Sleep = require("../models/sleeps");
const router = express.Router();

router.post(
  "/sleepPost",
  security.requireAuthenticationUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const SleepPost = await Sleep.createNewSleepData(req.body, user);
      return res.status(201).json({ SleepPost });
    } catch (err) {
      next(err);
    }
  }
);
router.get("/", async (req, res, next) => {
  try {
    const posts = await Sleep.listSleepData();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
