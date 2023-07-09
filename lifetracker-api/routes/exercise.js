const express = require("express");
const security = require("../middleware/security");
const Exercise = require("../models/exercises");
const router = express.Router();

router.post(
  "/exercise",
  security.requireAuthenticationUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const ExercisePost = await Exercise.createNewExerciseData(req.body, user);
      return res.status(201).json({ ExercisePost });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const posts = await Exercise.listExerciseData();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
