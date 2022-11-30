import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../auth/domain/graphql';
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'mateo@gmail.com',
      password: 'nadasegura',
    },
    {
      id: 2,
      email: 'danielo@gmail.com',
      password: 'nadasegura',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };
    this.users.push(user);
    console.log(this.users);
    return user;
    
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findAll() {
    return this.users;
  }
}
