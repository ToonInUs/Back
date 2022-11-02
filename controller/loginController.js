const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const roles = Object.values(foundUser.roles);

    //Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" } //30m
    );

    const refreshToken = jwt.sign(
      { _id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } //14d
    );

    //save refreshToken in DB
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    //console.log(result)

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      //secure: "true",
      maxAge: 24 * 60 * 60 * 1000, //24hours
    });
    res.json({ name: foundUser.username, accessToken });
  } else {
    //Unauthorized: wrong password
    res.status(401).json({ message: "Wrong password." });
  }
};

module.exports = { handleLogin };
