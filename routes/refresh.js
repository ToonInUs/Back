const express = require("express");
const router = express.Router();

const refreshTokenController = require("../controller/refreshTokenController");

//accessToken 재발급
router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
