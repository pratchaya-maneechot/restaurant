import { IMessage } from './IMessage';

export interface IEvent extends IMessage {
  eventId: string;
  eventName: string;
  aggregateName: string;
  aggregateId: string;
  timestamp: Date;
  createdBy: string;
  version: number;
}
