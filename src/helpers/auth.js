import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { JWT_KEY, JWT_TOKEN_LIFE } from '../../config'

const invalidDetails = 'Email or password is incorrect. Please try again.'

export const checkSignedIn = user => {
  console.log(user)
  if (!user) throw new AuthenticationError('You must be signed in.')
}

export const validateToken = token => {
  let decodedToken

  try {
    decodedToken = jwt.verify(token, JWT_KEY)
  } catch (err) {
    decodedToken = null
  }

  return decodedToken
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
  const token = jwt.sign({ id: id, email: email }, JWT_KEY, { expiresIn: `${JWT_TOKEN_LIFE}h` })

  return token
}
