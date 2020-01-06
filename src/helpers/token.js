import jwt from 'jsonwebtoken';
import { JWT_KEY, JWT_TOKEN_LIFE } from '../../config';

// token with args object as body.
const generateToken = (args) => {
  const token = jwt.sign(args, JWT_KEY, { expiresIn: `${JWT_TOKEN_LIFE}h` });
  return { token };
};

const validateToken = (token) => {
  let validatedToken;
  try {
    validatedToken = jwt.verify(token, JWT_KEY);
  } catch (err) {
    validatedToken = null;
  }

  return validatedToken;
};

export {
  generateToken,
  validateToken,
};
