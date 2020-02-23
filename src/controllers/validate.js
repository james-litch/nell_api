import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { User, Subject } from '../models';

const INVALID_CREDENTIALS = 'Invalid credentials';
const AUTH_ERROR = 'UNAUTHENTICATED';

const validateInput = (data, validator) => {
  // validate inputs
  const { error } = validator(data);
  if (error) throw new UserInputError(error.details[0].message);
};

const matchesPassword = async (object, password) => {
  // check password is correct
  const match = await object.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);
};

const isUser = async (email) => {
  // check if email exists.
  const user = await User.findOne({ email });

  // if user doesnt exist throw error.
  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);
  return user;
};

const isSubject = async (subjectId) => {
  // check if subject exists.
  const subject = await Subject.findOne({ _id: subjectId });

  // if user doesnt exist throw error.
  if (!subject) throw new UserInputError(INVALID_CREDENTIALS);

  return subject;
};

export {
  validateInput, matchesPassword, isUser, isSubject,
};
