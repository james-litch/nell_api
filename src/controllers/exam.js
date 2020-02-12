import * as SubjectValidation from '../validators/subject';
import { subjectExists, isCreator, validateInput } from './validate';

const createExam = async ({
  userId, subjectId, name, description, questions,
}) => {
  validateInput({
    userId, subjectId, name, description, questions,
  }, SubjectValidation.createExam);

  // check module exists
  const subject = await subjectExists(subjectId);

  // check user is creator
  await isCreator(userId, subject);

  // TODO: check questions are all in subjects question bank

  const exam = await subject.updateOne({ $addToSet: { exams: { name, description, questions } } });

  return 'success';
};
const deleteExams = async ({ userId, subjectId, exams }) => {
  validateInput({
    userId, subjectId, exams,
  }, SubjectValidation.deleteExam);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  subject.updateMany({ $pull: { exams: { id: { $in: exams } } } });

  return 'success';
};


export {
  createExam,
  deleteExams,
};
