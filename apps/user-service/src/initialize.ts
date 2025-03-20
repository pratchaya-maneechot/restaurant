import { G_TYPES, ICommand, ICommandBus, ICommandHandler } from '@restaurant/core-domain';
import { Container } from 'inversify';
import { module as applicationModule } from './application';
import { module as infrastructureModule } from './infrastructure/module';
import { module as interfaceModule } from './interfaces/module';

const initializes = async () => {
  const container = new Container();
  await container.loadAsync(interfaceModule);
  await container.loadAsync(applicationModule);
  await container.loadAsync(infrastructureModule);

  const commandBus = container.get<ICommandBus>(G_TYPES.CommandBus);
  container.getAll<ICommandHandler<ICommand>>(G_TYPES.CommandHandler).forEach((handler: ICommandHandler<ICommand>) => {
    commandBus.registerHandler(handler);
  });

  return container;
};

export { initializes };
