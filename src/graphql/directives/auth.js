import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { UserController } from '../../controllers';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      UserController.ensureSignedIn(context.user);
      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
