import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { Subject } from '../models';

const INVALID_CREDENTIALS = 'ID or password is incorrect. Please try again.';
const AUTH_ERROR = 'UNAUTHENTICATED';

const subjectExists = async (id) => {
  // find if the subject exists.
  const subject = await Subject.findById(id);
  if (!subject) throw new UserInputError('Invalid details');
  return subject;
};

const isCreator = async (userId, subject) => {
  const creator = await subject.isCreator(userId);
  if (!creator) throw new AuthenticationError(AUTH_ERROR);
};

const validateInput = (data, validator) => {
  // validate inputs
  const { error } = validator(data);
  if (error) throw new UserInputError(error.details[0].message);
};

const matchesPassword = async (subject, password) => {
  // check password is correct
  const match = await subject.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);
};

export {
  subjectExists,
  isCreator,
  validateInput,
  matchesPassword,
};
