const TokenModel = require("../models/token-model");
const webToken = require("jsonwebtoken");

class JWTServise {
  async registrationToken(userId) {
    const refreshToken = webToken.sign({userId: userId}, process.env.KEY_FOR_REFRESH_TOKEN, {
      expiresIn: '10d',
    });
    const acessToken = webToken.sign({userId: userId}, process.env.KEY_FOR_ACCESS_TOKEN , {
      expiresIn: '60s',
    });
    await TokenModel.create({user: userId, refreshToken});
    return {
      acessToken,
      refreshToken,
    }
  }

  async loginUser(userId) {
    const refreshToken = webToken.sign({userId: userId}, process.env.KEY_FOR_REFRESH_TOKEN, {
      expiresIn: '10d',
    });
    const acessToken = webToken.sign({userId: userId}, process.env.KEY_FOR_ACCESS_TOKEN , {
      expiresIn: '60s',
    });
    await TokenModel.findByIdAndUpdate(userId, {user: userId, 'refreshToken': refreshToken});
    return {
      acessToken,
      refreshToken,
    }
  }

  async getNewTokens(refreshToken) {
    try {
      if (refreshToken) {
        const userData = webToken.verify(refreshToken, process.env.KEY_FOR_REFRESH_TOKEN);
        const tokens = await this.loginUser(userData.userId);
        return tokens;
      }
      else {
        throw new Error("Empty field");
      }
    } catch (e) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = new JWTServise();