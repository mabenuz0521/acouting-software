import { Token , User} from 'src/domain/model/data/AuthModel';
import { AuthRepository } from '../../../domain/model/data/repository/AuthRepository';
import { FirebaseService } from './service/AuthFirebaseService';
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
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthFirebaseRepository implements AuthRepository {
  constructor(private firebaseService: FirebaseService) {}

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
        const user : User = {
          id,
          email,
          ...snapShot.data()

        }
        const response: Token = {
          token,
          user
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

        const response: User = {
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
