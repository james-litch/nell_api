import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config'

export default (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1] // authorization: bearer token

  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(token, JWT_KEY)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.userId = decodedToken.userId
}
