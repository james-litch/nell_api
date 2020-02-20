import Joi from '@hapi/joi';
import { name, id, password } from './fields';

const create = (data) => {
  const schema = Joi.object({
    subjectName: name, password,
  });
  return schema.validate(data);
};

const join = (data) => {
  const schema = Joi.object({
    subjectId: id, password,
  });
  return schema.validate(data);
};

export {
  create,
  join,
};
