import { Injectable } from '@nestjs/common';
import { UserDto } from '../model/data/dto/user.dto';
import { UserRepository } from '../model/data/repository/UserRepository';

@Injectable()
export class UserUseCases {
    constructor(
        private userRepository: UserRepository
    ){}

    findAll(){
        return this.userRepository.findAllUser();
    }

    create(user:UserDto){
        return this.userRepository.createUser(user);
    }
}