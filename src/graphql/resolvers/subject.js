import {
  UserController,
  SubjectController,
  QuestionController,
  ExamController,
  CurrentQuestionController,
  DictionaryController,
} from '../../controllers';

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

    addDefinition: (root, { input }, { user }, info) => DictionaryController.addDefinition({
      userId: user.id,
      subjectId: input.subject,
      phrase: input.phrase,
      definition: input.definition,
    }),

    addQuestion: (root, { input }, { user }, info) => QuestionController.addQuestion({
      userId: user.id,
      subjectId: input.subject,
      question: input.question,
      answers: input.answers,
      correctAnswer: input.correctAnswer,
    }),

    createExam: (root, { input }, { user }, info) => ExamController.createExam({
      userId: user.id,
      subjectId: input.subject,
      name: input.name,
      description: input.description,
      questions: input.questions,
    }),

  },
  Query: {
    subject: async (root, { id }, { user }, info) => {
      const subject = await SubjectController.getSubject(id);
      return subject;
    },
  },
  Subject: {
    creator: ({ creator }, args, context, info) => UserController.getUser(creator),
    users: ({ id }, args, context, info) => UserController.getUser(id),
    questions: ({ questions }, args, context, info) => QuestionController.getQuestions(questions),
  },
  Exam: {
    questions: ({ questions }, args, context, info) => QuestionController.getQuestions(questions),
  },
};
