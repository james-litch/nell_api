import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { isCreator } from '../../controllers/subject';

class CreatorDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const { user } = args[2];
      const { input } = args[1];
      isCreator({ userId: user.id, subjectId: input.subject });
      return resolve.apply(this, args);
    };
  }
}

export default CreatorDirective;
