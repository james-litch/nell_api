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
      userId: user.id,
      subjectId: input.subject,
      phrase: input.phrase,
      definition: input.definition,
    }),

    addQuestion: (root, { input }, { user }, info) => SubjectController.addQuestion({
      userId: user.id,
      subjectId: input.subject,
      question: input.question,
      answers: input.answers,
      correctAnswer: input.correctAnswer,
    }),
  },
  Subject: {
    creator: ({ creator }, args, context, info) => UserController.getUser(creator),
    users: ({ id }, args, context, info) => UserController.getUser(id),
    questions: ({ questions }, args, context, info) => SubjectController.getQuestions(questions),
  },
};
