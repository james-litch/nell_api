/* eslint-disable prefer-arrow-callback */
import { Schema, ObjectId, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { Exam, Definition } from './subdocs';

const subjectSchema = new Schema({
  name: String,

  password: String,

  users: [{ type: ObjectId, ref: 'User' }],

  admins: [{ type: ObjectId, ref: 'User' }],

  questions: [{ type: ObjectId, ref: 'Question' }],

  currentQuestions: [{ type: ObjectId, ref: 'Question' }],

  exams: [Exam],

  dictionary: [Definition],

  feedback: [{ type: String }],
},

{ timestamps: true });

// hash password before saving user.
subjectSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const autopopulate = function (next) {
  this.populate('users');
  this.populate('admins');
  this.populate('questions');
  this.populate('exams.questions');
  this.populate('currentQuestions');
  next();
};

// populate document after find operation.
subjectSchema
  .pre('find', autopopulate)
  .pre('findOne', autopopulate)
  .pre('update', autopopulate)
  .pre('save', autopopulate);

// populate document after create operation.
subjectSchema.post('save', function (doc, next) {
  doc
    .populate('users')
    .populate('admins')
    .populate('questions')
    .populate('exams.questions')
    .populate('currentQuestions')
    .execPopulate(function () {
      next();
    });
});

subjectSchema.post('update', function (doc, next) {
  doc
    .populate('users')
    .populate('admin')
    .populate('questions')
    .populate('exams.questions')
    .populate('currentQuestions')
    .execPopulate(function () {
      next();
    });
});

// checks password against hashed password.
subjectSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};


const Subject = model('Subject', subjectSchema);

export default Subject;
