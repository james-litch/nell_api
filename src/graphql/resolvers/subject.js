import { UserInputError } from 'apollo-server-express';
import * as Validate from '../../validators';
import { Subject } from '../../models';
import * as SubjectAuth from '../../authentication/subject';


export default {
  Mutation: {
    createSubject: (root, args, { user }, info) => {
      // validate inputs
      const { error } = Validate.createSubject(args);
      if (error) throw new UserInputError(error.details[0].message);

      return Subject.create({
        name: args.name,
        creator: user.id,
        password: args.password,
      });
    },
    joinSubject: async (root, args, { user }, info) => {
      // validate inputs
      const { error } = Validate.joinSubject(args);
      if (error) throw new UserInputError(error.details[0].message);

      const subject = await SubjectAuth.attemptJoin;

      // add user to subject
      // add subject to user
      // return subject

      return subject;
    },
  },
};
