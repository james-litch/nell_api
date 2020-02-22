import { Schema, ObjectId, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { Question, Exam, Definition } from './subdocs';

const subjectSchema = new Schema({
  name: String,

  password: String,

  users: [{ type: ObjectId, ref: 'User' }],

  admin: { type: ObjectId, ref: 'User' },

  questions: [{ type: ObjectId, ref: 'Question' }],

  exams: [Exam],

  dictionary: [Definition],

  creatorQuestions: [{ type: String }],
},

{ timestamps: true });

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

// populate document after find operation.
subjectSchema.pre('find', function () {
  this.populate('users');
  this.populate('admin');
});

const Subject = model('Subject', subjectSchema);

export default Subject;
