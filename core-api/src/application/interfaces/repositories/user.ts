import User from "domain/models/user";
import IBaseRepository from "../base/base-repository";

export default interface IUserRepository extends IBaseRepository<User> {
    getOneByEmail(email: string): User | null | Promise<User | null>;    
}
