import { ICommand } from './ICommand';

export interface ICommandHandler<TCommand extends ICommand = any, R = any> {
  commandToHandle: string;
  handle(command: TCommand): R | Promise<R>;
}
