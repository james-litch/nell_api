import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { User } from '../models';
import * as UserValidation from '../validators/user';
import { generateToken, validateToken } from '../helpers/token';


const INVALID_CREDENTIALS = 'Email or password is incorrect. Please try again.';
const AUTH_ERROR = 'You must be signed in.';

const signUp = (args) => {
  // validate inputs
  const { error } = UserValidation.signUp(args);
  if (error) throw new UserInputError(error.details[0].message);

  return User.create(args);
};

const signIn = async (args) => {
  // validate inputs
  const { error } = UserValidation.signIn(args);
  if (error) throw new UserInputError(error.details[0].message);

  // check email exists
  const user = await User.findOne({ email: args.email });
  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);

  // check password is correct
  const match = await user.matchesPassword(args.password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);


  // issue jwt token
  return generateToken({ id: user.id, email: user.email });
};

const ensureSignedIn = (user) => {
  if (!user) throw new AuthenticationError(AUTH_ERROR);
};

const userFromToken = async (token) => {
  // see if token is valid
  const validToken = validateToken(token);
  if (!validToken) return null;

  let user;
  try {
    user = await User.findById(validToken.id);
  } catch (err) {
    console.log(err);
  }
  return user;
};

const getUser = async (id) => User.findById(id);

const getUsers = async () => User.find({});


export {
  signUp,
  signIn,
  ensureSignedIn,
  userFromToken,
  getUser,
  getUsers,
};
