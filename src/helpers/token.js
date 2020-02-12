import { sign, verify } from 'jsonwebtoken';
import { JWT_KEY, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE } from '../../config';

// token with args object as body.
const generateToken = (args) => {
  const token = sign(args, JWT_KEY, { expiresIn: `${ACCESS_TOKEN_LIFE}` });
  return { token };
};

const generateTokens = (accessBody, refreshBody) => {
  const refreshToken = sign(refreshBody, JWT_KEY, { expiresIn: REFRESH_TOKEN_LIFE });
  const accessToken = sign(accessBody, JWT_KEY, { expiresIn: ACCESS_TOKEN_LIFE });

  return { accessToken, refreshToken };
};

const validateToken = (token) => {
  let validatedToken;
  try {
    validatedToken = verify(token, JWT_KEY);
  } catch (err) {
    validatedToken = null;
  }

  return validatedToken;
};

export {
  generateToken,
  validateToken,
  generateTokens,
};
