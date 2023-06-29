const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config.test");

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`❤️ Server running https://localhost:${PORT}`);
});
