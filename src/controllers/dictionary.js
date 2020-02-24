import { validateInput } from './validate';
import { DictionaryInput } from '../validators';
import { Subject } from '../models';

const add = async ({
  userId, subjectId, phrase, definition,
}) => {
  // validate inputs
  validateInput({ subjectId, phrase, definition }, DictionaryInput.add);

  // add definition to dictionary.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $addToSet: { dictionary: { phrase, definition } } },
    { new: true },
  );
  console.log(update);
  return { phrase, definition };
};

const remove = async ({ userId, subjectId, definitionIds }) => {
  // validate inputs
  validateInput({ subjectId, definitionIds }, DictionaryInput.remove);

  // remove definition from dictionary.
  const update = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { $pull: { dictionary: { _id: { $in: definitionIds } } } },
  );

  return 'success';
};

const find = () => {

};

export {
  add, remove, find,
};
