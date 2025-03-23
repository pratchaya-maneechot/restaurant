import { Command } from '@restaurant/core-domain';

export interface LoginUserInput {
  email: string;
  password: string;
}
export class LoginUserCommand extends Command {
  constructor(public readonly input: LoginUserInput) {
    super();
  }
}
