const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Sleep {
  static async listSleepData() {
    const results = await db.query(
      `SELECT p.id,
                p.start_time,
                p.end_time,
                p.dateof
                FROM sleep AS p
                ORDER BY id DESC`
    );
    return results.rows;
  }
  static async createNewSleepData(post, user) {
    const { start_time, end_time, dateof } = post;
    const requiredField = ["start_time", "end_time", "dateof"];
    requiredField.forEach((field) => {
      if (!post.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field ${field} missing from request body`
        );
      }
    });
    const results = await db.query(
      `INSERT INTO sleep(start_time, end_time, dateof)
            VALUES($1,$2,$3)
            RETURNING id, start_time, end_time, dateof`,
      [post.start_time, post.end_time, post.dateof]
    );
    console.log("sleepiinfor", results.rows[0]);
    return results.rows[0];
  }
}

module.exports = Sleep;
