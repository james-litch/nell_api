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

  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);
  return user;
};

export {
  validateInput, matchesPassword, isUser,
};
