module.exports = class UserDTO {
  constructor(user) {
    this.email = user.email;
    this.name = user.name;
    this.age = user.age;
  }
}