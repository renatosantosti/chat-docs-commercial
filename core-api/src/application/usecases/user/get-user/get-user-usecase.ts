import AuthUserDto from "@/domain/dtos/auth/user";
import { IGetUserUseCase } from "../../../interfaces/use-cases/get-user-usecase-interface";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IUserRepository from "@/application/interfaces/repositories/user";
import IBaseMapper from "@/application/interfaces/base/base-mapper";
import User from "@/domain/models/user";
import UserDto from "@/domain/dtos/user";
import GetUserRequest from "./get-user-request";
import GetUserResponse from "./get-user-response";
import { AccessForbiddenError } from "@/shared/errors/access-forbidden-error";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { InternalError } from "@/shared/errors/internal-error";

/**
 * Use case for fetching a user by ID.
 * This class handles the logic for retrieving an existing user from the system.
 */
export default class GetUserUseCase implements IGetUserUseCase {    
  public currentUser?: AuthUserDto;
  /**
   * Constructs a new GetUserUseCase.
   * 
   * @param timeProvider - The time provider used for obtaining the current UTC datetime.
   * @param repository - The user repository used for database operations.
   * @param mapper - Helper to map user model to DTO.
   */
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IUserRepository,
    readonly mapper: IBaseMapper<User, UserDto>,
  ) { }

  /**
   * Handles the get user request.
   * 
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.    ,
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the user ID.
   * @returns A promise that resolves to a GetUserResponse object or an Error.
   */
  async handler(currentUser: AuthUserDto, request: GetUserRequest): Promise<GetUserResponse | Error> {
    this.currentUser = currentUser;

    // Check if the user has permission to view the requested user
    if (this.currentUser.id !== request.id) {
      return new AccessForbiddenError();
    }

    // Fetch the user by ID
    let user: User | null = null
      
    try {
      user = await this.repository.getOneById(request.id);
    }
    catch (error) {
      console.error('Error fetching user:', error);
      return new InternalError("An error occurred while fetching the user.");
    }
    
    if (!user) {
      return new NotFoundError();
    }

    return {
      success: true,
      message: "User retrieved successfully.",
      user: user,
    };
  }
}
