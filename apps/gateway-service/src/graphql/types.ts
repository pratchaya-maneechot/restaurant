import { BaseContext } from '@apollo/server';
import { ReservationServiceClient, UserServiceClient } from '@restaurant/shared-proto-ts';

export interface IAuthentication {
  id: string;
}
export interface IAppContetxt extends BaseContext {
  identity: IAuthentication;
  service: {
    user: UserServiceClient;
    reservation: ReservationServiceClient;
  };
}
