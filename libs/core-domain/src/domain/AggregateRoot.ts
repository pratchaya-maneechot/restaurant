import { v4 } from 'uuid';
import { IEvent } from './interfaces/IEvent';

export abstract class AggregateRoot {
  private __version = 0;
  private __changes: IEvent[] = [];

  protected constructor(protected readonly id: string) {}

  get aggregateName() {
    return this.constructor.name;
  }

  get version() {
    return this.__version;
  }

  get guid(): string {
    return this.id;
  }

  static get generateID() {
    return v4();
  }

  getUncommittedEvents(): IEvent[] {
    return [...this.__changes];
  }

  markChangesAsCommitted(): void {
    this.__changes = [];
  }

  protected applyChange(event: IEvent): void {
    this.applyEvent(event, true);
  }

  private applyEvent(event: IEvent, isNew = false): void {
    const handlerMethod = `apply${event.eventName}`;

    if (typeof this[handlerMethod] === 'function') {
      this[handlerMethod](event);
    } else {
      throw new Error(`Handler method ${handlerMethod} not implemented`);
    }

    if (isNew) {
      this.__changes.push(event);
    }
  }

  loadFromHistory(events: IEvent[]): void {
    for (const event of events) {
      this.applyEvent(event);
      this.__version++;
    }
  }
}
