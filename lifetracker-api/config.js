require("dotenv").config();
require("colors");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDatabaseuri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbsecKey = process.env.SECRET_KEY;
  const dbpass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbhost = process.env.DATABASE_HOST || "localhost";
  const bcrypt = process.env.BCRYPT_WORK_FACTOR;
  const dbtname = process.env.DATABASE_TEST_NAME;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbpass}@${dbhost}:${dbsecKey}:${bcrypt}/${dbtname}`
  );
}
console.log("name".green);
console.log("PORT".blue, PORT);
console.log("Database URI".magenta, getDatabaseuri());
console.log("---");

module.exports = {
  PORT,
  getDatabaseuri,
};
