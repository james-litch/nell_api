import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { JWT_KEY, JWT_TOKEN_LIFE } from '../../config';

const INVALID_CREDENTIALS = 'Email or password is incorrect. Please try again.';
const AUTH_ERROR = 'You must be signed in.';

const ensureSignedIn = (user) => {
  if (!user) throw new AuthenticationError(AUTH_ERROR);
};

const attemptSignIn = async (email, password) => {
  // check email exists
  const user = await User.findOne({ email });
  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);

  // check password is correct
  const match = await user.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);

  return user;
};

export {
  ensureSignedIn,
  attemptSignIn,
};
