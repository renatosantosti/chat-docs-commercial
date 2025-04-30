
import AuthUserDto from "domain/dtos/auth/user";
import UpdateUserRequest from "./update-user-request"; 
import UpdateUserResponse from "./update-user-response";
import { IUpdateUserUseCase } from "../../../interfaces/use-cases/update-user-usecase-interface";
import ITimeAdapter from "application/interfaces/adapters/time-provider";
import IUserRepository from "application/interfaces/repositories/user";
import { NotFoundError } from "shared/errors/not-found-error";
import { InternalError } from "shared/errors/internal-error";
import IBaseMapper from "application/interfaces/base/base-mapper";
import User from "domain/models/user";
import UserDto from "domain/dtos/user";
import { AccessForbiddenError } from "shared/errors/access-forbidden-error";
import IPasswordHashAdapter from "application/interfaces/adapters/password-hashing";

export default class UpdateUserUseCase implements IUpdateUserUseCase {
  public currentUser?: AuthUserDto;
  /**
   * Constructs a new UpdateUserUseCase.
   * 
   * @param timeProvider - Time provider for obtaining the current UTC datetime
   * @param repository   - User repository for database operations
   * @param mapper - Helper to map user model to DTO
   */
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IUserRepository,
    readonly hashAdapter: IPasswordHashAdapter,
    readonly mapper: IBaseMapper<User, UserDto>,
  ) { }

  /**
   * Handles the update user request.
   * 
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                    It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the user data to be updated.
   * @returns A promise that resolves to an UpdateUserResponse object or an Error.
   */
  async handler(currentUser: AuthUserDto, request: UpdateUserRequest): Promise<UpdateUserResponse | Error> {
    this.currentUser = currentUser;
    try {
      // Check if the user has permission to view the requested user
      if (this.currentUser.id !== request.id) {
        return new AccessForbiddenError();
      }

      const updateData =  await this.repository.getOneById(request.id);

      if(!updateData){
        console.error("User not found.");
        return new NotFoundError();
      }
  
      const result = await this.repository.updateOne({
        ...updateData,
        name: request.name ? request.name : updateData.name,
        image: request.image ? request.image : updateData.image,
        password: request.password ? await this.hashAdapter.createHash(request.password) : updateData.password,
        isActive: true,
        modifiedBy: currentUser.email,
        modifiedOn: this.timeProvider.utcNow(),
      });

      //const result: User | null = await this.repository.updateOne(user);

      if(result){
        const userMapped: UserDto = this.mapper.map({
          ...result!,
        });

        return {
          success: true,
          message: "User updated successfully.",
          user: userMapped,
        };
      }
      
      console.error("User not found.");
      return new NotFoundError();

    } catch (error) {
      return new InternalError("An error occurred while updating the user.");
    }
  }
}
