import { Schema, ObjectId, model } from 'mongoose';

const questionSchema = new Schema({
  question: String,

  answers: [{ answer: String, totalChosen: { type: Number, default: 0 }, _id: false }],

  correctAnswer: Number,

  answeredBy: [{ type: ObjectId, ref: 'User' }],
},
{ timestamps: true });

const autopopulate = function (next) {
  this.populate('answeredBy');
  next();
};

questionSchema
  .pre('find', autopopulate)
  .pre('update', autopopulate)
  .pre('save', autopopulate)
  .pre('findOneAndUpdate', autopopulate)
  .pre('findOne', autopopulate);


const Question = model('Question', questionSchema);

export default Question;
