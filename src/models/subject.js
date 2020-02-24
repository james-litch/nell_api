/* eslint-disable prefer-arrow-callback */
import { Schema, ObjectId, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { Exam, Definition } from './subdocs';

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
subjectSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// populate document after create operation.
subjectSchema.post('save', function (doc, next) {
  doc.populate('admin').execPopulate(function () {
    next();
  });
});

// checks password against hashed password.
subjectSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

// populate document after find operation.
subjectSchema.pre('find', function (next) {
  this.populate('users');
  this.populate('admin');
  this.populate('questions');
  this.populate('exams.questions');
  next();
});

subjectSchema.pre('findOne', function (next) {
  this.populate('users');
  this.populate('admin');
  this.populate('questions');
  this.populate('exams.questions');
  next();
});
// TODO: try and populate questions.
subjectSchema.post('findOne', function (doc, next) {
  doc.populate('exams.questions').execPopulate(function () {
    next();
  });
});

const Subject = model('Subject', subjectSchema);

export default Subject;
