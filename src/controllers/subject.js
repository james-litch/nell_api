import { Subject, User } from '../models';
import { validateInput, isSubject, matchesPassword } from './validate';
import { SubjectInput } from '../validators';

const create = async ({ userId, subjectName, password }) => {
  // validate inputs.
  validateInput({ subjectName, password }, SubjectInput.create);

  // create subject.
  const subject = await Subject.create({
    name: subjectName,
    admin: userId,
    password,
  });

  // add subject to user.
  const subjectObj = { subject: subject._id, admin: true };

  await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { subjects: subjectObj } },
  );

  return subject;
};

const join = async ({ userId, subjectId, password }) => {
  // validate inputs.
  validateInput({ subjectId, password }, SubjectInput.join);

  // check if subject exists.
  const subject = await isSubject(subjectId);

  // check if passwords match.
  await matchesPassword(subject, password);

  // add user to subjectband subject to user.

  await Subject.findOneAndUpdate({ _id: subjectId }, { $addToSet: { users: userId } });
  const subjectObj = { subject: subject._id, admin: false };
  await User.findOneAndUpdate({ _id: userId }, { $addToSet: { subjects: subjectObj } });

  return subject;
};

const remove = async ({ subjectId }) => {
  // validate inputs.
  validateInput({ subjectId }, SubjectInput.remove);
};

const ask = async ({ subjectId, question }) => {
  // validate inputs.
  validateInput({ subjectId, question }, SubjectInput.ask);

  // push question to admin questions.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $push: { adminQuestions: question } },
    { new: true },
  );

  return 'success';
};

const clearAsk = async ({ subjectId }) => {
  // validate inputs.
  validateInput({ subjectId }, SubjectInput.clearAsk);

  // clear content.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $set: { adminQuestions: [] } },
    { new: true },
  );
  return 'success';
};

export {
  create, join, remove, ask, clearAsk,
};
