import IBaseMapper from '@/application/interfaces/base/base-mapper';
import UserEntity from '../entities/user';
import User from '@/domain/models/user';

export class UserEntityMapper implements IBaseMapper<User, Partial<UserEntity>> {
 
    map(source: User): Partial<UserEntity> {
        return {
            id: source.id,
            name: source.name,
            email: source.email,
            password: source.password,
            isActive: source.isActive,
            createdOn: source.createdOn,
            createdBy: source.createdBy,
            modifiedOn: source.modifiedOn,
            modifiedBy: source.modifiedBy,
        };
    }

    mapReverse(source: UserEntity): User {
        return {
            id: source.id,
            name: source.name,
            email: source.email,
            password: source.password,
            isActive: source.isActive,
            createdOn: source.createdOn,
            createdBy: source.createdBy,
            modifiedOn: source.modifiedOn,
            modifiedBy: source.modifiedBy,
        };
    }

    mapArray(source: User[]): Partial<UserEntity>[] {
        return source.map(doc => this.map(doc));
    }
    
    mapArrayReverse(source: UserEntity[]): User[] {
        return source.map(entity => this.mapReverse(entity));
    }
}