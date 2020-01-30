import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { Subject, User, Question } from '../models';

import * as SubjectValidation from '../validators/subject';

const INVALID_CREDENTIALS = 'ID or password is incorrect. Please try again.';

const subjectExists = async (id) => {
  // find if the subject exists.
  const subject = await Subject.findById(id);
  if (!subject) throw new UserInputError('Invalid details');
  return subject;
};

const isCreator = async (userId, subject) => {
  const creator = await subject.isCreator(userId);
  if (!creator) throw new AuthenticationError('UNAUTHENTICATED');
};

const subjectsFromIds = (subjects) => Subject.find().where('_id').in(subjects).exec();

const joinSubject = async ({ id, password, user }) => {
  // validate inputs
  const { error } = SubjectValidation.joinSubject({ id, password });
  if (error) throw new UserInputError(error.details[0].message);

  // check subject exists
  const subject = subjectExists(id);

  // check password is correct
  const match = await subject.matchesPassword(password);
  if (!match) throw new AuthenticationError(INVALID_CREDENTIALS);

  // add subject to users subjects and user to subjects users.
  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });
  await subject.updateOne({ $addToSet: { users: user.id } });

  return subject;
};

const createSubject = async ({ name, password, user }) => {
  // validate inputs
  const { error } = SubjectValidation.createSubject({ name, password });
  if (error) throw new UserInputError(error.details[0].message);

  const subject = await Subject.create({ name, creator: user.id, password });

  await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { subjects: subject } });

  return subject;
};

const addDefinition = async ({
  userId, subjectId, phrase, definition,
}) => {
  // validate inputs
  const { error } = SubjectValidation.addDefinition({
    userId, subjectId, phrase, definition,
  });
  if (error) return new UserInputError(error.details[0].message);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  await subject.updateOne({ $push: { dictionary: { phrase, definition } } });

  return 'success';
};

const addQuestion = async ({
  userId, subjectId, question, answers, correctAnswer,
}) => {
  const { error } = SubjectValidation.addQuestion({
    userId, subjectId, question, answers, correctAnswer,
  });
  if (error) return new UserInputError(error.details[0].message);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  const createdQuestion = await Question.create({ question, answers, correctAnswer });

  await subject.updateOne({ $addToSet: { questions: createdQuestion } });

  return 'success';
};

const getQuestions = (questions) => Question.find().where('_id').in(questions).exec();


export {
  joinSubject,
  createSubject,
  subjectsFromIds,
  addDefinition,
  getQuestions,
  addQuestion,
  isCreator,
};
