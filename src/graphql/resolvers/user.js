import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { User } from '../../models';
import { signUp, signIn, findUser } from '../../validators';
import { attemptSignIn, generateToken } from '../../authentication/user';

export default {
  Query: {
    me: async (root, args, { user }, info) => user,

    users: async (root, args, { user }, info) => User.find({}),

    user: (root, args, context, info) => {
      // validate inputs
      const { error } = findUser(args);
      if (error) throw new UserInputError(error.details[0].message);

      return User.findById(args.id);
    },
  },

  Mutation: {

    signUp: async (root, args, context, info) => {
      // validate inputs
      const { error } = signUp(args);
      if (error) throw new UserInputError(error.details[0].message);

      return User.create(args);
    },

    signIn: async (root, args, context, info) => {
      // validate inputs
      const { error } = signIn(args);
      if (error) throw new UserInputError(error.details[0].message);

      // check credentials
      const user = await attemptSignIn(args.email, args.password);
      if (!user) throw new AuthenticationError('incorrect credentials');

      // issue jwt token
      const token = await generateToken(user.id, user.email);
      return { token };
    },
  },
};
