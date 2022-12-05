import { Injectable } from '@nestjs/common';
import { UserRepository } from '../model/data/repository/UserRepository';


@Injectable()
export class UserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    findAll(){
        return this.userRepository.findAllUser();
    }
}
