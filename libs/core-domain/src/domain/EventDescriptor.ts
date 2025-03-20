import { StorageEvent } from './utils/EventProcessor';

export class EventDescriptor {
  constructor(
    readonly aggregateGuid: string,
    readonly aggregateName: string,
    readonly eventName: string,
    readonly eventId: string,
    readonly payload: StorageEvent,
    readonly timestamp: Date,
    readonly createdBy?: string,
    readonly version?: number,
  ) {}
}
