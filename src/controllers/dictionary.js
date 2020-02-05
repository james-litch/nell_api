import * as SubjectValidation from '../validators/subject';
import { subjectExists, isCreator, validateInput } from './validate';

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

const deleteDefinition = () => {

};

export {
  addDefinition,
  deleteDefinition,
};
