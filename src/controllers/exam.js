import { validateInput } from './validate';
import { ExamInput } from '../validators';
import { Subject } from '../models';

const create = async ({
  userId, subjectId, name, description, questions,
}) => {
  // validate inputs.
  validateInput({
    subjectId, name, description, questions,
  }, ExamInput.create);

  // add exam to subject.

  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $push: { exams: { name, description, questions } } },
    { new: true },
  );
  if (update) return 'success';
  return 'error';
};

const remove = async ({ userId, subjectId, examIds }) => {
  // validate inputs.
  validateInput({ subjectId, examIds }, ExamInput.remove);

  // remove exams from subject.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $pull: { exams: { _id: { $in: examIds } } } },
    { new: true },
  );
  return 'success';
};

const find = async ({ subjectId, examId }) => {
  // validate inputs.

  // find subject.
  const subject = await Subject.findOne(
    { _id: subjectId },
  );

  // find specific exam.
  const exam = subject.exams.find((item) => item._id.toString() === examId);

  return exam;
};

export {
  create, remove, find,
};
