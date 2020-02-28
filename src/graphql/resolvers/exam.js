import { Exam } from '../../controllers';

export default {
  Query: {
    findExam: (root, { input }, { req }, info) => Exam.find({
      subjectId: input.subjectId,
      examId: input.examId,
    }),
  },

  Mutation: {
    createExam: (root, { input }, { req }, info) => Exam.create({
      userId: req.user.id,
      subjectId: input.subjectId,
      name: input.name,
      description: input.description,
      questions: input.questions,
    }),

    removeExams: (root, { input }, { req }, info) => Exam.remove({
      userId: req.user.id,
      subjectId: input.subjectId,
      examIds: input.examIds,
    }),

  },

};
