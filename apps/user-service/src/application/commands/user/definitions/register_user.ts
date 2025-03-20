import { Command } from '@restaurant/core-domain';
import { UserInsertModel } from '../../../../domain/models';

export class RegisterUserCommand extends Command {
  constructor(
    public readonly input: UserInsertModel,
    guid?: string,
  ) {
    super(guid);
  }
}
