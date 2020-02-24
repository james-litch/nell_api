import { validateInput } from './validate';
import { QuestionInput } from '../validators';
import { Question, Subject } from '../models';

const add = async ({
  userId, subjectId, question, answers, correctAnswer,
}) => {
  // validate inputs.
  validateInput({
    subjectId, question, answers, correctAnswer,
  }, QuestionInput.add);

  const answersObj = [];
  answers.forEach((answer) => { answersObj.push({ answer, totalChosen: 0 }); });

  // add question to questions.
  const createdQuestion = await Question.create({
    question, answers: answersObj, correctAnswer,
  });

  // add question to subjects
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $addToSet: { questions: createdQuestion._id } },
  );
  return createdQuestion;
};

const remove = () => {

};

const makeCurrent = () => {

};

const removeCurrent = () => {

};

export {
  add, remove, makeCurrent, removeCurrent,
};
