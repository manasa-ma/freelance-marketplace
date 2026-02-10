const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Look for 'token' in the request headers
  const token = req.headers.token;
  
  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};