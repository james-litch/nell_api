import { AuthenticationError } from 'apollo-server-express';
import { Subject } from '../models';

const invalidDetails = 'ID or password is incorrect. Please try again.';

// TODO: change this.
// eslint-disable-next-line import/prefer-default-export
export const attemptJoin = async (id, password) => {
  // check email exists
  const subject = await Subject.findById(id);
  if (!subject) throw new AuthenticationError(invalidDetails);

  // check password is correct
  const match = await subject.matchesPassword(password);
  if (!match) throw new AuthenticationError(invalidDetails);

  return subject;
};
