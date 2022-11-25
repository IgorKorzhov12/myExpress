const JWTServise = require("jsonwebtoken");

module.exports = function autorizationMiddleware(req, res, next) {
  try {
    const accessToken = req.headers.autorization.split(" ")[1];
    if (accessToken) {
      const userData = JWTServise.verify(accessToken, process.env.KEY_FOR_ACCESS_TOKEN);
      console.log(userData);
      next();
    }
    else {
      throw new Error("Inavlid token");
    }
  } catch (e) {
    next(e);
  }

}