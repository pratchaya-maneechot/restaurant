import { ConflictException } from '@restaurant/core-domain';
import { mockDeep } from 'jest-mock-extended';
import { v4 } from 'uuid';
import { RegisterUserCommand } from '../../../application/commands/user/definitions/register_user';
import { RegisterUserCommandHandler } from '../../../application/commands/user/register_user.handler';
import { UserInsertModel, UserModel } from '../../../domain/models';
import { IUserRepository } from '../../../domain/repositories';

describe('RegisterUserCommand', () => {
  let handler: RegisterUserCommandHandler;
  let repository: ReturnType<typeof mockDeep<IUserRepository>>;

  // Common test data
  const registerInput: UserInsertModel = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    role: 'customer',
  };

  const mockUserInDB: UserModel = {
    id: v4(),
    phone: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...registerInput,
  };

  beforeEach(() => {
    repository = mockDeep<IUserRepository>();
    handler = new RegisterUserCommandHandler(repository);
    jest.clearAllMocks();
  });

  describe('handle', () => {
    it('should successfully register a new user when email is not in use', async () => {
      const command = new RegisterUserCommand(registerInput);
      const expectedUser = { ...mockUserInDB, id: command.guid };

      repository.query.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]), // No existing user
        }),
      } as any);
      repository.create.mockResolvedValue(expectedUser);

      // Act
      const result = await handler.handle(command);

      // Assert
      expect(repository.query.select).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith({
        ...registerInput,
        id: command.guid,
        password: expect.any(String), // Hashed password
      });
      expect(result).toEqual(expectedUser);
      expect(result.id).toBe(command.guid);
      expect(result.email).toBe(registerInput.email);
      expect(result.name).toBe(registerInput.name);
      expect(result.role).toBe(registerInput.role);
    });

    it('should throw ConflictException when email is already in use', async () => {
      const command = new RegisterUserCommand(registerInput);

      repository.query.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockUserInDB]), // Existing user
        }),
      } as any);

      // Act & Assert
      await expect(handler.handle(command)).rejects.toThrow(ConflictException);
      await expect(handler.handle(command)).rejects.toThrow('Email is already used');

      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should call repository methods with correct parameters', async () => {
      const command = new RegisterUserCommand(registerInput);

      repository.query.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      } as any);
      repository.create.mockResolvedValue(mockUserInDB);

      // Act
      await handler.handle(command);

      // Assert
      expect(repository.query.select).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: registerInput.email,
          name: registerInput.name,
          role: registerInput.role,
          id: command.guid,
        }),
      );
    });

    it('should handle unexpected repository errors', async () => {
      const command = new RegisterUserCommand(registerInput);
      const errorMessage = 'Database connection failed';

      repository.query.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      } as any);

      // Act & Assert
      await expect(handler.handle(command)).rejects.toThrow(errorMessage);
    });
  });
});
