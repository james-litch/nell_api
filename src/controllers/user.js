import { UserInput } from '../validators';
import { User } from '../models';
import { validateInput, matchesPassword, isUser } from './validate';
import { generate, tokenBody } from './token';

const signUp = async ({ name, email, password }) => {
  // validate inputs.
  validateInput({ name, email, password }, UserInput.signUp);

  // create user.
  const user = await User.create({ name, email, password });

  // generate JWT refresh and access tokens.
  const tokens = generate(tokenBody(user));

  return { user, tokens };
};

const signIn = async ({ email, password }) => {
  // validate inputs.
  validateInput({ email, password }, UserInput.signIn);

  // check email exists.
  const user = await isUser(email);

  // check password is correct.
  await matchesPassword(user, password);

  // generate JWT refresh and access tokens.
  const tokens = generate(tokenBody(user));

  return { user, tokens };
};

const endSession = ({ userId }) => {
  const update = User.findOneAndUpdate(
    { _id: userId },
    { $inc: { tokenCount: 1 } },
    (err, doc) => {
      if (err) throw new Error(err);
    },
  );
  return 'success';
};

const changePassword = () => {

};

const getUser = async ({ userId }) => {
  const user = await User.find().where('_id').equals(userId).exec();
  return user[0];
};

export {
  signUp, signIn, getUser, endSession, changePassword,
};
