import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput, User } from '../domain/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  //se va conectar con el firebase para buscar el usuario y devolverlo
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const validPassword = await bcrypt.compare(password, user?.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }), //TODO: implement jwt,
      user: result,
    };
  }

  //aquí crearemos el usuario usuando firebase
  async singup(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.username);
    
    if (user) {
      throw new Error('User already exists!');
    }
    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }
}
