import { Token } from 'src/domain/model/data/AuthModel';
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
        const response: Token = {
          ...snapShot.data(),
          token,
        };
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
