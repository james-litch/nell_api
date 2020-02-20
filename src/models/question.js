import { Schema, ObjectId, model } from 'mongoose';

const questionSchema = new Schema({
  question: String,

  answers: [{ answer: String, totalChosen: { type: Number, default: 0 }, _id: false }],

  correctAnswer: Number,

  currentQuestion: { type: Boolean, default: false },

  answeredBy: [{ type: ObjectId, ref: 'User' }],
},
{ timestamps: true });

const Question = model('Question', questionSchema);

export default Question;
