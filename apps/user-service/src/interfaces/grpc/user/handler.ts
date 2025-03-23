import {
  DeleteUserRequest,
  DeleteUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
  UserServiceHandlers,
} from '@restaurant/shared-proto-ts';
import { z } from 'zod';
import { LoginUserCommand, RegisterUserCommand, UpdateUserCommand } from '../../../application';
import { UserModel } from '../../../domain/models';
import { grpc } from '../interceptors';
import { IContextHandler } from '../types';
import { LoginUserResponseSchema, LoginUserSchema, RegisterUserSchema, UpdateUserSchema } from './schema';

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
    LoginUser: grpc
      .input(LoginUserSchema)
      .output<LoginUserResponse>(LoginUserResponseSchema)
      .handler(async (caller) => {
        const result = await ctx.commandBus.send(new LoginUserCommand(caller.request));
        return result;
      }),
    RegisterUser: grpc
      .input(RegisterUserSchema)
      .output<RegisterUserResponse>(z.object({ message: z.string(), success: z.boolean(), userId: z.string() }))
      .handler(async (caller) => {
        const result: UserModel = await ctx.commandBus.send(
          new RegisterUserCommand({ ...caller.request, role: 'CUSTOMER' }),
        );
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
