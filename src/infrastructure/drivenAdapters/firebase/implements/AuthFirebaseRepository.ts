import { IAuth } from 'src/domain/model/data/AuthModel'
import { IUser } from 'src/domain/model/data/UserModel'
import { User } from 'src/infrastructure/drivenAdapters/sequelize/entities/UserEntity'
import { AuthRepository } from '../../../../domain/model/data/repository/AuthRepository'
import { FirebaseService } from '../service/AuthFirebaseService'
import * as bcrypt from 'bcrypt'
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'
import {
  setDoc,
  DocumentReference,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common'
import { USER_REPOSITORY } from 'src/domain/model/config/constans'

@Injectable()
export class AuthFirebaseRepository implements AuthRepository {
  constructor(
    private firebaseService: FirebaseService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User
  ) {}

  async loginWithEmailAndPassWord(
    email: string,
    password: string
  ): Promise<IAuth> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        password
      )

      if (userCredential) {
        const id: string = userCredential.user.uid
        const token: string = await userCredential.user.getIdToken(true)
        const docRef: DocumentReference = doc(
          this.firebaseService.userCollection,
          id
        )
        const snapShot: DocumentSnapshot<DocumentData> = await getDoc(docRef)

        const response: IAuth = {
          token,
        }
        return response
      }
    } catch (error) {
      const firebaseAuthError = error as AuthError
      if (firebaseAuthError.code === 'auth/wrong-password') {
        throw new HttpException(
          'Email o contraseña incorrecta.',
          HttpStatus.FORBIDDEN
        )
      }
      if (firebaseAuthError.code === 'auth/user-not-found') {
        throw new HttpException(
          'El email no fue encontrado.',
          HttpStatus.NOT_FOUND
        )
      }
    }
  }

  async singupWithEmailAndPassword(user: IUser): Promise<IAuth> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          user.email,
          user.password
        )

      if (userCredential) {
        const idUser: string = userCredential.user.uid
        user.id = idUser
        const token: string = await userCredential.user.getIdToken(true)
        const docRef: DocumentReference = doc(
          this.firebaseService.userCollection,
          idUser
        )
        const hasPassword = await bcrypt.hash(user.password, 10)
        const userdb: IUser = {
          id: idUser,
          password: hasPassword,
          email: user.email,
          lastname: user.lastname,
          name: user.name,
          nickname: user.nickname,
        }
        await this.userRepository.create(userdb) //create in db
        const response: IAuth = {
          token,
        }

        await setDoc(docRef, {
          user,
        })
        return response
      }
    } catch (error: unknown) {
      const firebaseAuthError = error as AuthError

      if (firebaseAuthError.code === 'auth/email-already-in-use') {
        throw new HttpException(
          'Este Correo ya se encuentra registrado',
          HttpStatus.CONFLICT
        )
      }
    }
  }
}
