import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const { ObjectId } = Schema.Types;

const subjectSchema = new Schema({
  name: String,

  creator: { type: ObjectId, ref: 'User' },

  password: String,

  users: [{ type: ObjectId, ref: 'User' }],

  questions: [{ type: ObjectId, ref: 'Question' }],

  // TODO: figure this out
  currentQuestions: [{ description: String, question: { type: ObjectId, ref: 'Question' } }],

  exams: [{ name: String, description: String, questions: [{ type: ObjectId, ref: 'Question' }] }],

  dictionary: [{ phrase: String, definition: String }],

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

// checks if user is the creator of a subject.
subjectSchema.methods.isCreator = function (userId) {
  return this.creator.equals(userId);
};

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
