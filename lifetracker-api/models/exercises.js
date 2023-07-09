const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Exercise {
  static async listExerciseData() {
    const results = await db.query(
      `SELECT p.id,
                    p.name,
                    p.category,
                    p.duration, 
                    p.intensity, 
                    p.created_at
                    FROM exercise AS p
                        ORDER BY p.created_at DESC
                    `
    );
    return results.rows;
  }
  //creates new user with the router and sends it back to the router.
  static async createNewExerciseData(post, user) {
    const { name, category, duration, intensity } = post;
    const requiredField = ["name", "category", "duration", "intensity"];
    requiredField.forEach((field) => {
      if (!post.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field ${field} missing from request body`
        );
      }
    });

    const results = await db.query(
      `INSERT INTO exercise(name, category, duration, intensity)
        VALUES($1, $2, $3, $4)
        RETURNING id,name,category, duration,intensity, created_at`,
      [post.name, post.category, post.duration, post.intensity]
    );
    console.log("exerciseinfo", results.rows[0]);
    return results.rows[0];
  }
}

module.exports = Exercise;
