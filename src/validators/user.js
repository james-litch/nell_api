import Joi from '@hapi/joi';
import { name, email, password } from './fields';

const signUp = (data) => {
  const schema = Joi.object({
    name, email, password,
  });
  return schema.validate(data);
};

const signIn = (data) => {
  const schema = Joi.object({
    email, password,
  });
  return schema.validate(data);
};

const changePassword = (data) => {
  const schema = Joi.object({
    oldPassword: password, newPassword: password,
  });
  return schema.validate(data);
};

export {
  signUp,
  signIn,
  changePassword,
};
