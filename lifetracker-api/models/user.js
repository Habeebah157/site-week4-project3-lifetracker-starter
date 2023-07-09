"user strict";
const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");
const { BCRYPT_WORK_FACTOR } = require("../config");
class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }

  //helps method that processes user's login
  static async login(credentials) {
    const { email, password } = credentials;
    const requiredField = ["email", "password"];
    requiredField.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    const user = await User.fetchUserByEmail(email);
    console.log("user", user);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }
  static async register(credentials) {
    //pulling out all the variable from requestbody brought in as credentials
    const { username, password, firstName, lastName, email } = credentials;
    const requiredField = [
      "username",
      "password",
      "firstName",
      "lastName",
      "email",
    ];
    try {
      validateFields({
        required: requiredField,
        obj: credentials,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    requiredField.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email");
    }
    console.log(email);
    const existingUser = await User.fetchUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const lowercasedEmail = email.toLowerCase();

    //how we enter into the database. We want to insert info to the database.
    const result = await db.query(
      `
        INSERT INTO users(
            username,
            password,
            first_name,
            last_name,
            email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, first_name, last_name, created_at, updated_at, email
        `,

      //this has to be in order
      [username, hashedPassword, firstName, lastName, lowercasedEmail]
    );
    const user = result.rows[0];
    return user;
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}
module.exports = User;
