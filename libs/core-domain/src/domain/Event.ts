import { v4 } from 'uuid';
import { IEvent } from './interfaces/IEvent';

export type EVENT_METADATA_TYPES =
  | 'eventName'
  | 'aggregateName'
  | 'aggregateId'
  | 'version'
  | 'timestamp'
  | 'createdBy'
  | 'eventId';

export const EVENT_METADATA: EVENT_METADATA_TYPES[] = [
  'eventName',
  'aggregateName',
  'aggregateId',
  'version',
  'timestamp',
  'createdBy',
  'eventId',
];

export abstract class Event implements IEvent {
  eventId: string;
  aggregateId: string;
  version: number;
  timestamp: Date;
  createdBy: string;
  abstract eventName: string;
  abstract aggregateName: string;
  constructor(aggregateId: string) {
    this.aggregateId = aggregateId;
    this.timestamp = new Date();
    this.eventId = v4();
  }
}
