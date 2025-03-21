import {
  DeleteUserRequest,
  DeleteUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
  UserServiceHandlers,
} from '@restaurant/shared-proto-ts';
import { z } from 'zod';
import { RegisterUserCommand, UpdateUserCommand } from '../../../application';
import { UserModel } from '../../../domain/models';
import { grpc } from '../interceptors';
import { IContextHandler } from '../types';
import { RegisterUserSchema, UpdateUserSchema } from './schema';

export function userHandler(ctx: IContextHandler): UserServiceHandlers {
  return {
    DeleteUser: grpc
      .input<DeleteUserRequest>(z.object({ userId: z.string() }))
      .output<DeleteUserResponse>(z.object({ message: z.string() }))
      .handler(async (caller) => {
        return {
          message: caller.request.userId,
        };
      }),
    RegisterUser: grpc
      .input(RegisterUserSchema)
      .output<RegisterUserResponse>(z.object({ message: z.string(), success: z.boolean(), userId: z.string() }))
      .handler(async (caller) => {
        const result: UserModel = await ctx.commandBus.send(new RegisterUserCommand(caller.request));
        return {
          message: 'ok',
          success: true,
          userId: result.id,
        };
      }),
    UpdateUser: grpc
      .input(UpdateUserSchema)
      .output<UpdateUserResponse>(z.object({ success: z.boolean() }))
      .handler(async (caller) => {
        await ctx.commandBus.send(new UpdateUserCommand(caller.request.userId, caller.request));
        return {
          success: true,
        };
      }),
  };
}
