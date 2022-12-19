const express = require("express");
const router = express.Router();

const User = require("../model/User");
const registerController = require("../controller/registerController");

//회원가입
router.post("/", registerController.handleNewUser);

//이메일 중복 확인
router.get("/mail/:mail", async (req, res) => {
  const mail = req.params.mail;
  const duplicate = await User.findOne({ email: mail }).exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Email: ${mail} is already exist.` }); //Conflict
  }
  return res.status(200).json({ message: `You can use ${mail}.` });
});

//닉네임 중복 확인
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  console.log(name);
  const duplicate = await User.findOne({ username: name }).exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Username: ${name} is already exist.` }); //Conflict
  }
  return res.status(200).json({ message: `You can use ${name}.` });
});

module.exports = router;
