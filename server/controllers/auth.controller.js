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

    // Generate the secret token
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    // Remove password from the data we send back
    const { password, ...info } = user._doc;

    // THE FIX: We create a NEW object that combine user info AND the token
    const responseData = {
      ...info,
      token: token
    };

    console.log("Sending to frontend:", responseData); // This will show in Render logs
    res.status(200).send(responseData); 
    
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
};
// LOGOUT LOGIC
exports.logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).send("User has been logged out.");
};