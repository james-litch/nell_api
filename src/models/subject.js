import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const { ObjectId } = Schema.Types;

const subjectSchema = new Schema({
  name: String,
  creator: {
    type: ObjectId,
    ref: 'User',
  },

  password: String,

  users: [{
    type: ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// hash password before saving user.
subjectSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

// checks password against hashed password.
subjectSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
