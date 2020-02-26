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

const addCurrent = async ({ subjectId, questionId }) => {
  // validate inputs.
  validateInput({ subjectId, questionId }, QuestionInput.addCurrent);

  // add question id to currentQuestions.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $addToSet: { currentQuestions: questionId } },
    { new: true },
  );
  if (update) return 'success';
  return 'error';
};

const removeCurrent = async ({ subjectId }) => {
  // validate inputs.
  validateInput({ subjectId }, QuestionInput.removeCurrent);

  // add question id to currentQuestions.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $set: { currentQuestions: [] } },
    { new: true },
  );
  if (update) return 'succsess';
  return 'error';
};

const answer = async ({
  userId, subjectId, questionId, answerIndex,
}) => {
  // validate inputs.
  validateInput({ subjectId, questionId, answerIndex }, QuestionInput.answer);
  const ansIndex = {};
  ansIndex[`answers.${answerIndex}.totalChosen`] = 1;


  // increment answer index total add user to aswered by.
  const update = await Question.findOneAndUpdate(
    { _id: questionId },
    {
      $inc: ansIndex,
      $addToSet: { answeredBy: userId },
    },
    { new: true },
  );
  return update;
};

export {
  add, remove, addCurrent, removeCurrent, answer,
};
