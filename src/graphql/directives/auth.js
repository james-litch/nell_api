import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      const { user } = context.req;

      if (!user) throw new AuthenticationError('UNAUTHENTICATED');

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
