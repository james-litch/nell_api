import mongoose from 'mongoose';
import { Subject, User } from '../models';
import * as SubjectValidation from '../validators/subject';
import { subjectExists, validateInput, matchesPassword } from './validate';

const { ObjectId } = mongoose.Types;

const subjectsFromIds = (subjects) => Subject.find().where('_id').in(subjects).exec();

const joinSubject = async ({ id, password, userId }) => {
  // validate inputs
  validateInput({ subjectId: id, password }, SubjectValidation.joinSubject);

  // check subject exists
  const subject = await subjectExists(id);

  await matchesPassword(subject, password);

  // add subject to users subjects and user to subjects users.
  await User.findOneAndUpdate({ _id: userId }, { $addToSet: { subjects: subject } });
  await subject.updateOne({ $addToSet: { users: userId } });

  return subject;
};

const createSubject = async ({ name, password, user }) => {
  validateInput({ name, password }, SubjectValidation.createSubject);

  const subject = await Subject.create({ name, creator: user.id, password });

  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });

  return subject;
};

const getSubject = async (id) => subjectExists(id);

const leaveSubject = async ({ userId, subjectId }) => {
  validateInput({ userId, subjectId }, SubjectValidation.leaveSubject);

  const user = ObjectId(userId);
  const subject = ObjectId(subjectId);

  try {
    // remove subject from user
    await Subject.findOneAndUpdate({ _id: subjectId }, { $pull: { users: user } });
    // remove user from subject
    await User.findOneAndUpdate({ _id: userId }, { $pull: { subjects: subject } });
  } catch (err) {
    console.log(err);
  }

  return 'success';
};

const askCreator = async ({ userId, subjectId, question }) => {
  validateInput({ userId, subjectId, question }, SubjectValidation.askCreator);

  const subject = await subjectExists(subjectId);

  // TODO: check in subject

  await subject.updateOne({ $addToSet: { creatorQuestions: question } });

  return 'success';

  //
};

const clearAskCreator = () => {
// check creator
};

export {
  joinSubject,
  createSubject,
  subjectsFromIds,
  getSubject,
  leaveSubject,
  askCreator,
  clearAskCreator,
};
