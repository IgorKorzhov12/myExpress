const UserModel = require("../models/user-model");
const UserServise = require("../services/user-servise");
const JWTServise = require("../services/jwt-servise");
const UserDTO = require("../DataTransferObject/UserDTO");

class UserController {
  async registrationUser(req, res){
    try {
     const user = await UserServise.registration(req.body.email, req.body.name, req.body.age, req.body.password);
     const Token = await JWTServise.registrationToken(user._id);
     res.cookie("RefreshToken", Token.refreshToken, {
       httpOnly: true,
       maxAge: 10 * 24 * 60 * 60 * 1000,
     });
     const dtoObj = new UserDTO(user);
     res.status(201).send({user: dtoObj, acessToken: Token.acessToken});
    } catch(e) {
      res.status(400).send(e.message);
    }
  }

  async loginUser(req, res){
    try {
      const user = await UserServise.loginUser(req.body.email, req.body.password)
      const Token = await JWTServise.loginUser(user._id);
      res.cookie("RefreshToken", Token.refreshToken, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
      const dtoObj = new UserDTO(user);
      res.send({user: dtoObj, acessToken: Token.acessToken});
    } catch(e) {
      res.status(400).send(e.message);
    }
  }

  async getUsers(req, res) {
    const users = await UserModel.find({}, {email: 1, name: 1, age: 1});
    res.send(users);
  }

  async updateAccessToken(req, res) {
    try {
      const oldRefreshToken = req.cookies.RefreshToken;
      const tokens = await JWTServise.getNewTokens(oldRefreshToken);
      res.cookie("RefreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
      res.send(tokens.acessToken);
    } catch (e) {
      res.status(401).send("Login error");
    }
  }
}

module.exports = new UserController();