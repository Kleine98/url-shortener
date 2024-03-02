require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3500;

app.set("view engine", "ejs");

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

// Enable CORS
//app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Root route
app.use("/", require("./routes/root"));

// URL Shortening route
app.use("/url", require("./routes/urlRoutes"));

// 404 Handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.render(path.join(__dirname, "views", "404"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error Handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
