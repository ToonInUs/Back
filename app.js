const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

dotenv.config(); //process.env

/*--Middleware--*/

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }));

//built-in middleware for JSON
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
