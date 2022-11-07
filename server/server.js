require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

//routes
const users = require("./routes/userRoutes");
const notes = require("./routes/noteRoutes");
const auth = require("./routes/authRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/auth", auth);
app.use("/users", users);
app.use("/notes", notes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("DB connected successfully"))
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
