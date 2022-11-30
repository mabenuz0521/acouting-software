import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from '../domain/services/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput, User } from '../domain/graphql';
import { JwtService } from '@nestjs/jwt';
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import {
  setDoc,
  DocumentReference,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //se va conectar con el firebase para buscar el usuario y devolverlo
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
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
        email: user.email,
        sub: user.id,
      }), //TODO: implement jwt,
      user: result,
    };
  }

  //aquí crearemos el usuario usuando firebase
  async singup(loginUserInput: LoginUserInput) {
    // const user = await this.usersService.findOne(loginUserInput.email);

    // if (user) {
    //   throw new Error('User already exists!');
    // }
    // const password = await bcrypt.hash(loginUserInput.password, 10);
    // return this.usersService.create({
    //   ...loginUserInput,
    //   password
    // });
    try {
      const password = await bcrypt.hash(loginUserInput.password, 10);
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          loginUserInput.email,
          password,
        );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.userCollection,
          id,
        );
        const body = {
          email: loginUserInput.email,
          password: password,
        };
        await setDoc(docRef, body);
        return loginUserInput;
      }
    } catch (error: unknown) {
      const firebaseAuthError = error as AuthError;
      console.log(firebaseAuthError.code);

      if (firebaseAuthError.code === 'auth/email-already-in-use') {
        throw new HttpException(
          'Este Correo ya se encuentra registrado',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}
