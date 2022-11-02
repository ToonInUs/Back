const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 3000;

dotenv.config(); //process.env

/*--Middleware--*/
connectDB(); //MongoDB Connection

app.use(morgan("dev"));

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }));

//built-in middleware for JSON
app.use(express.json());

//middleware for cookie parsing
app.use(cookieParser());

/*--Error Handling--*/
//custom 404
app.use(function (req, res, next) {
  res.status(404).send("404 Not Found");
});

//cutom error(500) handling middleware
//After everything even 404
app.use(errorHandler);

//MongoDB Error
mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection Error", error);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
