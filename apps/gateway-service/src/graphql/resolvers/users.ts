import { IAppContext } from '../types';

const userResolver = {
  Mutation: {
    login: async (_parent, args, ctx: IAppContext) => {
      const resp = await ctx.service.user.loginUser(args.input);
      return resp;
    },
    register: async (_parent, args, ctx: IAppContext) => {
      const resp = await ctx.service.user.registerUser(args.input);
      return {
        id: resp?.userId,
      };
    },
  },
};
export default userResolver;
