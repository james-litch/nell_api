import { Schema, ObjectId } from 'mongoose';

const Exam = new Schema({
  name: String,

  description: String,

  questions: [{ type: ObjectId, ref: 'Question' }],
},
{ timestamps: true });

export default Exam;
