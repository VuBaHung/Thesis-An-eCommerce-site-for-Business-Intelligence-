const jwt = require("jsonwebtoken");
const authAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Authentication is not valid!" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, admin) => {
      if (error) {
        return res.status(400).json({ msg: "Authentication is not valid!" });
      } else {
        req.admin = admin;
        // res.json({ seller });
        next();
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: error.response });
  }
};
module.exports = authAdmin;
