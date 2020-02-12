import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { Subject, User } from '../models';
import { validateToken, generateTokens } from '../helpers/token';

const INVALID_CREDENTIALS = 'Invalid credentials';
const AUTH_ERROR = 'UNAUTHENTICATED';

const subjectExists = async (id) => {
  // find if the subject exists.
  const subject = await Subject.findById(id);
  if (!subject) throw new UserInputError('Invalid details');
  return subject;
};

const isUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);
  return user;
};

const isUserEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS);
  return user;
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

const matchesPassword = async (object, password) => {
  // check password is correct
  const match = await object.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);
};

const validateTokens = async (req, res, next) => {
  const refresh = req.headers['refresh-token'];
  const access = req.headers['access-token'];
  if (!access && !refresh) return next();

  const decodedAccess = validateToken(access);
  if (decodedAccess) {
    req.userId = decodedAccess.id;
    return next();
  }

  const decodedRefresh = validateToken(refresh);

  if (decodedRefresh) {
    const user = await User.findById(decodedRefresh.id);

    if (!user || decodedRefresh.count !== user.tokenCount) return next();

    req.userId = decodedRefresh.id;

    const { accessToken, refreshToken } = generateTokens(
      // access token
      { id: user.id },
      // refresh token
      { id: user.id, count: user.tokenCount },
    );

    res.set({
      'Access-Control-Expose-Headers': 'access-token,refresh-token',
      'access-token': accessToken,
      'refresh-token': refreshToken,
    });
  }

  return next();
};

const ensureSignedIn = (user) => {
  if (!user) throw new AuthenticationError(AUTH_ERROR);
};

export {
  subjectExists,
  isCreator,
  isUser,
  validateInput,
  matchesPassword,
  validateTokens,
  isUserEmail,
  ensureSignedIn,
};
