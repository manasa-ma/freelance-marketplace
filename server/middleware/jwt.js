const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;
  
  console.log("--- Auth Check ---");
  console.log("Token received in header:", token ? "YES (hidden for security)" : "NO");

  if (!token) {
    console.log("Result: Access Denied (No Token)");
    return res.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.log("Result: Access Denied (Invalid Token)");
      return res.status(403).send("Token is not valid!");
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    console.log("Result: Access Granted for User:", req.userId);
    next();
  });
};