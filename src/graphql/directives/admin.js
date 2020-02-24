import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, inputs, context] = args;

      const { user } = context.req;
      const { subjectId } = inputs.input;
      if (!user) throw new AuthenticationError('UNAUTHENTICATED');

      // check if subject id is in subjects
      let isAdmin = false;
      user.subjects.forEach((item) => {
        if (subjectId === item.id && item.admin === true) isAdmin = true;
      });

      if (!isAdmin) throw new AuthenticationError('UNAUTHENTICATED');

      return resolve.apply(this, args);
    };
  }
}

export default AdminDirective;
