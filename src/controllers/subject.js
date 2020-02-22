import { Subject, User } from '../models';
import { validateInput } from './validate';
import { SubjectInput } from '../validators';

const create = async ({ userId, subjectName, password }) => {
  // validate inputs.
  validateInput({ subjectName, password }, SubjectInput.create);

  // create subject.
  const subject = await Subject.create({
    name: subjectName,
    admin: userId,
    password,
  });

  // add subject to user.
  const subjectObj = { subject: subject._id, admin: true };

  await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { subjects: subjectObj } },
  );

  return subject;
};

const join = () => {

};

export {
  create, join,
};
