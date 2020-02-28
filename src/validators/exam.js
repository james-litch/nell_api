import Joi from '@hapi/joi';
import {
  id, idArray, name, description,
} from './fields';

const create = (data) => {
  const schema = Joi.object({
    subjectId: id, name, description, questions: idArray,
  });
  return schema.validate(data);
};

const remove = (data) => {
  const schema = Joi.object({
    subjectId: id, examIds: idArray,
  });
  return schema.validate(data);
};

const find = (data) => {
  const schema = Joi.object({
    subjectId: id, examId: id,
  });
  return schema.validate(data);
};

export {
  create, remove, find,
};
