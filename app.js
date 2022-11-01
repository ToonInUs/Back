const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

dotenv.config(); //process.env

/*--Middleware--*/
app.use(morgan("dev"));

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }));

//built-in middleware for JSON
app.use(express.json());

/*--Error Handling--*/
//custom 404
app.use(function (req, res, next) {
  res.status(404).send("404 Not Found");
});

//cutom error(500) handling middleware
//After everything even 404
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
