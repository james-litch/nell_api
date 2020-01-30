import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

const name = Joi.string().required().min(3).max(254).label('Subject Name');
const password = Joi.string().required().min(5).label('Password');
const subjectId = Joi.objectId().required().label('Subject ID');
const userId = Joi.objectId().required().label('User ID');

const phrase = Joi.string().required().min(2).max(256).label('Dictionary Phrase');
const definition = Joi.string().required().min(3).max(256).label('Dictionary Definition');

const question = Joi.string().required().min(5).max(256).label('Question');
const answer = Joi.string().required().min(1).max(256).label('Answer');
const answers = Joi.array().items(answer).label('Answers');

const createSubject = (data) => {
  const schema = Joi.object({ name, password });
  return schema.validate(data);
};

const joinSubject = (data) => {
  const schema = Joi.object({ subjectId, password });
  return schema.validate(data);
};

const addDefinition = (data) => {
  const schema = Joi.object({
    userId, subjectId, phrase, definition,
  });
  return schema.validate(data);
};

const addQuestion = (data) => {
  const schema = Joi.object({
    userId, subjectId, question, answers, correctAnswer: answer,
  });
  return schema.validate(data);
};

export {
  joinSubject,
  createSubject,
  addDefinition,
  addQuestion,
};
