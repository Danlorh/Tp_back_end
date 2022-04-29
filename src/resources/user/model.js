export class UserModel {
  constructor() {
    this.users = []
    this.id = 0
  }

  create(user) {
    user.id = this.id
    this.users.push(user)
    console.log(user)
    this.id += 1
  }

  findById(id) {}

  checkPassword(id, password) {} // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {} // hint: make use of bcrypt to hash password i.e: bcrypt.hash
}
