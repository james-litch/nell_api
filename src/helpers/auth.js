import AuthenticationError from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

const JWT_KEY = process.env.JWT_KEY
const JWT_TOKEN_LIFE = process.env.JWT_TOKEN_LIFE

const invalidDetails = 'Email or password is incorrect. Please try again.'

export const checkSignedIn = req => {
  if (!req.isAuth) throw new AuthenticationError('You must be signed in.')
}

export const attemptSignIn = async (email, password) => {
  // check email exists
  const user = await User.findOne({ email: email })
  if (!user) throw new AuthenticationError(invalidDetails)

  // check password is correct
  const match = await user.matchesPassword(password)
  if (!match) throw new AuthenticationError(invalidDetails)

  return user
}

export const generateToken = (id, email) => {
  const token = jwt.sign({ userId: id, email: email }, JWT_KEY, { expiresIn: `${JWT_TOKEN_LIFE}h` })

  return token
}
