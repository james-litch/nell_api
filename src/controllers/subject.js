import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { Subject, User } from '../models';

import * as SubjectValidation from '../validators/subject';

const INVALID_CREDENTIALS = 'ID or password is incorrect. Please try again.';

const joinSubject = async ({ id, password, user }) => {
  // validate inputs
  const { error } = SubjectValidation.joinSubject({ id, password });
  if (error) throw new UserInputError(error.details[0].message);

  // check subject exists
  const subject = await Subject.findById(id);

  if (!subject) throw new AuthenticationError(INVALID_CREDENTIALS);

  // check password is correct
  const match = await subject.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);

  // add subject to users subjects and user to subjects users.
  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });
  await subject.updateOne({ $addToSet: { users: user.id } });

  return subject;
};

const createSubject = async ({ name, password, user }) => {
  // validate inputs
  const { error } = SubjectValidation.createSubject({ name, password });
  if (error) throw new UserInputError(error.details[0].message);

  const subject = await Subject.create({ name, creator: user.id, password });

  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });

  return subject;
};

const subjectsFromIds = (subjects) => Subject.find().where('_id').in(subjects).exec();

const addDefinition = async ({
  user, subjectId, phrase, definition,
}) => {
  // TODO: validate inputs.

  // find the subject exists.
  const subject = await Subject.findById(subjectId);
  if (!subject) throw new UserInputError('Invalid details');

  // check if user is the creator. TODO: add to a directive
  const creator = await subject.isCreator(user.id);
  if (!creator) throw new AuthenticationError('UNAUTHENTICATED');

  await subject.updateOne({ $push: { dictionary: { phrase, definition } } });

  return 'success';
};

export {
  joinSubject,
  createSubject,
  subjectsFromIds,
  addDefinition,
};
