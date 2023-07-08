const express = require("express");
const security = require("../middleware/security");
const Nutrition = require("../models/nutrition");
const router = express.Router();

router.post(
  "/nutrient",
  security.requireAuthenticationUser,
  async (req, res, next) => {
    try {
      //create a new activity
      const { user } = res.locals;
      console.log("hello", user);
      console.log("req", req.body);
      const NutritionPost = await Nutrition.createNewNutritionData(
        req.body,
        user
      );

      return res.status(201).json({ NutritionPost });
    } catch (err) {
      next(err);
    }
  }
);

// security.requireAuthenticationUser

router.get("/", async (req, res, next) => {
  try {
    const posts = await Nutrition.listNutritionData();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
