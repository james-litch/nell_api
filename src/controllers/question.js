import { Question } from '../models';
import * as SubjectValidation from '../validators/subject';
import { subjectExists, isCreator, validateInput } from './validate';

const addQuestion = async ({
  userId, subjectId, question, answers, correctAnswer,
}) => {
  validateInput({
    userId, subjectId, question, answers, correctAnswer,
  }, SubjectValidation.addQuestion);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  const createdQuestion = await Question.create({ question, answers, correctAnswer });

  await subject.updateOne({ $addToSet: { questions: createdQuestion } });

  return 'success';
};

const getQuestions = (questions) => Question.find().where('_id').in(questions).exec();

const deleteQuestions = (questions) => {
// delete question
// delete all occurances
};

export {
  addQuestion,
  getQuestions,
  deleteQuestions,
};
