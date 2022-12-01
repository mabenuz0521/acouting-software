import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { IFirebaseConfig } from 'src/domain/model/config/firebase.interface';
import { Auth, getAuth } from 'firebase/auth';
import {
  CollectionReference,
  Firestore,
  getFirestore,
  collection,
} from 'firebase/firestore';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;
  public userCollection: CollectionReference;
  public firestore: Firestore;

  constructor(private configservice: ConfigService<IFirebaseConfig>) {
    this.app = initializeApp({
      apiKey: this.configservice.get<string>('apiKey'),
      appId: this.configservice.get<string>('appId'),
      authDomain: this.configservice.get<string>('authDomain'),
      measurementId: this.configservice.get<string>('measurementId'),
      projectId: this.configservice.get<string>('projectId'),
      storageBucket: this.configservice.get<string>('storageBucket'),
    });

    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this._createCollections();
  }

  private _createCollections() {
    this.userCollection = collection(this.firestore, 'users');
  }
}
