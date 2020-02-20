import { Dictionary } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {
    addDefinition: (root, { input }, { req }, info) => Dictionary.add({
      userId: req.userId,
      subjectId: input.subjectId,
      phrase: input.phrase,
      definition: input.definition,
    }),

    removeDefinitions: (root, { input }, { req }, info) => Dictionary.remove({
      userId: req.userId,
      subjectId: input.subjectId,
      definitionIds: input.definitionIds,
    }),

  },

};
