import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Timestamp } from 'firebase-admin/firestore';

import { EVENT_METADATA, EVENT_METADATA_TYPES } from '../Event';
import { EventDescriptor } from '../EventDescriptor';
import { IEvent } from '../interfaces/IEvent';

type TransformableValue = Timestamp | Array<any> | Record<string, any> | primitive;

type primitive = string | number | boolean | null | undefined;
export type StorageEvent = Omit<IEvent, EVENT_METADATA_TYPES>;
export class RehydratedEvent {}

const transformValue = (value: TransformableValue): unknown => {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return transformValue(item);
      }
      return item;
    });
  }

  if (typeof value === 'object' && value !== null) {
    return transformer(value as EventDescriptor);
  }

  return value;
};

const transformer = (object: EventDescriptor): Record<string, unknown> => {
  if (!object) return {};

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    result[key] = transformValue(value);
  }

  return result;
};

export function createEventDescriptor<T extends IEvent = IEvent>(event: T): EventDescriptor {
  const JSONEvent = instanceToPlain(event);

  for (const attribute of EVENT_METADATA) {
    delete JSONEvent[attribute];
  }

  return new EventDescriptor(
    event.aggregateId,
    event.aggregateName,
    event.eventName,
    event.eventId,
    JSONEvent,
    event.timestamp,
    event.createdBy,
    event.version,
  );
}

export function rehydrateEventFromDescriptor(storageEvent: EventDescriptor): IEvent {
  const plain = transformer(storageEvent);

  const event: any = plainToInstance(RehydratedEvent, plain);

  return {
    aggregateId: storageEvent.aggregateGuid,
    aggregateName: storageEvent.aggregateName,
    eventName: storageEvent.eventName,
    eventId: storageEvent.eventId,
    version: storageEvent.version,
    createdBy: storageEvent.createdBy,
    ...event.payload,
  };
}
