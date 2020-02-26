import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class inSubjectDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, inputs, context] = args;

      const { user } = context.req;
      const { subjectId } = inputs.input;
      if (!user) throw new AuthenticationError('UNAUTHENTICATED');

      // check if subject id is in subjects
      let inSubject = false;
      user.subjects.forEach((item) => {
        if (subjectId === item.id) inSubject = true;
      });

      if (!inSubject) throw new AuthenticationError('UNAUTHENTICATED');

      return resolve.apply(this, args);
    };
  }
}

export default inSubjectDirective;
