require("dotenv").config();
require("colors");
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3002;
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbpass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbhost = process.env.DATABASE_HOST || "localhost";
  const dbName = process.env.DATABASE_NAME || "lifetracker";
  const dbport = process.env.DATABASE_PORT || 5432;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbpass}@${dbhost}:${dbport}/${dbName}`
  );
}

const BCRYPT_WORK_FACTOR = 13;
console.log("name".green);
console.log("PORT".blue, PORT);
console.log("SECRET_KEY".blue, SECRET_KEY);
console.log("Database URI".magenta, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
