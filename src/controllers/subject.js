import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { Subject, User } from '../models';

import * as SubjectValidation from '../validators/subject';

const INVALID_CREDENTIALS = 'ID or password is incorrect. Please try again.';

const joinSubject = async ({ id, password }) => {
  // validate inputs
  const { error } = SubjectValidation.joinSubject({ id, password });
  if (error) throw new UserInputError(error.details[0].message);

  // check subject exists
  const subject = await Subject.findById(id);
  if (subject) throw new AuthenticationError(INVALID_CREDENTIALS);

  // check password is correct
  const match = await subject.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);

  return subject;

  // check if already in subject
  // add user to subject
};

const createSubject = async ({ name, password, user }) => {
  // validate inputs
  const { error } = SubjectValidation.createSubject({ name, password });
  if (error) throw new UserInputError(error.details[0].message);

  const subject = await Subject.create({ name, creator: user.id, password });

  await user.updateOne({ $push: { subjects: subject } });

  return subject;
};

const subjectsFromIds = (subjects) => Subject.find().where('_id').in(subjects).exec();

export {
  joinSubject,
  createSubject,
  subjectsFromIds,
};
