import 'reflect-metadata';
import { pojos } from '@automapper/pojos';
import { createMapper, Mapper, mapFrom, createMap, forMember } from '@automapper/core';
import IBaseMapper from 'application/interfaces/base/base-mapper';
import UserDto from 'domain/dtos/user';
import User from 'domain/models/user';

export class UserMapper implements IBaseMapper<User, UserDto> {
    private readonly mapper: Mapper;
    
    constructor() {
        this.mapper = createMapper({
            strategyInitializer: pojos(),
        });

        // Create mapping between User to UserDto
        createMap<User, UserDto>(this.mapper, "User", "UserDto",
            forMember((destination) => destination.id, mapFrom((source) => source.id)),
            forMember((destination) => destination.name, mapFrom((source) => source.name)),
            forMember((destination) => destination.email, mapFrom((source) => source.email)),
            forMember((destination) => destination.image, mapFrom((source) => source.image))
        );

        // Create mapping between UserDto to User
        createMap<UserDto, User>(this.mapper, "UserDto", "User",
            forMember((destination) => destination.id, mapFrom((source) => source.id)),
            forMember((destination) => destination.name, mapFrom((source) => source.name)),
            forMember((destination) => destination.email, mapFrom((source) => source.email)),
            forMember((destination) => destination.image, mapFrom((source) => source.image))
        );
    }
  
    map(source: User): UserDto {
        return this.mapper.map<User, UserDto>(source, 'UserDto', 'User');
    }

    mapReverse (source: UserDto): User {
        return this.mapper.map<UserDto, User>(source, 'User', 'UserDto');
    }

    mapArray(source: User[]): UserDto[] {
        return this.mapper.mapArray<User, UserDto>(source, 'UserDto', 'User');
    }
    
    mapArrayReverse(source: UserDto[]): User[] {
        return this.mapper.mapArray<UserDto, User>(source, 'User', 'UserDto');
    }
}

