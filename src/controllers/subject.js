import { Subject, User } from '../models';
import * as SubjectValidation from '../validators/subject';
import { subjectExists, validateInput, matchesPassword } from './validate';

const subjectsFromIds = (subjects) => Subject.find().where('_id').in(subjects).exec();

const joinSubject = async ({ id, password, user }) => {
  // validate inputs
  validateInput({ subjectId: id, password }, SubjectValidation.joinSubject);

  // check subject exists
  const subject = await subjectExists(id);

  await matchesPassword(subject, password);

  // add subject to users subjects and user to subjects users.
  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });
  await subject.updateOne({ $addToSet: { users: user.id } });

  return subject;
};

const createSubject = async ({ name, password, user }) => {
  validateInput({ name, password }, SubjectValidation.createSubject);

  const subject = await Subject.create({ name, creator: user.id, password });

  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });

  return subject;
};

const getSubject = async (id) => subjectExists(id);

const leaveSubject = () => {

};

export {
  joinSubject,
  createSubject,
  subjectsFromIds,
  getSubject,
  leaveSubject,
};
