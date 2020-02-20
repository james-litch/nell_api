import Joi from '@hapi/joi';
import {
  id, phrase, definition, idArray,
} from './fields';

const add = (data) => {
  const schema = Joi.object({
    subjectId: id, phrase, definition,
  });
  return schema.validate(data);
};

const remove = (data) => {
  const schema = Joi.object({
    subjectId: id, definitionIds: idArray,
  });
  return schema.validate(data);
};

export {
  add, remove,
};
