import { RegisterUserResponse__Output } from '@restaurant/shared-proto-ts';
import { IAppContetxt } from '../types';

const userResolver = {
  Mutation: {
    register: async (_parent, args, ctx: IAppContetxt) => {
      const resp = await new Promise<RegisterUserResponse__Output>((resolve, reject) => {
        ctx.service.user.RegisterUser(args.input, (err, value) => {
          if (err) {
            console.error('gRPC Error:', err);
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
