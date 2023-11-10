require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Connecting to mongodb
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDb connection error: ", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URL }));
}

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", userRoutes);

port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
