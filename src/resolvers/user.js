import mongoose from 'mongoose'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { User } from '../models'
import { signUp, signIn } from '../validators'
import * as Auth from '../helpers/auth'

export default {
  Query: {
    me: async (root, args, { user }, info) => {
      Auth.checkSignedIn(user)
      return user
    },
    users: async (root, args, { user }, info) => {
      if (!user) throw new AuthenticationError('you must be logged in')
      return User.find({})
    },

    user: (root, { id }, context, info) => {
      // TODO: authenticated?  sanitisation

      if (!mongoose.Types.ObjectId.isValid(id)) throw new UserInputError(`${id} is not a valid user ID`)

      return User.findById(id)
    }
  },

  Mutation: {

    signUp: async (root, args, context, info) => {
      // validate inputs
      const { error } = signUp(args)
      if (error) throw new UserInputError(error.details[0].message)

      return User.create(args)
    },

    signIn: async (root, args, { req }, info) => {
      // validate inputs
      const { error } = signIn(args)
      if (error) throw new UserInputError(error.details[0].message)

      // check credentials
      const user = await Auth.attemptSignIn(args.email, args.password)
      if (!user) throw new AuthenticationError('incorrect credentials')

      // issue jwt token
      const token = await Auth.generateToken(user.id, user.email)
      return { token }
    }
  }
}
