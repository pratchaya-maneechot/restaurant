import { Command } from '@restaurant/core-domain';
import { UserInsertModel } from '../../../../domain/models';

export class UpdateUserCommand extends Command {
  constructor(
    guid: string,
    public readonly input: Partial<UserInsertModel>,
  ) {
    super(guid);
  }
}
