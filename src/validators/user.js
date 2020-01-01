import Joi from '@hapi/joi';

const name = Joi.string().required().min(3).max(254)
  .label('Name');
const email = Joi.string().email().required().label('Email');
const password = Joi.string().required().min(5).label('Password');

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

export {
  signIn,
  signUp,
};
