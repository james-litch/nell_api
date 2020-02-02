import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  question: String,

  answers: [{ type: String }],

  correctAnswer: String,
},
{ timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
