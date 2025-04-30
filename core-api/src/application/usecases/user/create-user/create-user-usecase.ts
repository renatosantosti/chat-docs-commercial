import { ICreateUserUseCase } from "../../../interfaces/use-cases/create-user-usecase-interface";
import ITimeAdapter from "application/interfaces/adapters/time-provider";
import IUserRepository from "application/interfaces/repositories/user";
import IBaseMapper from "application/interfaces/base/base-mapper";
import CreateUserRequest from "./create-user-request";
import CreateUserResponse from "./create-user-response";
import IPasswordHashAdapter from "application/interfaces/adapters/password-hashing";
import User from "domain/models/user";
import UserDto from "domain/dtos/user";
import { InternalError } from "shared/errors/internal-error";
import { BadRequestError } from "shared/errors/bad-request-error";
import { EmailInUseError, MissingParamError } from "shared/errors";

/**
 * Implementation of the `ICreateUserUseCase` interface for handling authentication.
 * This use case is responsible for authenticating a user by validating their email and password.
 */
export default class CreateUserUseCase implements ICreateUserUseCase {

  /**
  * Constructs a new `CreateUserUseCase` instance.
  * 
  * @param userRepository - The repository used to retrieve user data.
  * @param hashAdapter - The adapter used to handle password hashing and token creation.
  */
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IUserRepository,
    readonly hashAdapter: IPasswordHashAdapter,
    readonly mapper: IBaseMapper<User, UserDto>,
  ) { }

  /**
   * Handles the authentication process based on the provided `CreateUserRequest`.
   * 
   * @param request - The authentication request containing email, and password.
   * @returns A promise that resolves to an `CreateUserResponse` containing a JWT token if authentication is successful.
   * @throws An error if the email or password is invalid.
   * 
   * Note: should be implemented resource logging and store token requests
   */
  async handler(request: CreateUserRequest): Promise<CreateUserResponse | Error> {
    if (!request) {
      console.error("Request is undefined.");
      return new BadRequestError("Request is undefined.");
    }

    if(!request.name || request.name.length === 0) {
      console.error("User´s name is required.");
      return new BadRequestError("User´s name is required.");
    }
    
    if(!request.email || request.email.length === 0) {
      console.error("User´s name is required.");
      return {
        success: false,
        message: 'User´s email is required.'
      };
    }

    if(!request.password || request.password.length === 0) {
      console.error("User´s password is required.");
      return new MissingParamError('User´s password is required.');
    }

    // check if repeat password is equal to password
    if(request.repeatedPassword !== request.password) {
      console.error("User´s repeat password is required.");
      return new MissingParamError('User´s repeat password is required.');
    }
    
    const exists = await this.repository.getOneByEmail(request.email.toLocaleLowerCase())
    if (exists) {
      console.error("Email already exists.");
      return new EmailInUseError();
    }

    try{  
      const result = await this.repository.createOne({
        name: request.name,
        email: request.email.toLocaleLowerCase(),
        image: request?.image?.trim()?.length > 0 
          ? request.image 
          : undefined,
        password: await this.hashAdapter.createHash(request.password),
        isActive: true,
        createdBy: 'system_new_user',
        createdOn: this.timeProvider.utcNow(),
      });
  
      if(result)
        return {
          success: true,
          message: "User created successfully.",
          user: this.mapper.map(result)
        };

      return new InternalError("Error to create user")
    }
    catch (err: any) {  
      console.error("Error to create user:", { err });
      return {
        success: false,
        message: "Error to create user.",
      };
    }
  }
}
