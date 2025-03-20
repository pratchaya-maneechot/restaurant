import { instanceToPlain } from 'class-transformer';
import { CollectionReference, Firestore } from 'firebase-admin/firestore';
import { injectable, unmanaged } from 'inversify';
import _ from 'lodash';
import { ConcurrencyException, NotFoundException } from './Errors';
import { EventDescriptor } from './EventDescriptor';
import { IEvent } from './interfaces/IEvent';
import { IEventBus } from './interfaces/IEventBus';
import { IEventStore } from './interfaces/IEventStore';
import { createEventDescriptor, rehydrateEventFromDescriptor } from './utils/EventProcessor';

@injectable()
export abstract class EventStore implements IEventStore {
  private readonly eventCollection: CollectionReference;
  constructor(
    @unmanaged() _db: Firestore,
    @unmanaged() private readonly _eventBus: IEventBus,
  ) {
    this.eventCollection = _db.collection('events');
  }

  async saveEvents(aggregateGuid: string, events: IEvent[], expectedVersion: number) {
    const operations: EventDescriptor[] = [];
    const commonEventInfo = events[0];

    const latestEvent = await this.getLastEventDescriptor(commonEventInfo.aggregateName, aggregateGuid);

    if (latestEvent && latestEvent.version !== expectedVersion && expectedVersion !== -1) {
      throw new ConcurrencyException('Cannot perform the operation due to internal conflict');
    }

    let i: number = expectedVersion;

    for (const event of events) {
      i++;
      event.version = i;
      const eventDescriptor = createEventDescriptor(event);
      this._eventBus.publish(event.aggregateName, eventDescriptor);
      operations.push(eventDescriptor);
    }

    await this.bulkWrite(operations);
  }

  async getEventsForAggregate(aggregateName: string, aggregateGuid: string): Promise<IEvent[]> {
    const eventSubCollections = await this.eventCollection.doc(aggregateName).listCollections();
    const eventData: IEvent[] = [];
    for (const subcollection of eventSubCollections) {
      const snapshot = await subcollection.where('aggregateGuid', '==', aggregateGuid).get();
      eventData.push(
        ...snapshot.docs.map((eventDescriptor) =>
          rehydrateEventFromDescriptor(eventDescriptor.data() as EventDescriptor),
        ),
      );
    }

    if (eventData.length < 1) {
      throw new NotFoundException('Aggregate with the requested Guid does not exist');
    }

    const events = _.orderBy(eventData, ['version'], ['asc']);

    return events;
  }

  private async getLastEventDescriptor(aggregateName: string, aggregateGuid: string) {
    try {
      const events = await this.getEventsForAggregate(aggregateName, aggregateGuid);
      return events.pop();
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }

  private async bulkWrite(eventDescriptors: EventDescriptor[]) {
    await Promise.all(
      eventDescriptors.map(async (eventDescriptor) => {
        const input = instanceToPlain(eventDescriptor);
        await this.eventCollection
          .doc(eventDescriptor.aggregateName)
          .collection(eventDescriptor.eventName)
          .doc(eventDescriptor.eventId)
          .create(input);
      }),
    );
  }
}
