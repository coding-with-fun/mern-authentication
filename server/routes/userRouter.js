const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const User = require("../models/userModel");

function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// registering new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    // validate
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({
        message: "All the fields are not entered!!",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Email address is not valid!!",
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
    res.status(500).json({ error: err.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({
        message: "All the fields are not entered!!",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Email address is not valid!!",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User with the entered email address does not exist!!",
      });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res.status(400).json({
        message: "The entered password does not match with our database!!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
