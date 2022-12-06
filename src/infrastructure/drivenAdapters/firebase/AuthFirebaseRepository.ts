import { Token, UserAuth } from 'src/domain/model/data/AuthModel';
import { User } from 'src/domain/model/data/UserModel';
import { AuthRepository } from '../../../domain/model/data/repository/AuthRepository';
import { FirebaseService } from './service/AuthFirebaseService';
import * as bcrypt from 'bcrypt';
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
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/domain/model/config/constans';
import { UserDto } from 'src/domain/model/data/dto/user.dto';

@Injectable()
export class AuthFirebaseRepository implements AuthRepository {
  constructor(
    private firebaseService: FirebaseService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async loginWithEmailAndPassWord(email: string, password: string) {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        password,
      );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const token: string = await userCredential.user.getIdToken(true);
        const docRef: DocumentReference = doc(
          this.firebaseService.userCollection,
          id,
        );
        const snapShot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        const user: UserAuth = {
          id,
          email,
          ...snapShot.data(),
        };
        const response: Token = {
          token,
          user,
        };
        return response;
      }
    } catch (error) {
      const firebaseAuthError = error as AuthError;
      if (firebaseAuthError.code === 'auth/wrong-password') {
        throw new HttpException(
          'Email o contraseña incorrecta.',
          HttpStatus.FORBIDDEN,
        );
      }
      if (firebaseAuthError.code === 'auth/user-not-found') {
        throw new HttpException(
          'El email no fue encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  async singupWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          email,
          password,
        );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.userCollection,
          id,
        );

        const passwordHash = await bcrypt.hash(password,10);
        const userDb: UserDto = {
          id,
          email,
          password: passwordHash,
        };
        await this.userRepository.create(userDb); //create in db
        const response: UserAuth = {
          id,
          email,
        };

        await setDoc(docRef, {
          email,
          password,
        });
        return response;
      }
    } catch (error: unknown) {
      const firebaseAuthError = error as AuthError;

      if (firebaseAuthError.code === 'auth/email-already-in-use') {
        throw new HttpException(
          'Este Correo ya se encuentra registrado',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}
