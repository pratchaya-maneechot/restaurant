import { Command } from '@restaurant/core-domain';

export class DeleteUserCommand extends Command {
  constructor(guid: string) {
    super(guid);
  }
}
