import * as SubjectController from '../../controllers/subject';
import * as UserController from '../../controllers/user';

export default {
  Mutation: {
    createSubject: (root, { input }, { user }, info) => SubjectController.createSubject({
      user,
      name: input.name,
      password: input.password,
    }),

    joinSubject: (root, { input }, { user }, info) => SubjectController.joinSubject({
      user,
      id: input.id,
      password: input.password,
    }),

    addDefinition: (root, { input }, { user }, info) => SubjectController.addDefinition({
      user,
      subjectId: input.subject,
      phrase: input.phrase,
      definition: input.definition,
    }),
  },
  Subject: {
    creator: ({ creator }, args, context, info) => UserController.getUser(creator),
    users: ({ id }, args, context, info) => UserController.getUser(id),
  },
};
