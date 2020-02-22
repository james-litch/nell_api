import { sign, verify } from 'jsonwebtoken';
import { User } from '../models';
import { JWT_KEY, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE } from '../../config';

const generate = ({ accessBody, refreshBody }) => {
  const refreshToken = sign(refreshBody, JWT_KEY, { expiresIn: REFRESH_TOKEN_LIFE });
  const accessToken = sign(accessBody, JWT_KEY, { expiresIn: ACCESS_TOKEN_LIFE });

  return { accessToken, refreshToken };
};

// generate the jwt body for a populated user query
const tokenBody = (user) => {
  const subjectsObj = user.subjects.map((item) => ({ id: item.subject._id, admin: item.admin }));

  const refreshBody = { id: user.id, subjects: subjectsObj, tokenCount: user.tokenCount };
  const accessBody = { id: user.id, subjects: subjectsObj };

  return { accessBody, refreshBody };
};

const validate = (token) => {
  let validatedToken;

  // see if token is valid.
  try { validatedToken = verify(token, JWT_KEY); } catch (err) { validatedToken = null; }

  return validatedToken;
};

const persist = async (req, res, next) => {
  // get token headers.
  const refresh = req.headers['refresh-token'];
  const access = req.headers['access-token'];

  // if token headers are empty skip.
  if (!access && !refresh) return next();

  // validate access token.
  const decodedAccess = validate(access);

  if (decodedAccess) {
    req.user = decodedAccess;

    return next();
  }

  const decodedRefresh = validate(refresh);

  if (decodedRefresh) {
    const user = await User.findById(decodedRefresh.id);

    // if user does'nt exist or token counts arent equal skip.
    if (!user || decodedRefresh.tokenCount !== user.tokenCount) return next();

    req.user = decodedRefresh;

    const accessBody = { id: user.id, subjects: user.subjects };
    const refreshBody = { id: user.id, subjects: user.subjects, count: user.tokenCount };

    const { accessToken, refreshToken } = generate({ accessBody, refreshBody });

    res.set({
      'Access-Control-Expose-Headers': 'access-token,refresh-token',
      'access-token': accessToken,
      'refresh-token': refreshToken,
    });
  }
  return next();
};


export {
  generate, validate, persist, tokenBody,
};
