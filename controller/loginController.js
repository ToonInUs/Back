const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {createJWT} = require("../controller/createJWT")
const handleLogin = async (req, res) => {
  const { mail, pwd } = req.body;
  if (!mail || !pwd) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  //Check email
  const foundUser = await User.findOne({ email: mail }).exec();
  if (!foundUser) {
    //Unauthorized: wrong email
    return res.status(401).json({ message: "Email not found." });
  }

  //Evaluate password
  const comparePwd = await bcrypt.compare(pwd, foundUser.password);
  if (comparePwd) {
    createJWT(res,foundUser);
  } else {
    //Unauthorized: wrong password
    res.status(401).json({ message: "Wrong password." });
  }
};

module.exports = { handleLogin };
