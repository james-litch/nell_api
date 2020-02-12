import mongoose from 'mongoose';
import * as SubjectValidation from '../validators/subject';
import { subjectExists, isCreator, validateInput } from './validate';

const { ObjectId } = mongoose.Types;

const addDefinition = async ({
  userId, subjectId, phrase, definition,
}) => {
  // validate inputs
  validateInput({
    userId, subjectId, phrase, definition,
  }, SubjectValidation.addDefinition);

  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  await subject.updateOne({ $push: { dictionary: { phrase, definition } } });

  return 'success';
};

const deleteDefinitions = async ({
  userId, subjectId, definitions,
}) => {
  const subject = await subjectExists(subjectId);

  await isCreator(userId, subject);

  // map strings to mongoose object id
  const defIdArray = definitions.map((s) => ObjectId(s));

  await subject.update({ $pull: { dictionary: { _id: { $in: defIdArray } } } });

  return 'success';
};

export {
  addDefinition,
  deleteDefinitions,
};
