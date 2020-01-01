import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';

const name = Joi.string().required().min(3).max(254)
  .label('Name');
const password = Joi.string().required().min(5).label('Password');
const id = JoiObjectId(Joi);

const createSubject = (data) => {
  const schema = Joi.object({
    name,
    password,
  });
  return schema.validate(data);
};

const joinSubject = (data) => {
  const schema = Joi.object({
    id,
    password,
  });
  return schema.validate(data);
};

export {
  joinSubject,
  createSubject,
};
