import { Subject, User, Question } from '../models';
import { validateInput, isSubject, matchesPassword } from './validate';
import { SubjectInput } from '../validators';

const create = async ({ userId, subjectName, password }) => {
  // validate inputs.
  validateInput({ subjectName, password }, SubjectInput.create);

  // create subject.
  const subject = await Subject.create({
    name: subjectName,
    admins: [userId],
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

  // delete subject.
  const subject = await Subject.findOneAndRemove(
    { _id: subjectId },
  );

  // extract questions users and admins.
  let { questions, users, admins } = subject;
  // map through objects and retrieve ids.
  users = users.map((item) => item._id);
  admins = admins.map((item) => item._id);

  // combine admins and users.
  users = Array.from(new Set(users.concat(admins)));

  // delete questions if array contains any ids.
  if (questions.length > 0) {
    questions = questions.map((item) => item._id);
    const removedQuestions = await Question.deleteMany({ _id: { $in: questions } });
  }

  // delete subject from users.
  const updatedUsers = await User.updateMany(
    { _id: { $in: users } },
    { $pull: { subjects: { subject: { _id: subjectId } } } },
  );

  if (subject && updatedUsers) return 'success';
  return 'error';
};

const feedback = async ({ subjectId, question }) => {
  // validate inputs.
  validateInput({ subjectId, question }, SubjectInput.feedback);

  // push question to admin questions.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $push: { feedback: question } },
    { new: true },
  );

  return 'success';
};

const clearFeedback = async ({ subjectId }) => {
  // validate inputs.
  validateInput({ subjectId }, SubjectInput.clearFeedback);

  // clear content.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $set: { feedback: [] } },
    { new: true },
  );
  return 'success';
};

const leave = async ({ userId, subjectId }) => {
  // validate inputs
  validateInput({ subjectId }, SubjectInput.leave);

  // remove user from subject and subject from user.
  const subject = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $pull: { users: userId } },
  );

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { subjects: { subject: { _id: subjectId } } } },
  );
  if (subject && user) return 'success';
  return 'error';
};

const find = async ({ subjectId }) => {
  const subject = await Subject.findOne({ _id: subjectId });
  return subject;
};

export {
  create, join, leave, remove, feedback, clearFeedback, find,
};
