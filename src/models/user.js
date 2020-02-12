/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  email: {
    type: String,

    validate: {
      validator: (email) => User.doesntExist({ email }),
      message: ({ value }) => `${value} has already been taken.`,
    },
  },
  name: String,

  password: String,

  subjects: [{ type: ObjectId, ref: 'Subject' }],

  tokenCount: { type: Number, default: 0 },
},

{ timestamps: true });

// hash password before saving user.
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

// hash password after its been updated
userSchema.pre('updateOne', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate.password !== this._update.$set.password) {
    console.log(this._update.$set.password);
    const newPassword = await hash(this._update.$set.password, 10);
    console.log(newPassword);
    this._update.$set.password = newPassword;
  }
});

// checks password against hashed password.
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

// static method for determining whether a field is in the database already
userSchema.statics.doesntExist = async function (options) {
  return await this.countDocuments(options) === 0;
};

const User = mongoose.model('User', userSchema);

export default User;
