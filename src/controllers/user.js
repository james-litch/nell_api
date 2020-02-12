import { User } from '../models';
import { UserValidation } from '../validators';
import { generateTokens } from '../helpers/token';
import {
  validateInput, isUser, matchesPassword, isUserEmail,
} from './validate';

const signUp = ({ name, email, password }) => {
  validateInput({ name, email, password }, UserValidation.signUp);

  return User.create({ name, email, password });
};

const signIn = async ({ email, password }) => {
  validateInput({ email, password }, UserValidation.signIn);

  const user = await isUserEmail(email);

  await matchesPassword(user, password);

  // issue jwt token
  return generateTokens(
    { id: user.id },
    { id: user.id, count: user.tokenCount },
  );
};

const invalidateToken = async (userId) => {
  const user = isUser(userId);
  user.updateOne({ $inc: { tokenCount: 1 } });
};

const getUser = async (id) => User.findById(id);

const getUsers = async () => User.find({});

const deleteAccount = ({ userId }) => {
// find all subjects and remove user from them
// delete user
};

const changePassword = async ({ userId, newPassword, oldPassword }) => {
  console.log(oldPassword, newPassword);
  validateInput({ userId, newPassword, oldPassword }, UserValidation.changePassword);

  const user = await getUser(userId);

  await matchesPassword(user, oldPassword);

  await user.updateOne({ $set: { password: newPassword } });

  return 'success';
};

export {
  signUp,
  signIn,
  getUser,
  getUsers,
  deleteAccount,
  changePassword,
  invalidateToken,
};
