import { EventDescriptor } from '../EventDescriptor';

export interface IEventBus {
  publish(channel: string, event: EventDescriptor): Promise<void>;
  subscribeEvents(channels: string[]): Promise<void>;
}
