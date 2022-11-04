const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401); //Unauthorized
  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }

  //evaluate refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || !foundUser._id.equals(decoded._id)) {
      return res.sendStatus(403); //Forbidden
    }

    //accessToken 재발급
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: decoded._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" } //30min
    );

    res.json({ name: foundUser.username, accessToken });
  });
};

module.exports = { handleRefreshToken };
