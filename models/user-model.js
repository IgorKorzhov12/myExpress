const {Schema, model} = require("mongoose");

const UserSchema = new Schema ({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  name: {type : String, required: true},
  age: {type: Number},
})

module.exports = model("user", UserSchema);