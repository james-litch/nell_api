import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { ValidationController } from '../../controllers';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      ValidationController.ensureSignedIn(context.req.userId);
      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
