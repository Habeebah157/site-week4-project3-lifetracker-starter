// const authRoutes = require("./routes/auth");
const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
