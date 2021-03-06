/* eslint-disable no-underscore-dangle */
import { Schema, model, ObjectId } from 'mongoose';
import { hash, compare } from 'bcryptjs';

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

  subjects: [
    {
      subject: { type: ObjectId, ref: 'Subject' },
      admin: Boolean,
      _id: false,
    },
  ],

  tokenCount: { type: Number, default: 0 },
},

{ timestamps: true });

// checks password against hashed password.
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

// populate document after find operation.
// userSchema.pre('find', function (next) {
//   this.populate('subjects.subject');
//   next();
// });

// populate document after find operation.
userSchema.pre('findOne', function (next) {
  this.populate('subjects.subject');
  next();
});

// hash password before saving user.
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// hash password after its been updated
userSchema.pre('updateOne', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  if (docToUpdate.password !== this._update.$set.password) {
    const newPassword = await hash(this._update.$set.password, 10);

    this._update.$set.password = newPassword;
  }
  next();
});

// static method for determining whether a field is in the database already
userSchema.statics.doesntExist = async function (options) {
  return await this.countDocuments(options) === 0;
};

const User = model('User', userSchema);

export default User;
