const jwt = require("jsonwebtoken");
const SECRETKEY = "Emo7uatQ6FeUL91VW6uAgS00lOmweTB2";

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRETKEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT, SECRETKEY };
