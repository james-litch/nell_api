import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,

    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `${value} has already been taken.`
      // TODO: security
    }
  },
  name: String,

  password: String

}, {
  timestamps: true
})

// hash password before saving user.
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

// checks password against hashed password.
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

// static method for determining whether a field is in the database already
userSchema.statics.doesntExist = async function (options) {
  return await this.countDocuments(options) === 0
}

const User = mongoose.model('User', userSchema)

export default User
