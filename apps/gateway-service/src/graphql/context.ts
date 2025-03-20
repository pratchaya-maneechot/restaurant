import express from 'express';
import { IAppContetxt } from './types';

export async function createContext(req: express.Request): Promise<IAppContetxt> {
  console.log(req.headers);

  return {
    identity: { id: '' },
  };
}
