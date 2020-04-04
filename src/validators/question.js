import Joi from '@hapi/joi';
import {
  id, question, answers, idArray, index,
} from './fields';

const add = (data) => {
  const schema = Joi.object({
    subjectId: id, question, answers, correctAnswer: index,
  });
  return schema.validate(data);
};

const remove = (data) => {
  const schema = Joi.object({
    subjectId: id, questionIds: idArray,
  });
  return schema.validate(data);
};

const addCurrent = (data) => {
  const schema = Joi.object({
    subjectId: id, questionId: id,
  });
  return schema.validate(data);
};

const removeCurrent = (data) => {
  const schema = Joi.object({
    subjectId: id, questionIds: idArray,
  });
  return schema.validate(data);
};

const answer = (data) => {
  const schema = Joi.object({
    subjectId: id, questionId: id, answerIndex: index,
  });
  return schema.validate(data);
};


export {
  add, remove, addCurrent, removeCurrent, answer,
};
