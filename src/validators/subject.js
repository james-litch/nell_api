import Joi from '@hapi/joi';
import {
  name, id, password, question,
} from './fields';

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

const remove = (data) => {
  const schema = Joi.object({
    subjectId: id,
  });
  return schema.validate(data);
};

const leave = (data) => {
  const schema = Joi.object({
    subjectId: id,
  });
  return schema.validate(data);
};

const feedback = (data) => {
  const schema = Joi.object({
    subjectId: id, question,
  });
  return schema.validate(data);
};

const clearFeedback = (data) => {
  const schema = Joi.object({
    subjectId: id,
  });
  return schema.validate(data);
};

export {
  create,
  join,
  leave,
  remove,
  feedback,
  clearFeedback,
};
