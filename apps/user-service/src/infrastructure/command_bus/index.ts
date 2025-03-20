import { ICommand, ICommandBus, ICommandHandler } from '@restaurant/core-domain';
import { injectable } from 'inversify';

@injectable()
export class CommandBus<BaseCommand extends ICommand = ICommand> implements ICommandBus<BaseCommand> {
  handlers: Map<string, ICommandHandler<BaseCommand>> = new Map();

  registerHandler(handler: ICommandHandler<BaseCommand>) {
    const targetCommand: string = handler.commandToHandle;

    if (this.handlers.has(targetCommand)) {
      return;
    }
    this.handlers.set(targetCommand, handler);
  }

  async send<T extends BaseCommand>(command: T) {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`Command handler ${command.constructor.name} not register`);
    }
    return handler.handle(command);
  }
}
