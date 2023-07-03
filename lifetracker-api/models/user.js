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
  static async login(credentials) {
    const { email, password } = credentials;
    const requiredField = ["email", "password"];
    requiredField.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    const user = await User.fetchUserByEmail(email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }
  static async register(credentials) {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      created_at,
      updated_at,
      id,
    } = credentials;
    const requiredField = [
      "username",
      "password",
      "first_name",
      "last_name",
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
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const lowercasedEmail = email.toLowerCase();
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
        RETURNING id, username, password, first_name, last_name, created_at, updated_at
        `,
      [username, hashedPassword, first_name, last_name, email]
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
