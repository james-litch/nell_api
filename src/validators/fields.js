import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

const name = Joi.string().required().min(3).max(254).label('Name');
const email = Joi.string().email().required().label('Email');
const password = Joi.string().required().min(5).label('Password');
const id = Joi.objectId().required().label('ID');

const index = Joi.number().integer().required().min(0).label('Index');

const phrase = Joi.string().required().min(2).max(256).label('Dictionary Phrase');
const definition = Joi.string().required().min(3).max(256).label('Dictionary Definition');

const question = Joi.string().required().min(5).max(256).label('Question');
const answer = Joi.string().required().min(1).max(256).label('Answer');
const answers = Joi.array().items(answer).label('Answers');

const idArray = Joi.array().required().items(id).label('ID Array');
const description = Joi.string().required().min(2).max(256).label('Description');

export {
  name, email,
  password, id,
  phrase, definition,
  question, answer,
  answers, idArray,
  description, index,
};
