import { Resolvers } from '../generated';
import { IAppContext } from '../types';

const restaurantResolver: Resolvers<IAppContext> = {
  Query: {
    restaurant: async (parent, args, ctx) => null,
    restaurants: async (parent, args, ctx) => [],
  },
  Mutation: {
    updateRestaurant: async (parent, args, ctx) => {
      return {
        id: '',
      };
    },
    createRestaurant: async (parent, args, ctx) => {
      return {
        id: '',
      };
    },
  },
};
export default restaurantResolver;
