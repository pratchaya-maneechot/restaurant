import { v4 } from 'uuid';
import { ICommand } from './interfaces/ICommand';

export abstract class Command implements ICommand {
  guid: string;

  constructor(guid?: string) {
    this.guid = guid || v4();
  }
}
