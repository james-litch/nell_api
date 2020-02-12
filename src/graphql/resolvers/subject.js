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
    createSubject: (root, { input }, { req }, info) => SubjectController.createSubject({
      userId: req.userId,
      name: input.name,
      password: input.password,
    }),

    joinSubject: (root, { input }, { req }, info) => SubjectController.joinSubject({
      userId: req.userId,
      id: input.id,
      password: input.password,
    }),

    leaveSubject: (root, { input }, { req }, info) => SubjectController.leaveSubject({
      userId: req.userId,
      subjectId: input.subjectId,
    }),

    addDefinition: (root, { input }, { req }, info) => DictionaryController.addDefinition({
      userId: req.userId,
      subjectId: input.subject,
      phrase: input.phrase,
      definition: input.definition,
    }),

    deleteDefinitions: (root, { input }, { req }, info) => DictionaryController.deleteDefinitions({
      userId: req.userId,
      subjectId: input.subject,
      definitions: input.definitions,
    }),

    addQuestion: (root, { input }, { req }, info) => QuestionController.addQuestion({
      userId: req.userId,
      subjectId: input.subject,
      question: input.question,
      answers: input.answers,
      correctAnswer: input.correctAnswer,
    }),

    deleteQuestions: (root, { input }, { req }, info) => QuestionController.deleteQuestions({
      userId: req.userId,
      subjectId: input.subject,
      questions: input.question,
    }),

    createExam: (root, { input }, { req }, info) => ExamController.createExam({
      userId: req.userId,
      subjectId: input.subject,
      name: input.name,
      description: input.description,
      questions: input.questions,
    }),

    deleteExams: (root, { input }, { req }, info) => ExamController.deleteExams({
      userId: req.userId,
      subjectId: input.subject,
      exams: input.exams,
    }),
    askCreator: (root, { input }, { req }, info) => SubjectController.askCreator({
      userId: req.userId,
      subjectId: input.subjectId,
      question: input.question,
    }),
    // eslint-disable-next-line max-len
    addCurrentQuestion: (root, { input }, { req }, info) => CurrentQuestionController.addCurrentQuestion({
      userId: req.userId,
      subjectId: input.subjectId,
      questionId: input.question,
      description: input.description,
    }),

  },
  Query: {
    subject: async (root, { id }, { req }, info) => {
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
