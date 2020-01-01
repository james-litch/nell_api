import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { ensureSignedIn } from '../../authentication/user';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      ensureSignedIn(context.user);
      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;