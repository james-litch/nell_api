import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

const name = Joi.string().required().min(3).max(254)
  .label('Subject Name');
const password = Joi.string().required().min(5).label('Password');
const id = Joi.objectId().required().label('Subject ID');

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
