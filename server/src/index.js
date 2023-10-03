const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const routers = require("./routes");
const handleError = require("./middlewares/handleError");
const connectDB = require("./configs/connectDB.config");
require("dotenv").config();

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

routers(app);

handleError(app);

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
