const jwt = require("jsonwebtoken");

const createJWT = async (res, foundUser) => {
  //create JWTs
  const roles = Object.values(foundUser.roles);
  const accessToken = jwt.sign(
    {
      UserInfo: {
        _id: foundUser._id,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" } //30min
  );

  const refreshToken = jwt.sign(
    { _id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" } //14d
  );

  //save refreshToken in DB
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  //console.log(result);

  //response
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    //secure:"true",
    maxAge: 24 * 60 * 60 * 1000, //24hours
  });
  res.json({ name: foundUser.username, accessToken });
};

module.exports = { createJWT };
