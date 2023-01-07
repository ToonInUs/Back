const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 3000;

dotenv.config(); //process.env

/*--Middleware--*/
connectDB(); //MongoDB Connection

app.use(morgan("dev"));

//for Cross-Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }));

//built-in middleware for JSON
app.use(express.json());

//middleware for cookie parsing
app.use(cookieParser());

/*--Routes--*/
//회원가입 라우터
app.use("/new", require("./routes/register"));

//로그인, 로그아웃 라우터
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));

//Token 재발급
app.use("/refresh", require("./routes/refresh"));

app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("ToonInUs");
});

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
