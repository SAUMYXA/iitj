const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User1 = require("../model/User");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = User1({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User1.findOne({ email: req.body.email });
    !user && res.status(401).json("Email or Username not found!");
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(400).json("Wrong Password");
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const { password, ...info } = user._doc;
    res.status(201).json({...info, accessToken});
  } catch (error) {
    res.status(500).json(error);

  }
});
module.exports = router;
