const { get } = require("http");
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
// const nutrition =
class Nutrition {
  static async listNutritionData() {
    const results = await db.query(
      `SELECT p.id,
              p.name,
              p.category, 
              p.calories,
              p.image_url,
              p.user_id,
              p.created_at,
              p.quantity
              FROM nutrition AS p
                JOIN users AS u ON u.id = p.user_id
                  ORDER BY p.created_at DESC
              
              `
    );
    return results.rows;
  }
  //put i user
  // static async getId(email) {
  //   const results = await db.query(`SELECT id FROM users WHERE email = $1`, [
  //     email,
  //   ]);

  //   console.log("RES", results.rows);
  //   return results.rows[0];
  // }

  static async createNewNutritionData(post, user) {
    const { name, category, email, calories, imageUrl } = post;
    const requiredField = ["name", "category", "quantity", "calories"];
    requiredField.forEach((field) => {
      if (!post.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field ${field} missing from request body`
        );
      }
    });

    // fetch user by email and return
    // console.log("USER EMAILL:", user.email);
    // const getid2 = await Nutrition.getId(user.email);
    // console.log("USERID:", getid2);
    //It has to match based on the

    //insert is basically saying I want to put something in the database
    console.log(user.id);
    const results = await db.query(
      `
      INSERT INTO nutrition(name, category, calories, image_url, user_id, quantity)
      VALUES ($1, $2, $3, $4, $5,$6) 
      RETURNING id, 
                name, 
                category,
                calories, 
                image_url, 
                user_id, 
                created_at,
                quantity
      `,
      [
        post.name,
        post.category,
        post.calories,
        post.image_url,
        user.id,
        post.quantity,
      ]
    );
    console.log(results.rows[0]);
    return results.rows[0];
  }
}

module.exports = Nutrition;
