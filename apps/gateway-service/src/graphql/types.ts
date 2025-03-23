import { BaseContext } from '@apollo/server';
import { Logger } from 'pino';
import { IReservationServiceClient } from '../services/reservation.service';
import { IUserServiceClient } from '../services/user.service';

export interface IAuthentication {
  id: string;
}
export interface IAppContext extends BaseContext {
  logger?: Logger;
  identity: IAuthentication;
  service: {
    user: IUserServiceClient;
    reservation: IReservationServiceClient;
  };
}
