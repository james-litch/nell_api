import { Exam } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {
    createExam: (root, { input }, { req }, info) => Exam.create({}),

  },

};
