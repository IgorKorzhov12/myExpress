const UserModel = require("../models/user-model");
const bcrypt = require('bcrypt');

class UserServise {
  async registration(email, name, age, password) {
      let user = await UserModel.findOne({email: email});
      if (user) throw new Error("Email error");
      const hashedPassword = await bcrypt.hash(password, 3);
      user = await UserModel.create({email: email, name: name, age: age, password: hashedPassword});
      return user;
  }

  async loginUser(email, password) {
    let user = await UserModel.findOne({email: email});
    if (!user) throw new Error("User didnt found. Data error");
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === false) throw new Error("Eror password");
    });
    return user;
  }
}

module.exports = new UserServise();