const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER LOGIC
exports.register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).send("User not found!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("Wrong password or username!");

    const token = jwt.sign(
  { id: user._id, isSeller: user.isSeller },
  process.env.JWT_KEY
);

    const { password, ...info } = user._doc;

    // Send the token inside the response body so the frontend can save it
    res.status(200).send({ ...info, token }); 
    
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};

// LOGOUT LOGIC
exports.logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).send("User has been logged out.");
};