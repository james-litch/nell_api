import { subjectExists, isCreator, validateInput } from './validate';
import { SubjectValidation } from '../validators';

const addCurrentQuestion = async ({
  userId, subjectId, questionId, description,
}) => {
  validateInput({
    userId, subjectId, questionId, description,
  }, SubjectValidation.addCurrentQuestion);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  const currentQuestion = await subject.updateOne({ $addToSet: { currentQuestions: {} } });
};

const removeCurrentQuestion = () => {

};

const answerCurrentQuestion = () => {

};


export {
  addCurrentQuestion,
  removeCurrentQuestion,
};
