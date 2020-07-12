const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    // validate
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({
        message: "All the fields are not entered!!",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        message: "Password is too short!!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match!!",
      });
    }

    if (name.length < 5) {
      return res.status(400).json({
        message: "User name is too short!!",
      });
    }

    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with the same email address is already registered!!",
      });
    }

    // generate hash password
    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);

    // new user object
    const newUser = new User({
      email: email,
      password: encryptPassword,
      name: name,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.code(500).json({ error: err.message });
  }
});

module.exports = router;
