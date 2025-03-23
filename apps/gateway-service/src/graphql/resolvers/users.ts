import { LoginUserResponse__Output, RegisterUserResponse__Output } from '@restaurant/shared-proto-ts';
import { IAppContext } from '../types';

const userResolver = {
  Mutation: {
    login: async (_parent, args, ctx: IAppContext) => {
      const resp = await new Promise<LoginUserResponse__Output>((resolve, reject) => {
        ctx.service.user.LoginUser(args.input, (err, value) => {
          if (err) {
            reject(err);
          } else if (value) {
            resolve(value);
          } else {
            reject(new Error('No value from response'));
          }
        });
      });
      return resp;
    },
    register: async (_parent, args, ctx: IAppContext) => {
      const resp = await new Promise<RegisterUserResponse__Output>((resolve, reject) => {
        ctx.service.user.RegisterUser(args.input, (err, value) => {
          if (err) {
            reject(err);
          } else if (value) {
            resolve(value);
          } else {
            reject(new Error('No value from response'));
          }
        });
      });
      return { id: resp.userId };
    },
  },
};
export default userResolver;
