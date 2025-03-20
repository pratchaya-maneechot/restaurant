import { BaseContext } from '@apollo/server';

export interface IAuthentication {
  id: string;
}
export interface IAppContetxt extends BaseContext {
  identity: IAuthentication;
}
